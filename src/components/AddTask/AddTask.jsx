import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import "./AddTask.scss";
import { useState, useContext } from "react";
import projectHubApi from "../../utils/projectHubApi";
import InputError from "../InputError/InputError";
import { Spinner } from "@chakra-ui/react";
import { ProjectContext } from "../../contexts/projectContext";
import { AlertContext } from "../../contexts/alertContext";


const AddTask = ({ isOpen, onClose }) => {
  const { teamData, getTasks } = useContext(ProjectContext);
  const { displayAlert } = useContext(AlertContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [addTaskLoading, setAddTaskLoading] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("to do");

  const closeAddTask = () => {
    setTitle("");
    setDescription("");
    setTitleError(false);
    setAssignee("");
    setStatus("to do");
    onClose();
  }

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
      return;
    }

    const newTask = {
      title,
      description,
      user_id: assignee || null,
      status
    };

    setAddTaskLoading(true);

    try {
      await projectHubApi.addTask(teamData?.project_id, newTask);
      await getTasks(teamData?.project_id);
      setAddTaskLoading(false);
      displayAlert({
        text: 'Task added successfully'
      })
      closeAddTask();
    } catch (err) {
      console.error(err);
      setAddTaskLoading(false);
      displayAlert({
        text: 'An error occurred while adding task',
        status: "error",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeAddTask}>
      <ModalOverlay />
      <ModalContent className="add-task__content mx-4 pb-8">
        <ModalHeader className="mt-4">Add Task</ModalHeader>
        <ModalCloseButton className="mt-6" />
        <ModalBody>
          <form className="" onSubmit={handleAddTask}>
            <div className="my-4">
              <label htmlFor="title" className="add-task__label block">
                Title:
              </label>
              <input
                placeholder="title"
                className={`add-task__input border rounded-lg px-3 py-2 ${
                  titleError && "add-task__input--error"
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
              <label htmlFor="description" className="add-task__label block">
                Description:
              </label>
              <textarea
                placeholder="Description"
                className="add-task__input add-task__input--desc border rounded-lg px-3 py-2"
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
                <option value=''>
                    No one
                </option>
                {teamData?.team?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name}
                  </option>
                ))}
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
            <button
              type="submit"
              className="add-task__btn mt-10 rounded-full px-8 md:px-16 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center"
            >
              Add Task
              {addTaskLoading && <Spinner size="xs" />}
            </button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTask;
