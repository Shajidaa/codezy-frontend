export const EXPERTISE_OPTIONS = [
  { value: "Full Stack (MERN)", label: "Full Stack (MERN)" },
  { value: "Next.js & Cloud", label: "Next.js & Cloud" },
  { value: "UI/UX Engineering", label: "UI/UX Engineering" },
] as const;

export const ROUTES = {
  STUDENT_DASHBOARD: "/dashboard/student",
  TEACHER_DASHBOARD: "/dashboard/teacher",
  LOGIN: "/login",
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  AGE_MIN: 13,
  AGE_MAX: 100,
} as const;
