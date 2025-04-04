import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { otpSchemaType, otpSchema } from "@/schemas/auth";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

type OTPFormProps = {
  setIsOtpVerified: (isVerified: boolean) => void;
};

const OTPForm: React.FC<OTPFormProps> = ({ setIsOtpVerified }) => {
  const form = useForm<otpSchemaType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
    mode: "onBlur",
  });

  const [searchParams] = useSearchParams();
  const queryType = searchParams.get("type");

  function onSubmit(data: otpSchemaType) {
    toast.success("Your OTP has been submitted successfully.");
    console.log("OTP submitted:", data.pin);
    queryType === "forgot-password" && setIsOtpVerified(true);
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800">Enter OTP</h2>
      <p className="text-gray-600 mb-6">
        {queryType === "forgot-password"
          ? "Enter the OTP sent to your email to reset your password."
          : "We've sent a One-Time Password (OTP) to your email. Please enter it below to verify your identity."}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  {queryType === "forgot-password"
                    ? "Enter the OTP to proceed with resetting your password."
                    : "Please enter the one-time password sent to your email."}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Verify
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OTPForm;
