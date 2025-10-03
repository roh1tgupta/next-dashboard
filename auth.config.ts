import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(nextUrl.pathname, ".....pathame")
      const isLoginPage = nextUrl.pathname.startsWith('/login');
      if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else
      if (isLoggedIn) {
        return true;
        // return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return false;
    },
  },
  providers: [], // Add providers with an empty array for now q
} satisfies NextAuthConfig;