export {};

declare global {
	namespace Express {
		interface User {
			id: string;
			name: string;
			permissions: Array<string>;
		}
		interface Request {
			authInfo?: AuthInfo;
			user?: User;
		}
	}
}
