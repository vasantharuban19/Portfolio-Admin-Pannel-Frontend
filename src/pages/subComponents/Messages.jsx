import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllMessageErrors,
  deleteMessage,
  getAllMessages,
  resetMessageSlice,
} from "@/store/slices/messageSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "./LoadingButton";

const Messages = () => {
  const dispatch = useDispatch();

  const { messages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch(deleteMessage(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetMessageSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, loading, error, message]);

  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((e) => {
                    return (
                      <Card key={e._id} className="grid gap-3 pl-3">
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Sender Name :</span>
                          {e.senderName}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Sender Email :</span>
                          {e.senderEmail}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Subject :</span>
                          {e.subject}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Message :</span>
                          {e.message}
                        </CardDescription>
                        <CardFooter className="justify-end">
                          {loading && messageId === e._id ? (
                            <LoadingButton
                              content={"Deleting"}
                              width={"w-30"}
                              bgColor={"bg-rose-700"}
                            />
                          ) : (
                            <Button
                              className="w-30 rounded-md bg-rose-600 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus-visible:outline"
                              onClick={() => handleMessageDelete(e._id)}
                            >
                              Delete
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardHeader className="text-2xl">
                    No Message Found!
                  </CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Messages;
