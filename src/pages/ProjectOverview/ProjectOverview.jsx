import "./ProjectOverview.scss";
import ProjectLayout from "../../layouts/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import projectHubApi from "../../utils/projectHubApi";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";

const ProjectOverview = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getProject = async (projectId) => {
      setLoading(true);
      try {
        const { data } = await projectHubApi.getProject(projectId);
        console.log(data);
        setLoading(false);
        setProject(data);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    getProject(id);
  }, [id]);

  return (
    <ProjectLayout project={project}>
      {loading ? (
        <div className="flex justify-center h-[30vh] py-20">
          <Loader />
        </div>
      ) : (
        <section className="project-overview">
          <div className="project-description my-8">
            {project?.description ? <p className="project-description__text">{project?.description}</p> :
            <p className="project-description__none">{"No description provided"}</p>}

          </div>
        </section>
      )}
    </ProjectLayout>
  );
};

export default ProjectOverview;
