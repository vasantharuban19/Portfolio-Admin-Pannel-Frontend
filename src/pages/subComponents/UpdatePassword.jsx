import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUsersErrors,
  getUser,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlice";
import toast from "react-hot-toast";
import LoadingButton from "./LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, isUpdated, message]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 ico className="text-3xl font-bold">
                Update Password
              </h1>
              <p className="text-balance text-muted-foreground">
                Update Your Password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()}
                  className="w-full rounded-md bg-violet-600 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline"
                >
                  Update Password
                </Button>
              ) : (
                <LoadingButton content={"Updating Password"} bgColor={"bg-violet-600"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
