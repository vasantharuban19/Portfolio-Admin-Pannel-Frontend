import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearAllUsersErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import LoadingButton from "./LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const UpdateProfile = () => {
  const dispatch = useDispatch();

  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [githubURL, setGithubURL] = useState(user && user.githubURL);
  const [linkedinURL, setLinkedinURL] = useState(user && user.linkedinURL);
  const [avatar, setAvatar] = useState(
    user && user?.avatar && user?.avatar?.url
  );
  const [avatarPreview, setAvatarPreview] = useState(
    user && user?.avatar && user?.avatar?.url
  );
  const [resume, setResume] = useState(user && user.resume && user.resume.url);
  const [resumePreview, setResumePreview] = useState(
    user && user.resume && user.resume.url
  );

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("githubURL", githubURL);
    formData.append("linkedinURL", linkedinURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
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
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Profile Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview || "/default-avatar.jpg"}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="file:w-30 file:px-2 file:py-1.5 file:font-semibold 
             file:rounded-lg 
             file:bg-orange-400 file:text-white file:cursor-pointer
             hover:file:bg-orange-300 hover:file:text-black"
                    />
                  </div>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                  <Label>Resume</Label>
                  <Link
                    to={user && user.resume && user.resume.url}
                    target="_blank"
                  >
                    <img
                      src={resumePreview ? resumePreview : "/avatarPreview.jpg"}
                      alt="avatar"
                      className="w-full  h-auto sm:w-72 sm:h-72 rounded-2xl"
                    />
                  </Link>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={resumeHandler}
                      className="file:w-30 file:px-2 file:py-1.5 file:font-semibold 
             file:rounded-lg 
             file:bg-orange-400 file:text-white file:cursor-pointer
             hover:file:bg-orange-300 hover:file:text-black"
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  className="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  className="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  className="About Me"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input
                  type="text"
                  className="Portfolio URL"
                  value={portfolioURL}
                  onChange={(e) => setPortfolioURL(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  className="Github URL"
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  className="LinkedIn URL"
                  value={linkedinURL}
                  onChange={(e) => setLinkedinURL(e.target.value)}
                />
              </div>

              {!loading ? (
                <Button
                  onClick={() => handleUpdateProfile()}
                  className="w-full rounded-md bg-violet-600 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline"
                >
                  Update Profile
                </Button>
              ) : (
                <LoadingButton content={"Updating"} bgColor={"bg-violet-600"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
