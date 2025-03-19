import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "@/store/slices/projectSlice";
import { Eye, Pen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "./subComponents/LoadingButton";
import Spinner from "./subComponents/Spinner";

const ManageProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/");
  };

  const { projects, loading, error, message } = useSelector(
    (state) => state.project
  );

  const [projectId, setProjectId] = useState("");

  const handleDeleteProject = (id) => {
    setProjectId(id);
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, loading, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg sm:text-xl">
                Manage Your Projects
              </CardTitle>
              <Button className="w-35" onClick={handleBackToDashboard}>
                Back To Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Stack
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Deployed
                    </TableHead>
                    <TableHead className="md:table-cell">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length > 0 ? (
                    projects.map((e) => {
                      return (
                        <TableRow className="bg-accent" key={e._id}>
                          <TableCell>
                            <div className="font-medium">
                              <img
                                src={e.projectBanner && e.projectBanner.url}
                                alt={e.title}
                                className="w-16 h-16"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{e.title}</div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {e.stack}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {e.deployed}
                          </TableCell>
                          <TableCell className="flex flex-row items-center gap-3 h-24">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/view/project/${e._id}`}>
                                    <button
                                      className="border-green-600 border-2 rounded-full h-8 w-8 flex 
                                      justify-center items-center text-green-600  hover:text-slate-950 
                                      hover:bg-green-600"
                                    >
                                      <Eye className="h-5 w-5" />
                                    </button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  View
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/update/project/${e._id}`}>
                                    <button className="border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400  hover:text-slate-950 hover:bg-yellow-400">
                                      <Pen className="h-5 w-5" />
                                    </button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  Edit
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                {loading && projectId === e._id ? (
                                  <Spinner
                                    size={32}
                                    color="red"
                                    bgColor="white"
                                  />
                                ) : (
                                  <button
                                    className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50   hover:bg-red-600"
                                    onClick={() => handleDeleteProject(e._id)}
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </button>
                                )}
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-lg">
                      <TableCell>No Projects Found!</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageProjects;
