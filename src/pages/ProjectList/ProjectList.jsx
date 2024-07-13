import "./ProjectList.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate, Link } from "react-router-dom";
import projectHubApi from "../../utils/projectHubApi";
import ProjectItem from "../../components/ProjectItem/ProjectItem";
import Loader from "../../components/Loader/Loader";

const ProjectList = () => {
  const { user } = useContext(UserContext);
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
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  return (
    <MainLayout>
      <section className="projects">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <h2 className="projects__heading">Projects</h2>
          <Link to="/projects/new">
            <button className="projects__add-btn rounded-lg px-5 py-1">
              Start New Project
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center h-[30vh] py-20">
            <Loader />
          </div>
        ) : (
          <div className="my-10">
            {projectList?.length > 0 ? (
              <>
                {projectList.map((project) => (
                  <Link key={project.id} to={`/projects/${project.id}/board`}>
                    <ProjectItem project={project} />
                  </Link>
                ))}
              </>
            ) : (
              <p>No projects created yet</p>
            )}
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default ProjectList;
