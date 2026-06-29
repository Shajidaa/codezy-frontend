import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (!token || !token.role) {
      return NextResponse.next();
    }

    const isTeacherPage = pathname.startsWith("/dashboard/teacher");
    const isStudentPage = pathname.startsWith("/dashboard/student");
    const isAdminPage = pathname.startsWith("/dashboard/admin");

    if (pathname === "/dashboard") {
      if (token.role === "teacher")
        return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
      if (token.role === "student")
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
      if (token.role === "admin")
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }

    if (isTeacherPage && token.role !== "teacher") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isStudentPage && token.role !== "student") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isAdminPage && token.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: ["/dashboard/:path*", "/booking/:path*"] };
