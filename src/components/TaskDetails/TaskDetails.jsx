import "./TaskDetails.scss";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import projectHubApi from "../../utils/projectHubApi";
import InputError from "../InputError/InputError";
import { Spinner } from "@chakra-ui/react";
import DeleteTask from "../DeleteTask/DeleteTask";
import { ProjectContext } from "../../contexts/projectContext";


const TaskDetails = ({ isOpen, onClose, task }) => {
  const { teamData, getTasks } = useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [updateTaskLoading, setUpdateTaskLoading] = useState(false);

  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);

  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
      return;
    }

    const payload = {
      title,
      description,
      user_id: assignee || null,
      status,
    };

    setUpdateTaskLoading(true);

    try {
      await projectHubApi.updateTask(teamData?.project_id, task.id, payload);
      await getTasks(teamData?.project_id);
      setUpdateTaskLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task?.title);
      setDescription(task?.description);
      setAssignee(task?.user?.id || "");
      setStatus(task?.status);
    }
  }, [task]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="task-details__content mx-4 pb-8">
          <ModalHeader className="mt-4">Task Details</ModalHeader>
          <ModalCloseButton className="mt-6" />
          <ModalBody>
            <form className="" onSubmit={handleUpdateTask}>
              <div className="my-4">
                <label htmlFor="title" className="task-details__label block">
                  Title:
                </label>
                <input
                  placeholder="title"
                  className={`task-details__input border rounded-lg px-3 py-2 ${
                    titleError && "task-details__input--error"
                  }`}
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitleError(false);
                    setTitle(e.target.value);
                  }}
                />
                {titleError && <InputError text="Title is required" />}
              </div>

              <div className="my-4">
                <label
                  htmlFor="description"
                  className="task-details__label block"
                >
                  Description:
                </label>
                <textarea
                  placeholder="Description"
                  className="task-details__input task-details__input--desc border rounded-lg px-3 py-2"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="my-6">
                <Select
                  variant="flushed"
                  placeholder="Assign to"
                  className="add-task__select"
                  focusBorderColor="#686D76"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                >
                  {teamData?.team?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                  <option value="">No one</option>
                </Select>
              </div>
              <div className="my-6">
                <Select
                  variant="flushed"
                  placeholder="Status"
                  className="add-task__select"
                  focusBorderColor="#686D76"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="to do">To do</option>
                  <option value="in progress">In Progress</option>
                  <option value="in review">In Review</option>
                  <option value="done">Done</option>
                </Select>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 justify-between">
                <button
                  type="button"
                  className="task-details__btn task-details__btn--delete rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center"
                  onClick={() => {
                    onClose()
                    setDeleteModal(true)
                  }}
                >
                  Delete Task
                </button>

                <button
                  type="submit"
                  className="task-details__btn rounded-full px-8 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center"
                >
                  Update Task
                  {updateTaskLoading && <Spinner size="xs" />}
                </button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <DeleteTask
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        task={task}
      />
    </>
  );
};

export default TaskDetails;
