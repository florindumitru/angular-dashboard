import { UserDomains } from "./user-domains";

export interface User {
    id?: string;
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
    userDomains?: UserDomains[];
}
