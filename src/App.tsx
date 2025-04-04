import { Routes, Route } from "react-router-dom";
import LoginForm from "@/components/custom/auth/login-form";
import RegisterForm from "@/components/custom/auth/register-form";
import AuthLayout from "@/components/custom/shared/layouts/auth-layout";
import EmailVerificationAndPasswordResetLayout from "./components/custom/shared/layouts/email-verification-and-password-reset";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route
            path="email-verification"
            element={<EmailVerificationAndPasswordResetLayout />}
          />
        </Route>
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
