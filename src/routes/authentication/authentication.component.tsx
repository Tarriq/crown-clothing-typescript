import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import { selectCurrentUser } from '../../store/user/user.selector';

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
	const navigate = useNavigate();
	const currentUser = useSelector(selectCurrentUser)

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
