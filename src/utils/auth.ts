import cookie from 'js-cookie';
import Router from 'next/router';

export const login = async ({ token, userName, companyId }: any) => {
  cookie.set('token', token, { expires: 1 });
  cookie.set('userName', userName, { expires: 1 });
  cookie.set('companyId', companyId, { expires: 1 });
  Router.push('/dashboard');
};

export const logout = () => {
  cookie.remove('token');
  cookie.remove('userName');
  cookie.remove('companyId');
  // to support logging out from all windows
  Router.push('/');
};
