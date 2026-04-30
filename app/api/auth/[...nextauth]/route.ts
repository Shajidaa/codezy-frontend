import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
    
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
          return user; 
        }
        return null;
      }
    })
  ],
callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      if (session.user) {
        
        session.user.role = token.role;
      }
      return session;
    },
   async redirect({ url, baseUrl, token }) {
 
  if (url === '/login' || url === baseUrl) {
    if (token?.role === "teacher") return `${baseUrl}/dashboard/teacher`;
    if (token?.role === "student") return `${baseUrl}/dashboard/student`;
  }
  return url.startsWith(baseUrl) ? url : baseUrl;
}
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' }
});

export { handler as GET, handler as POST };