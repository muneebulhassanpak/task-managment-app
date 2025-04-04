import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { emailVerificationSchemaType, emailVerification } from "@/schemas/auth";
import { useSearchParams } from "react-router-dom";
import InputField from "../shared/input-fields/input-field";
import { toast } from "sonner";

type EmailVerificationProps = {
  isEmailVerified: boolean;
  setIsEmailVerified: (isVerified: boolean) => void;
  enteredEmail: (email: string) => void;
};

const EmailVerification: React.FC<EmailVerificationProps> = ({
  isEmailVerified,
  setIsEmailVerified,
  enteredEmail,
}) => {
  const form = useForm<emailVerificationSchemaType>({
    resolver: zodResolver(emailVerification),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const [searchParams] = useSearchParams();
  const queryType = searchParams.get("type");

  function onSubmit(data: emailVerificationSchemaType) {
    enteredEmail(data.email);
    setIsEmailVerified(true);
    toast.success("Email verified successfully.");
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Verify Your Email</h2>
      <p className="text-gray-600 mb-6">
        Enter your email to receive a password reset OTP.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {queryType === "forgot-password" && (
            <InputField
              control={form.control}
              name="email"
              type="email"
              placeholder="Email"
              label="Your Registered Email"
              required
              disabled={isEmailVerified}
            />
          )}

          <Button type="submit" className="w-full">
            {queryType === "forgot-password"
              ? isEmailVerified
                ? "Reset Password"
                : "Verify Email"
              : "Verify"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EmailVerification;
