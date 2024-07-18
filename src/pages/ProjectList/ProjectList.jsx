import "./ProjectList.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate, Link } from "react-router-dom";
import projectHubApi from "../../utils/projectHubApi";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import Loader from "../../components/Loader/Loader";
import { AlertContext } from "../../contexts/alertContext";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import Profile from "../../components/Profile/Profile";
import { capitalizeInitials } from "../../utils";
import moment from "moment";

const ProjectList = () => {
  const { user, logoutUser } = useContext(UserContext);
  const { displayAlert } = useContext(AlertContext);
  const [projectList, setProjectList] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);

      try {
        const res = await projectHubApi.getProjects();
        setProjectList(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          displayAlert({
            text: "Session Invalid, Please Log in",
            status: "error",
          });
          logoutUser();
          navigate("/login");
        }

        setLoading(false);
      }
    };

    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  return (
    <MainLayout>
      <section className="projects">
        <div className="flex flex-wrap gap-5 items-center justify-between">
          <h2 className="projects__heading">Projects</h2>
          <Link to="/projects/new">
            <button className="projects__add-btn rounded-lg px-3 md:px-5 py-1">
              Start New Project
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center h-[30vh] py-20">
            <Loader />
          </div>
        ) : (
          <>
            <div className="my-10 md:hidden">
              {projectList?.length > 0 ? (
                <>
                  {projectList.map((project) => (
                    <Link key={project.id} to={`/projects/${project.id}/board`}>
                      <ProjectItem project={project} />
                    </Link>
                  ))}
                </>
              ) : (
                <p>No projects</p>
              )}
            </div>
            <div className="my-10 hidden md:block">
              {projectList?.length > 0 ? (
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Manager</Th>
                      <Th>Updated</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {projectList?.map((project) => (
                      <Tr
                        key={project?.id}
                        className="project__item"
                        onClick={() =>
                          navigate(`/projects/${project.id}/board`)
                        }
                      >
                        <Td className="project__name w-[30%] lg:w-[50%]">
                          {project?.title}
                        </Td>

                        <Td className="project__text">
                          <div className="project__manager-container flex gap-1 items-center">
                            <Profile
                              name={capitalizeInitials(
                                project?.manager_first_name,
                                project?.manager_last_name
                              )}
                              small={true}
                            />
                            <p className="project__manager">
                              {project?.manager_first_name}{" "}
                              {project?.manager_last_name}
                            </p>
                          </div>
                        </Td>
                        <Td className="project__text">
                          <p className="project__timestamp">
                            Last Updated:{" "}
                            {moment(project?.updated_at).format("MMMM Do YYYY")}
                          </p>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <p>No projects</p>
              )}
            </div>
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default ProjectList;
