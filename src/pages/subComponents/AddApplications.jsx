import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "./LoadingButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  addNewApplication,
  clearAllApplicationErrors,
  getAllApplications,
  resetApplicationSlice,
} from "@/store/slices/applicationSlice";
import { Image } from "lucide-react";

const AddApplications = () => {
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(
    (state) => state.softwareApplications
  );

  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };
  const handleAddApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);
    dispatch(addNewApplication(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(getAllApplications());
      setName("");
      setSvg("");
      setSvgPreview("");
    }
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[85vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          className="w-[100%] px-5 md:w-[650px]"
          onSubmit={handleAddApplication}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                ADD NEW APPLICATION
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Application Name
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <Input
                        type="text"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Example: vs-code"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full col-span-full">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Skill Svg
                  </Label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {svgPreview ? (
                        <img
                          className="mx-auto h-12 w-12 "
                          src={svgPreview ? `${svgPreview}` : "/image.svg"}
                        />
                      ) : (
                        <Image
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                        />
                      )}

                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <Label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-400 focus-within:outline-none focus-within:ring-1 focus-within:ring-slate-300 focus-within:ring-offset-2 hover:text-green-400"
                        >
                          <span>Upload a file</span>
                          <Input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleSvg}
                          />
                        </Label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {!loading ? (
              <Button
                type="submit"
                className="w-full rounded-md bg-violet-600 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline"
              >
                Add Application
              </Button>
            ) : (
              <LoadingButton
                content={"Adding Application"}
                bgColor={"bg-violet-600"}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddApplications;
