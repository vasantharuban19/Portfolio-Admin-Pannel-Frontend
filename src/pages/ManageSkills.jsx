import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearAllSkillErrors,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
  updateSkill,
} from "@/store/slices/skillSlice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingButton from "./subComponents/LoadingButton";
import Spinner from "./subComponents/Spinner";

const ManageSkills = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { skills, loading, error, message } = useSelector(
    (state) => state.skill
  );

  const [skillId, setSkillId] = useState("");
  const [newProficiency, setNewProficiency] = useState(1);
  const handleIputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };
  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
  };
  const handleDeleteSkill = (id) => {
    setSkillId(id);
    dispatch(deleteSkill(id));
  };
  const hnadleBackToDashboard = () => {
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="1">
        <TabsContent value="1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg sm:text-xl">
                Manage Your Skills
              </CardTitle>
              <Button
                className="w-fit ml-auto sm:ml-0"
                onClick={hnadleBackToDashboard}
              >
                Back To Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skills.length > 0 ? (
                skills.map((e) => {
                  return (
                    <Card key={e._id}>
                      <CardHeader className="text-xl sm:text-2xl font-bold flex items-center justify-between flex-row">
                        {e.title}
                        <TooltipProvider>
                          <Tooltip>
                            {loading && skillId === e._id ? (
                              <Spinner size={32} color="red" bgColor="white" />
                            ) : (
                              <button
                                className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                                onClick={() => handleDeleteSkill(e._id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </CardHeader>
                      <CardFooter>
                        <Label className="text-md sm:text-xl mr-2">
                          Proficiency
                        </Label>
                        <Input
                          className="w-30"
                          type="number"
                          defaultValue={e.proficiency}
                          onChange={(e) => handleIputChange(e.target.value)}
                          onBlur={() => handleUpdateSkill(e._id)}
                        />
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <CardHeader className="text-xl sm:text-2xl">
                  No Skills Found!
                </CardHeader>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
