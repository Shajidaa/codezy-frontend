import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // We fetch from the Express Backend
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        });

        const user = await res.json();

        if (res.ok && user) {
          return user; // Returns user object with role
        }
        return null;
      }
    })
  ],
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = (user as any).role;
    }
    return token;
  },
  async session({ session, token }) {
    if (session.user) {
      (session.user as any).role = token.role;
    }
    return session;
  },
  // This redirect callback handles cases where 'redirect: true' is used
  async redirect({ url, baseUrl, token }) {
    if (url.startsWith(baseUrl)) return url;
    
    // Default fallback based on role if no specific callbackUrl is provided
    if (token?.role === "teacher") return `${baseUrl}/dashboard/teacher`;
    return `${baseUrl}/dashboard/student`;
  }
},
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' }
});

export { handler as GET, handler as POST };