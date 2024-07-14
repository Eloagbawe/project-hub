import "./ProjectBoard.scss";
import ProjectLayout from "../../layouts/ProjectLayout/ProjectLayout";
import { useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import Loader from "../../components/Loader/Loader";
import TaskBoard from "../../components/TaskBoard/TaskBoard";
import { ProjectContext } from "../../contexts/projectContext";
import AddTask from "../../components/AddTask/AddTask";
import TaskDetails from "../../components/TaskDetails/TaskDetails";
import TaskList from "../../components/TaskList/TaskList";

const ProjectBoard = () => {
  const { projectLoading, setProjectId, teamLoading, tasksLoading } =
    useContext(ProjectContext);
  const [addTaskModal, setAddTaskModal] = useState(false);

  const [taskDetailsModal, setTaskDetailsModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setProjectId(id);
  }, [id, setProjectId]);

  const openTaskDetails = (task) => {
    setTaskDetails(task);
    setTaskDetailsModal(true);
  };

  const openAddTask = () => {
    setAddTaskModal(true);
  };

  return (
    <ProjectLayout>
      {projectLoading || tasksLoading || teamLoading ? (
        <div className="flex justify-center h-[30vh] py-20">
          <Loader />
        </div>
      ) : (
        <section>
          <div className="hidden xl:block">
            <TaskBoard
              openAddTask={openAddTask}
              openTaskDetails={openTaskDetails}
            />
          </div>

          <div className="xl:hidden">
            <TaskList
              openAddTask={openAddTask}
              openTaskDetails={openTaskDetails}
            />
          </div>

          <AddTask
            isOpen={addTaskModal}
            onClose={() => setAddTaskModal(false)}
          />
          <TaskDetails
            isOpen={taskDetailsModal}
            onClose={() => setTaskDetailsModal(false)}
            task={taskDetails}
          />
        </section>
      )}
    </ProjectLayout>
  );
};

export default ProjectBoard;
