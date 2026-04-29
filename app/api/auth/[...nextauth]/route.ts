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
        // No more 'as any' needed!
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
    async redirect({ url, baseUrl, token }: { url: string, baseUrl: string, token?: any }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      
      // Role-based redirection logic
      if (token?.role === "teacher") return `${baseUrl}/dashboard/teacher`;
      return `${baseUrl}/dashboard/student`;
    }
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/login' }
});

export { handler as GET, handler as POST };