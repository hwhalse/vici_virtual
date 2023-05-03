export interface IUser  {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password?: string;
    created_at: string;
    updated_at: string;
}

export interface UserStats {
    id: number;
    date: string;
    weight: number;
    bodyfat: number;
    muscleMass: number;
}