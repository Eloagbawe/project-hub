import "./DeleteConfirm.scss";
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
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

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
        <ModalHeader className="mt-4">Delete Task</ModalHeader>
        <ModalCloseButton className="mt-6" />
        <ModalBody>
          <p className="delete-task__text">
            Sure to Delete this task with title <span className="font-bold">{task?.title}</span> from{" "}
            <span className="font-bold">{project?.title}</span>?{" "}
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-between">
            <button
              type="button"
              className="delete-task__btn delete-task__btn--cancel rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center order-3 md:order-1"
              onClick={() => onClose()}
            >
              CANCEL
            </button>
            <button
              type="button"
              className="delete-task__btn delete-task__btn--delete rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center order-2"
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

export const DeleteProject = ({ isOpen, onClose }) => {
  const { project } = useContext(ProjectContext);
  const { displayAlert } = useContext(AlertContext);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [deleteProjectLoading, setDeleteProjectLoading] = useState(false);

  const handleDeleteProject = async () => {
    setDeleteProjectLoading(true);

    if (user.id !== project.manager_id) {
      return;
    }

    try {
      await projectHubApi.deleteProject(project.id);
      setDeleteProjectLoading(false);
      displayAlert({
        text: "Project deleted successfully",
      });
      onClose();
      navigate("/projects");
    } catch (err) {
      console.error(err);
      setDeleteProjectLoading(false);
      displayAlert({
        text: "An error occurred while deleting project",
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="delete-project__content mx-4 pb-8">
        <ModalHeader className="mt-4">Delete Project</ModalHeader>
        <ModalCloseButton className="mt-6" />
        <ModalBody>
          <p className="delete-project__text">
            Sure to Delete project with title{" "}
            <span className="font-bold">{project?.title}?</span>
          </p>
          <p className="delete-project__text font-bold my-2">
            This action cannot be undone
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-between">
            <button
              type="button"
              className="delete-project__btn delete-project__btn--cancel rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center order-3 md:order-1"
              onClick={() => onClose()}
            >
              CANCEL
            </button>
            <button
              type="button"
              className="delete-project__btn delete-project__btn--delete rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center order-2"
              onClick={() => handleDeleteProject()}
            >
              Delete Project
              {deleteProjectLoading && <Spinner size="xs" />}
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const RemoveMember = ({ isOpen, onClose, member }) => {
  const { project, loadProject } = useContext(ProjectContext);
  const { displayAlert } = useContext(AlertContext);
  const { user } = useContext(UserContext);

  const [removeMemberLoading, setRemoveMemberLoading] = useState(false);

  const handleRemoveMember = async () => {
    setRemoveMemberLoading(true);

    if (user.id !== project.manager_id) {
      return;
    }

    try {
      await projectHubApi.removeTeamMember(project.id, member.id);
      setRemoveMemberLoading(false);
      displayAlert({
        text: "Team member removed successfully",
      });
      loadProject(project.id)
      onClose();
    } catch (err) {
      console.error(err);
      setRemoveMemberLoading(false);
      displayAlert({
        text: "An error occurred while removing team member",
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="remove-member__content mx-4 pb-8">
        <ModalHeader className="mt-4">Remove Team Member</ModalHeader>
        <ModalCloseButton className="mt-6" />
        <ModalBody>
          <p className="remove-member__text">
            Sure to remove
            <span className="font-bold"> {member?.first_name} {member?.last_name} </span>
            from
            <span className="font-bold"> {project?.title}?</span>
          </p>

          <div className="mt-10 flex flex-wrap gap-3 justify-between">
            <button
              type="button"
              className="remove-member__btn remove-member__btn--cancel rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center order-3 md:order-1"
              onClick={() => onClose()}
            >
              CANCEL
            </button>
            <button
              type="button"
              className="remove-member__btn remove-member__btn--delete rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center order-2"
              onClick={() => handleRemoveMember()}
            >
              Remove team member
              {removeMemberLoading && <Spinner size="xs" />}
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};


export default DeleteTask;
