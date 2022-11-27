import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import AuthContext from '../store/auth.context';

function AuthCheck({ children }: any) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
    console.log(user);
  }, [loading]);

  return children;
}

export default AuthCheck;

