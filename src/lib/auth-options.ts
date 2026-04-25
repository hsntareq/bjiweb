import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "Email",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-email`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password,
					}),
				});

				if (!res.ok) return null;

				const data = await res.json();
				if (data.access_token) {
					return { id: credentials!.email, email: credentials!.email, accessToken: data.access_token };
				}

				return null;
			},
		}),
		CredentialsProvider({
			id: "mobile",
			name: "Mobile",
			credentials: {
				mobile: { label: "Mobile", type: "tel" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-mobile`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						mobile: credentials?.mobile,
						password: credentials?.password,
					}),
				});

				if (!res.ok) return null;

				const data = await res.json();
				if (data.access_token) {
					return { id: credentials!.mobile, name: credentials!.mobile, accessToken: data.access_token };
				}

				return null;
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user, account }) {
			const provider = account?.provider ?? (token.provider as string | undefined);
			if (provider) {
				(token as any).provider = provider;
			}

			if (account?.provider === "google" && account.providerAccountId) {
				(token as any).googleId = account.providerAccountId;
			}

			if (provider === "google") {
				const googleId = account?.providerAccountId || ((token as any).googleId as string | undefined);
				const email = user?.email || (token.email as string | undefined);

				if (googleId && email && (account || !token.accessToken)) {
					try {
						const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ googleId, email }),
						});

						if (res.ok) {
							const data = await res.json();
							token.accessToken = data.access_token;
							// Extract userId from JWT token
							if (data.access_token) {
								try {
									const decoded = JSON.parse(Buffer.from(data.access_token.split('.')[1], 'base64').toString());
									(token as any).userId = decoded.sub;
								} catch {
									// If decoding fails, continue without userId
								}
							}
						}
					} catch {
						// Keep the existing token if the refresh request fails.
					}
				}
			} else if (user) {
				token.accessToken = (user as any).accessToken;
				// Extract userId from JWT token
				if ((user as any).accessToken) {
					try {
						const decoded = JSON.parse(Buffer.from((user as any).accessToken.split('.')[1], 'base64').toString());
						(token as any).userId = decoded.sub;
					} catch {
						// If decoding fails, use email as fallback
						(token as any).userId = (user as any).id;
					}
				}
			}

			return token;
		},
		async session({ session, token }) {
			(session as any).accessToken = token.accessToken;
			(session as any).provider = (token as any).provider;
			(session as any).googleId = (token as any).googleId;
			(session as any).userId = (token as any).userId;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
};
