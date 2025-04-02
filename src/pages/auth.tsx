import React from "react";
import RegisterForm from "@/components/custom/auth/register";

type AuthPageProps = {
  screen: string;
};

const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center max-w-6xl mx-auto px-2">
      <RegisterForm />
    </div>
  );
};

export default AuthPage;
