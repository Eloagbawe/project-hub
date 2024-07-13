import "./ProjectOverview.scss";
import ProjectLayout from "../../layouts/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import Loader from "../../components/Loader/Loader";
import { ProjectContext } from "../../contexts/projectContext";

const ProjectOverview = () => {
  const { project, projectLoading, setProjectId } = useContext(ProjectContext);
  const { id } = useParams();

  useEffect(() => {
    setProjectId(id);
  }, [id, setProjectId]);

  return (
    <ProjectLayout>
      {projectLoading ? (
        <div className="flex justify-center h-[30vh] py-20">
          <Loader />
        </div>
      ) : (
        <section className="project-overview mt-10">
          <div className="project-description my-8">
            {project?.description ? (
              <p className="project-description__text">
                {project?.description}
              </p>
            ) : (
              <p className="project-description__none">
                {"No description provided"}
              </p>
            )}
          </div>
        </section>
      )}
    </ProjectLayout>
  );
};

export default ProjectOverview;
