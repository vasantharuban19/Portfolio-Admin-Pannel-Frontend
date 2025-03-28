import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackToPortfolio = () => {
    navigate("/");
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoFrontLink, setGitRepoFrontLink] = useState("");
  const [gitRepoBackLink, setGitRepoBackLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");

  const descriptionList = description
    ? description.split(/\*\s+/).filter((item) => item.trim() !== "")
    : [];
  const technologiesList = technologies
    ? technologies.split(/\s*[\.\*]\s*/).filter((item) => item.trim() !== "")
    : [];

  useEffect(() => {
    const getProject = async () => {
      await axios
        .get(
          `https://portfolio-backend-rmjr.onrender.com/api/v1/project/get/${id}`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          // console.log(res);
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoFrontLink(res.data.project.gitRepoFrontLink);
          setGitRepoBackLink(res.data.project.gitRepoBackLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  return (
    <div className="flex justify-center items-center min-h-screen px-4 py-8 bg-gray dark:bg-gray-900">
      <div className="w-full max-w-[800px] bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 md:p-8">
        {/* Back Button */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={handleBackToPortfolio}
            className="dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-700 dark:hover:bg-gray-500"
          >
            Back To Portfolio
          </Button>
        </div>

        {/* Project Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          {title}
        </h1>

        {/* Project Banner */}
        {projectBanner && (
          <div className="w-full flex mb-6">
            <img
              src={projectBanner}
              alt="Project Banner"
              className="w-full max-h-[350px] object-contain rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Project Details */}
        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Description:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {descriptionList.map((item, index) => (
                <li key={index} className="text-sm sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <p className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Features:
            </p>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {technologiesList.map((item, index) => (
                <li key={index} className="text-sm sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack & Deployed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Stack:
              </p>
              <p className="text-gray-700 dark:text-gray-300">{stack}</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Deployed:
              </p>
              <p className="text-gray-700 dark:text-gray-300">{deployed}</p>
            </div>
          </div>

          {/* Project Links */}
          <div className="space-y-4">
            {gitRepoFrontLink && (
              <ProjectLink
                title="GitHub Repository (Frontend)"
                url={gitRepoFrontLink}
              />
            )}
            {gitRepoBackLink && (
              <ProjectLink
                title="GitHub Repository (Backend)"
                url={gitRepoBackLink}
              />
            )}
            {projectLink && (
              <ProjectLink title="Live Project" url={projectLink} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectLink = ({ title, url }) => (
  <div>
    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
      {title}:
    </p>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-blue-600 dark:text-blue-400 hover:underline break-words"
    >
      {url}
    </a>
  </div>
);

export default ViewProject;
