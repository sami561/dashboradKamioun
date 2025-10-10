import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import TextInput from "./TextInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "state/authApi";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const useForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await forgotPassword(data.email).unwrap();
      toast.success(
        "Password reset email sent successfully! Please check your inbox."
      );
    } catch (error) {
      console.error("Password reset failed:", error);
      toast.error(
        error.data?.businessErrorDescription ||
          "Failed to send password reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register: registerField,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
  };
};

const ForgotPasswordForm = () => {
  const { handleSubmit, register, errors, isLoading } = useForgotPasswordForm();

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <TextInput
        label="Email"
        placeholder="Enter your email address"
        register={register("email")}
        isError={errors.email}
        errorMessage={errors.email?.message}
      />
      <div className="form-footer">
        {isLoading ? (
          <Loading />
        ) : (
          <button type="submit" className="login-button">
            Send Password Reset Email
          </button>
        )}
      </div>
    </form>
  );
};

const Loading = () => {
  return <div className="loading-spinner"></div>;
};

export default ForgotPasswordForm;
