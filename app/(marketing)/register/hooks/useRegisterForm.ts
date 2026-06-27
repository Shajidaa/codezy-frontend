import { useState } from "react";
import { FormData } from "../types";

const initialFormData: FormData = {
  name: "",
  email: "",
  school: "",
  age: "",
  password: "",
  expertise: "Full Stack (MERN)",
};

export function useRegisterForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    updateField,
    resetForm,
  };
}
