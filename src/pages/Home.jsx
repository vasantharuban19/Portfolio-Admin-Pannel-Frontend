import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { clearAllUsersErrors, logout } from "@/store/slices/userSlice";
import {
  House,
  LayoutDashboard,
  FolderGit2,
  PencilRuler,
  Dock,
  History,
  MessageSquareMore,
  UserRound,
  LogOut,
  PanelLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "./subComponents/Dashboard";
import AddProject from "./subComponents/AddProject";
import AddSkill from "./subComponents/AddSkill";
import AddApplications from "./subComponents/AddApplications";
import AddTimeline from "./subComponents/AddTimeline";
import Messages from "./subComponents/Messages";
import Account from "./subComponents/Account";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [active, setActive] = useState("");
  const { isAuthenticated, error, user, message } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(logout());
    // toast.success("Logged out successfully...");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUsersErrors());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (message) {
      toast.success(message);
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full md:h-8 md:w-8 md:text-base">
            <LayoutDashboard className="h-6 w-6 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Dashboard"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Dashboard")}
                >
                  <House className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Account"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Account")}
                >
                  <UserRound className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Account</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Project"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit2 className="h-5 w-5" />
                  <span className="sr-only">Add Project</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Project</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Skill"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Skill")}
                >
                  <PencilRuler className="h-5 w-5" />
                  <span className="sr-only">Add Skill</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Skill</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Application"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Application")}
                >
                  <Dock className="h-5 w-5" />
                  <span className="sr-only">Add Application</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Application</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Add Timeline"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                  <span className="sr-only">Add Timeline</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Add Timeline</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    active === "Messages"
                      ? "text-accent-foreground bg-accent"
                      : "text-muted-foreground"
                  }  transition-colors hover:text-foreground md:h-8 md:w-8`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageSquareMore className="h-5 w-5" />
                  <span className="sr-only">Messages</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Messages</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Menu</SheetDescription>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base`}
              >
                <LayoutDashboard className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link>

              <SheetClose asChild>
                <Link
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <House className="h-5 w-5" />
                  Dashboard
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Account"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <UserRound className="h-5 w-5" />
                  Account
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Project"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit2 className="h-5 w-5" />
                  Add Project
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Skill"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Skill")}
                >
                  <PencilRuler className="h-5 w-5" />
                  Add Skill
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Application"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Application")}
                >
                  <Dock className="h-5 w-5" />
                  Add Application
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Timeline"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Add Timeline")}
                >
                  <History className="h-5 w-5" />
                  Timeline
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Messages"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground "
                  }`}
                  onClick={() => setActive("Messages")}
                >
                  <MessageSquareMore className="h-5 w-5" />
                  Messages
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  className={
                    "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  }
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
          <img
            src={user?.avatar?.url || "/avatarPreview.jpg"}
            alt="avatar"
            className="w-15 h-15 rounded-full max-[900px]:hidden"
          />
          <h1 className="text-3xl max-[900px]:text-2xl">
            Welcome {user?.fullName} 👋
          </h1>
        </div>
      </header>
      {(() => {
        switch (active) {
          case "Dashboard":
            return <Dashboard />;
          case "Account":
            return <Account />;
          case "Add Project":
            return <AddProject />;
          case "Add Skill":
            return <AddSkill />;
          case "Add Application":
            return <AddApplications />;
          case "Add Timeline":
            return <AddTimeline />;
          case "Messages":
            return <Messages />;

          default:
            return <Dashboard />;
        }
      })()}
    </div>
  );
};

export default Home;
