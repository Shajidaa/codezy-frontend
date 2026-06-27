export type UserRole = "student" | "teacher";

export interface FormData {
  name: string;
  email: string;
  school: string;
  age: string;
  password: string;
  expertise: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
}

export interface ApiError {
  message: string;
  statusCode?: number;
}
