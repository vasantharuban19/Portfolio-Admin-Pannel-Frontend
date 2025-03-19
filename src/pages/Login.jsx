import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { clearAllUsersErrors, login } from "@/store/slices/userSlice";
import toast from "react-hot-toast";
import LoadingButton from "./subComponents/LoadingButton";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, isAuthenticated, error, loading]);
  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="****@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center place-content-between">
                <Label>Password</Label>
                <Link
                  to="/password/forgot"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!loading ? (
              <Button
                onClick={() => handleLogin(email, password)}
                className="w-full rounded-md bg-[rgb(89,199,184)] text-md font-semibold text-white shadow-sm hover:bg-[rgb(0,223,192)] focus-visible:outline"
              >
                Login
              </Button>
            ) : (
              <LoadingButton content={"Loggin In"} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="/loginPage.jpg" alt="login" />
      </div>
    </div>
  );
};

export default Login;
