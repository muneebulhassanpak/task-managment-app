import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center max-w-6xl mx-auto px-2">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
