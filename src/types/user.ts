export interface User {
    id: string;
    googleId?: string;
    name: string;
    email: string;
    permissions: Array<string>;
    verified: boolean;
    verificationCode: string | null;
    securityCode: string | null;
    deleted?: boolean;
    hash: string;
    salt: string;
    created_at?: Date;
    updated_at?: Date;
}