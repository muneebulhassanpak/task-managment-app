import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { passwordResetSchemaType, passwordResetSchema } from "@/schemas/auth";
import InputField from "../shared/input-fields/input-field";
import { toast } from "sonner";

const PasswordReset = () => {
  const form = useForm<passwordResetSchemaType>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  function onSubmit(data: passwordResetSchemaType) {
    toast.success("Password reset successfully.");
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>
      <p className="text-gray-600 mb-6">
        Enter your new password below to reset your account password.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            control={form.control}
            name="password"
            type="password"
            placeholder="New Password"
            label="New Password"
            required
          />
          <InputField
            control={form.control}
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            label="Confirm New Password"
            required
          />

          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PasswordReset;
