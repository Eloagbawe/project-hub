import "./ProjectBoard.scss";
import ProjectLayout from "../../layouts/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import Loader from "../../components/Loader/Loader";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
import { ProjectContext } from "../../contexts/projectContext";

const ProjectBoard = () => {
  const { projectLoading, setProjectId, teamLoading, tasksLoading } = useContext(ProjectContext);

  const { id } = useParams();

  useEffect(() => {
    
    setProjectId(id);

  }, [id, setProjectId]);

  return (
    <ProjectLayout>
      {projectLoading || tasksLoading || teamLoading ? (
        <div className="flex justify-center h-[30vh] py-20">
          <Loader />
        </div>
      ) : (
        <section>
          <div className="hidden xl:block">
            <TaskBoard />
          </div>
        </section>
      )}
    </ProjectLayout>
  );
};

export default ProjectBoard;
