import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "./LoadingButton";
import {
  clearAllApplicationErrors,
  deleteApplication,
  getAllApplications,
  resetApplicationSlice,
} from "@/store/slices/applicationSlice";
import toast from "react-hot-toast";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";
import { clearAllTimelineErrors } from "@/store/slices/timelineSlice";
import Spinner from "./Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToManageProjects = () => {
    navigate("/manage/projects");
  };

  const navigateToManageSkills = () => {
    navigate("/manage/skills");
  };

  const navigateToManageTimeline = () => {
    navigate("/manage/timeline");
  };

  const { user } = useSelector((state) => state.user);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );
  const {
    skills,
    loading: skillLoading,
    error: skillError,
    message: skillMessage,
  } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);

  const [appId, setAppId] = useState(null);

  const handleDeleteSoftwareApplication = (id) => {
    setAppId(id);
    dispatch(deleteApplication(id));
  };

  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllApplicationErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetApplicationSlice());
      dispatch(getAllApplications());
    }
  }, [
    dispatch,
    skillLoading,
    skillError,
    skillMessage,
    appLoading,
    appError,
    appMessage,
    timelineLoading,
    timelineError,
    timelineMessage,
  ]);

  return (
    <>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="flex-1 items-start gap-4 p-1 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
          <div className="gird auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxe">
                    {user.aboutMe}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user.portfolioURL} target="_blank">
                    <Button>Visit Portfolio</Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-3xl ">
                    {projects && projects?.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={navigateToManageProjects} className="w-30">
                    Manage Projects
                  </Button>
                </CardFooter>
              </Card>

              <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-3xl">
                    {skills && skills.length}
                  </CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={navigateToManageSkills}>
                    Manage Skills
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">
                            Stack
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Deployed
                          </TableHead>
                          <TableHead className="md:table-cell">
                            Update
                          </TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {projects && projects.length > 0 ? (
                          projects.map((e) => {
                            return (
                              <TableRow className="bg-accent" key={e._id}>
                                <TableCell>
                                  <div className="font-medium">{e.title}</div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {e.stack}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  <Badge
                                    className="text-xs"
                                    variant="secondary"
                                  >
                                    {e.deployed}
                                  </Badge>
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <Link to={`/update/project/${e._id}`}>
                                    <Button>Update</Button>
                                  </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link to={e.projectLink} target="_blank">
                                    <Button>Live</Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-lg overflow-y-hidden">
                              No Projects Found!
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {skills && skills.length > 0 ? (
                      skills.map((e) => {
                        return (
                          <Card key={e._id}>
                            <CardHeader>{e.title}</CardHeader>
                            <CardFooter>
                              <Progress value={e.proficiency} />
                            </CardFooter>
                          </Card>
                        );
                      })
                    ) : (
                      <p className="text-lg">No Skills Found!</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="lg:grid md:grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell text-center">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {softwareApplications &&
                        softwareApplications.length > 0 ? (
                          softwareApplications.map((e) => {
                            return (
                              <TableRow className="bg-accent" key={e._id}>
                                <TableCell className="font-medium">
                                  {e.name}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  <img
                                    className="w-7 h-7"
                                    src={e.svg && e.svg.url}
                                    alt={e.name}
                                  />
                                </TableCell>
                                <TableCell className="md:table-cell text-center">
                                  {appLoading && appId === e._id ? (
                                    <button>
                                      <Spinner
                                        size={32}
                                        color="red"
                                        bgColor="white"
                                      />
                                    </button>
                                  ) : (
                                    <Button
                                      onClick={() =>
                                        handleDeleteSoftwareApplication(e._id)
                                      }
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-lg overflow-y-hidden">
                              No Applications Found!
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Button
                      onClick={navigateToManageTimeline}
                      className="w-fit"
                    >
                      Manage Timeline
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="md:table-cell">From</TableHead>
                          <TableHead className="md:table-cell text-right">
                            To
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {timeline && timeline.length > 0 ? (
                          timeline.map((e) => {
                            return (
                              <TableRow className="bg-accent" key={e._id}>
                                <TableCell className="font-medium">
                                  {e.title}
                                </TableCell>
                                <TableCell className="md:table-cell">
                                  {e.timeline.from}
                                </TableCell>
                                <TableCell className="md:table-cell text-right">
                                  {e.timeline.to
                                    ? `${e.timeline.to}`
                                    : "Present"}
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell className="text-lg overflow-y-hidden">
                              No Timeline Found!
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
