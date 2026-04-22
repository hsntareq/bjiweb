export function isTokenExpired(token: string | null | undefined): boolean {
	if (!token) return true;
	try {
		const parts = token.split(".");
		if (parts.length !== 3) return false; // Not a JWT (e.g. Google opaque token), assume valid and let backend decide
		const base64Url = parts[1];
		if (!base64Url) return false;
		
		// Add padding if needed
		const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
		const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
		
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);
		const payload = JSON.parse(jsonPayload);
		if (payload && payload.exp) {
			// Check if token expires within the next 15 seconds
			return payload.exp * 1000 < Date.now() + 15000;
		}
		return false;
	} catch (e) {
		console.error("Failed to parse token to check expiration", e);
		return true; // If we can't parse it but it looked like a JWT, assume expired
	}
}

export function getAuthToken(session: any): string | null {
	if (!session) return null;
	return session?.backendToken || session?.accessToken || (session?.user as any)?.token || (session as any)?.token || null;
}
