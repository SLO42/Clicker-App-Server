export {};

declare global {
	namespace Express {
		interface User {
			id: string;
			name: string;
			permissions: string;
			picture?: string;
		}
		interface Request {
			authInfo?: AuthInfo;
			user?: User;
		}
	}
}
