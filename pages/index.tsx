import nextCookie from 'next-cookies';
import * as React from 'react';
import { SignIn } from '../src/modules/auth';
import { login } from '../src/utils/auth';

const Login = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const handleSubmit = async(event: any, email: string, password: string) => {
    event.preventDefault();
    setError(false);
    try {
      setLoading(true);
      const response = await fetch('https://dev.sigsense.tech/login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { token, userName, roles } = await response.json();
        const { companyId } = roles[0];
        login({ token, userName, companyId });
        setLoading(false);
      } else {
        const errorMessage = new Error(response.statusText);
        setLoading(false);
        setError(true);
        throw {
          ...errorMessage,
          response,
        };
      }
    } catch (error) {
      setLoading(false);
      console.error(
        'You have an error in your code or there are Network issues.',
        error,
      );
    }
  };

  return (
    <SignIn
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

Login.getInitialProps = async (ctx: any) => {
  const { token } = nextCookie(ctx);
  if (ctx.res && token) {
    ctx.res.writeHead(302, {
      Location: '/dashboard',
    });
    ctx.res.end();
  }
  return {};
};

export default Login;
