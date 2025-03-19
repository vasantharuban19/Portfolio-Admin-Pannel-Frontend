import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  clearAllForgotResetPassError,
} from "@/store/slices/forgotResetPasswordSlice";
import { getUser } from "@/store/slices/userSlice";
import toast from "react-hot-toast";
import LoadingButton from "./subComponents/LoadingButton";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleResetPassword = (password, confirmPassword) => {
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotResetPassError());
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
              Set A New Password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input
                type="password"
                placeholder="new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Confirm Password</Label>
              </div>
              <Input
                type="password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {!loading ? (
              <Button
                onClick={() => handleResetPassword(password, confirmPassword)}
                className="w-full rounded-md bg-[rgb(90,228,167)] text-md font-semibold text-white shadow-sm hover:bg-[rgb(0,223,192)] hover:text-black focus-visible:outline"
              >
                Reset Password
              </Button>
            ) : (
              <LoadingButton content={"Resetting Your Password"} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src="/resetPassPage.jpg" alt="reset" />
      </div>
    </div>
  );
};
export default ResetPassword;
