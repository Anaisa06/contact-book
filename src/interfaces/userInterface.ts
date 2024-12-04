export interface IUser{
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    syncronization?: boolean;
    onboarding?: boolean;
}