import fetch from 'isomorphic-unfetch';
import nextCookie from 'next-cookies';
import Router from 'next/router';
import * as React from 'react';
import { LayoutDashboard } from '../src/components';
import { Dashboard } from '../src/modules/dasboard';
import { logout } from '../src/utils/auth';

const redirectOnError = (ctx: any) => {
  if (process.browser) {
    Router.push('/error');
  } else {
    ctx.res.writeHead(302, {
      Location: '/error',
    });
    ctx.res.end();
  }
  return {};
};

const Home = ({ detailInfo, userName }: any) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <LayoutDashboard
      userName={userName}
      logout={handleLogout}
    >
      <Dashboard detailInfo = {detailInfo} />
    </LayoutDashboard>
  );
};

Home.getInitialProps = async (ctx: any) => {
  const { req } = ctx;
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  const { token, userName, companyId } = nextCookie(ctx);

  if (!token) {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
    return {};
  }

  const url = `/api/details/${companyId}`;

  try {
    const response = await fetch(baseUrl + url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.stringify({ token }),
      },
    });

    if (response.ok) {
      const detailInfo = await response.json();
      return {
        detailInfo,
        userName,
      };
    }
    const error = 'error !!!';
    return {
      error,
      userName,
    };
  } catch (error) {
    return redirectOnError(ctx);
  }
};

export default Home;
