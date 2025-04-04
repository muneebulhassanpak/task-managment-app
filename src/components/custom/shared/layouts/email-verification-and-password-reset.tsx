import emailVerificationImage from "@/assets/email-verification.png";
import passwordResetImage from "@/assets/reset-password.png";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import OTPForm from "../../auth/otp-screen";
import EmailVerification from "../../auth/email-verification";
import PasswordReset from "../../auth/password-reset";

function EmailVerificationAndPasswordResetLayout() {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [searchParams] = useSearchParams();
  const queryType = searchParams.get("type");

  const verifyEmail = (email: string) => {
    // Simulate an API call to verify the email
    setTimeout(() => {
      console.log("Email verified:", email);
      setIsEmailVerified(true);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 order-2 md:order-1">
          {queryType === "forgot-password" && !isEmailVerified ? (
            <EmailVerification
              isEmailVerified={isEmailVerified}
              setIsEmailVerified={setIsEmailVerified}
              enteredEmail={(email) => verifyEmail(email)}
            />
          ) : isOtpVerified ? (
            <PasswordReset />
          ) : (
            <OTPForm setIsOtpVerified={setIsOtpVerified} />
          )}
        </div>
        <div className="order-1 md:order-2 flex flex-col items-center justify-center bg-gray-100 p-6">
          <img
            src={
              queryType === "forgot-password" &&
              isEmailVerified &&
              isOtpVerified
                ? passwordResetImage
                : emailVerificationImage
            }
            alt="Email Verification"
            className="w-16 md:w-80"
          />
          <h2 className="text-md sm:text-lg font-semibold text-gray-700 mt-4">
            {queryType === "forgot-password"
              ? isEmailVerified && !isOtpVerified
                ? "Enter OTP"
                : isOtpVerified && "Lets' update your Passwords"
              : "Verify Your Email"}
          </h2>
          <p className="hidden sm:block text-gray-600 text-center mt-2">
            {queryType === "forgot-password"
              ? isEmailVerified && !isOtpVerified
                ? "Enter the OTP sent to your email to reset your password."
                : isOtpVerified &&
                  "You can now update your password. Please enter a new password."
              : "Enter the OTP sent to your email to complete the verification process."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerificationAndPasswordResetLayout;
