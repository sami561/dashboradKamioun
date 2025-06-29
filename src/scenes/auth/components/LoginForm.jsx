import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import { useLoginMutation } from "state/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().min(1, "email is required"),
  password: z.string().min(1, "Password is required"),
});

const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      try {
        await login(data).unwrap();
        toast.success("Logged in successfully");
        navigate("/dashboard");
      } catch (err) {
        toast.error(`Login failed: ${err.data?.message || "Unknown error"}`);
        console.error("Login failed:", err);
      }
      console.log("Login data:", data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isLoading };
};

const LoginForm = () => {
  const { handleSubmit, register, errors, isLoading } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <TextInput
        label="email"
        placeholder="Enter your email"
        register={register("email")}
        isError={errors.email}
        errorMessage={errors.username?.email}
      />

      <PasswordInput
        placeholder="Enter your password"
        register={register("password")}
        label="Password"
        isError={errors.password}
        errorMessage={errors.password?.message}
      />

      <div className="form-footer">
        {isLoading ? (
          <Loading />
        ) : (
          <button type="submit" className="login-button">
            Login
          </button>
        )}
      </div>
    </form>
  );
};
const Loading = () => {
  return <div className="loading-spinner"></div>;
};
export default LoginForm;
