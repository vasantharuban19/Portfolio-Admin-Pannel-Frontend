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
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/store/slices/timelineSlice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingButton from "./subComponents/LoadingButton";
import Spinner from "./subComponents/Spinner";

const ManageTimeline = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/");
  };

  const { loading, timeline, error, message } = useSelector(
    (state) => state.timeline
  );
  const [timelineId, setTimelineId] = useState("");

  const handleDeleteTimeline = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.success(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg sm:text-xl">
                Manage Your Timeline
              </CardTitle>
              <Button className="w-35" onClick={handleBackToDashboard}>
                Back To Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline.length > 0 ? (
                    timeline.map((e) => {
                      return (
                        <TableRow className="bg-accent" key={e._id}>
                          <TableCell className="font-medium">
                            {e.title}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {e.description}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {e.timeline.from}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {e.timeline.to}
                          </TableCell>
                          <TableCell className="flex-justify-end">
                            {loading && timelineId === e._id ? (
                              <Spinner size={32} color="red" bgColor="white" />
                            ) : (
                              <button
                                className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                                onClick={() => handleDeleteTimeline(e._id)}
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-lg">
                      <TableCell>No Timline Found!</TableCell>
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

export default ManageTimeline;
