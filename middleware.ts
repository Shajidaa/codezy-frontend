// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isTeacherPage = req.nextUrl.pathname.startsWith("/dashboard/teacher");
    const isStudentPage = req.nextUrl.pathname.startsWith("/dashboard/student");

    if (isTeacherPage && token?.role !== "teacher") {
      return NextResponse.redirect(new URL("/dashboard/student", req.url));
    }

    if (isStudentPage && token?.role !== "student") {
      return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };