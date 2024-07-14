import "./DeleteTask.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState, useContext } from "react";
import { Spinner } from "@chakra-ui/react";
import projectHubApi from "../../utils/projectHubApi";
import { ProjectContext } from "../../contexts/projectContext";
import { AlertContext } from "../../contexts/alertContext";


const DeleteTask = ({ isOpen, onClose, task }) => {
  const { getTasks, project } = useContext(ProjectContext);
  const { displayAlert } = useContext(AlertContext);

  const [deleteTaskLoading, setDeleteTaskLoading] = useState(false);

  const handleDeleteTask = async() => {
    setDeleteTaskLoading(true);

    try {
      await projectHubApi.deleteTask(project.id, task.id);
      await getTasks(project.id);
      setDeleteTaskLoading(false);
      displayAlert({
        text: 'Task deleted successfully'
      })
      onClose();
    } catch (err) {
      console.error(err);
      setDeleteTaskLoading(false);
      displayAlert({
        text: 'An error occurred while deleting task',
        status: "error",
      });

    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="delete-task__content mx-4 pb-8">
        <ModalHeader className="mt-4">Task Details</ModalHeader>
        <ModalCloseButton className="mt-6" />
        <ModalBody>
          <p className="delete-task__text">
            Sure to Delete this task with title <span className="font-bold">{task?.title}</span> from{" "}
            <span className="font-bold">{project?.title}</span>?{" "}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-between">
            <button
              type="button"
              className="delete-task__btn delete-task__btn--cancel rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center"
              onClick={() => onClose()}
            >
              CANCEL
            </button>
            <button
              type="button"
              className="delete-task__btn delete-task__btn--delete rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center"
              onClick={() => handleDeleteTask()}
            >
              Delete Task
              {deleteTaskLoading && <Spinner size="xs" />}
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTask;
