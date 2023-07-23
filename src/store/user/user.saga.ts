import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { takeLatest, put, all, call } from 'typed-redux-saga/macro';
import { User } from 'firebase/auth';
import { USER_ACTION_TYPES } from './user.types';
import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from './user.action';
import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  SignInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser,
  AdditionalInformation,
} from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    // console.log('user auth: ',userAuth);
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if (userSnapshot)
      yield* put(
        signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
      );
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      SignInAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    switch ((error as AuthError).code) {
      case AuthErrorCodes.INVALID_PASSWORD:
        alert('Incorrect password for email');
        yield * put(signInFailed(error as Error));
        break;

      case AuthErrorCodes.USER_DELETED:
        alert('No user associated with this email');
        yield * put(signInFailed(error as Error));
        break;

      case AuthErrorCodes.NETWORK_REQUEST_FAILED:
        alert('Please check your internet connection');
        yield * put(signInFailed(error as Error));
        break;

      default:
        yield * put(signInFailed(error as Error));
    }
  }
}

export function* signUp({
  payload: { email, password, displayName },
}: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
	} catch (error) {
		if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
      alert('Cannot create user, email already in use.');
    } else {
      console.log('user creation encountered an error', error);
    }
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUseerSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUseerSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}