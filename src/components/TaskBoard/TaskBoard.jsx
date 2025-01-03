import "./TaskBoard.scss";
import TaskItem from "../TaskItem/TaskItem";
import addIcon from "../../assets/icons/add.svg";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/projectContext";
import projectHubApi from "../../utils/projectHubApi";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskBoard = ({ openTaskDetails, openAddTask }) => {
  const {
    todoTasks,
    inProgressTasks,
    inReviewTasks,
    doneTasks,
    tasksData,
    setTodoTasks,
    setInProgressTasks,
    setInReviewTasks,
    setDoneTasks,
  } = useContext(ProjectContext);

  const dragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceStatus = source.droppableId;
    const destinationStatus = destination.droppableId;

    const task_state = {
      to_do: todoTasks,
      in_progress: inProgressTasks,
      in_review: inReviewTasks,
      done: doneTasks
    }

    const tasks = [...tasksData.tasks];
    const task = tasks.find((task) => task.id === draggableId);

    task.status = destinationStatus;

    let destinationColumn = [];
    let sourceColumn = [];
    let setDestFunction;
    let setSrcFunction;

    switch (sourceStatus) {
      case "to do": {
        sourceColumn = todoTasks;
        setSrcFunction = setTodoTasks;
        break;
      }
      case "in progress": {
        sourceColumn = inProgressTasks;
        setSrcFunction = setInProgressTasks;
        break;
      }
      case "in review": {
        sourceColumn = inReviewTasks;
        setSrcFunction = setInReviewTasks;
        break;
      }
      case "done": {
        sourceColumn = doneTasks;
        setSrcFunction = setDoneTasks;
        break;
      }
      default: {
        sourceColumn = [];
        setSrcFunction = null;
      }
    }

    switch (destinationStatus) {
      case "to do": {
        destinationColumn = todoTasks;
        setDestFunction = setTodoTasks;
        break;
      }
      case "in progress": {
        destinationColumn = inProgressTasks;
        setDestFunction = setInProgressTasks;
        break;
      }
      case "in review": {
        destinationColumn = inReviewTasks;
        setDestFunction = setInReviewTasks;
        break;
      }
      case "done": {
        destinationColumn = doneTasks;
        setDestFunction = setDoneTasks;
        break;
      }
      default: {
        destinationColumn = [];
        setDestFunction = null;
      }
    }

    let newDestTasks = Array.from(destinationColumn);
    let newSrcTasks = Array.from(sourceColumn);

    if (destinationStatus === sourceStatus) {
      newSrcTasks.splice(source.index, 1);
      newSrcTasks.splice(destination.index, 0, task);
      setSrcFunction(newSrcTasks);
    } else {
      newDestTasks.splice(destination.index, 0, task);
      newSrcTasks.splice(source.index, 1);
      setDestFunction(newDestTasks);
      setSrcFunction(newSrcTasks);
    }

    try {
      await projectHubApi.updateTask(tasksData.project_id, task.id, { ...task, 
        status: {
          src: sourceStatus,
          dest: destinationStatus,
          pos: {
            src: source.index,
            dest: destination.index
          }
        }
      }
    );
    } catch (err) {
      console.error(err);
      setTodoTasks(task_state.to_do);
      setInProgressTasks(task_state.in_progress);
      setInReviewTasks(task_state.in_review);
      setDoneTasks(task_state.done);
    }
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <div className="task-board flex gap-5 mb-10">
        <Droppable droppableId="to do">
          {(provided) => (
            <div
              className="task-board__item px-3 pt-3 pb-6 rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="flex gap-3 justify-between items-center">
                <p className="task-board__label">To do</p>
                <button
                  className="task-board__btn flex items-center gap-1"
                  onClick={openAddTask}
                >
                  <img src={addIcon} alt="add task icon" />
                  <span>Add Task</span>
                </button>
              </div>
              <div className="task-board__tasklist">
                {todoTasks?.map((task, index) => (
                  <div className="task-board__task" key={task.id}>
                    <Draggable draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskItem
                          task={task}
                          handleClick={openTaskDetails}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  </div>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="in progress">
          {(provided) => (
            <div
              className="task-board__item px-3 pt-3 pb-6 rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p className="task-board__label">In Progress</p>
              <div className="task-board__tasklist">
                {inProgressTasks?.map((task, index) => (
                  <div className="task-board__task" key={task.id}>
                    <Draggable draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskItem
                          task={task}
                          handleClick={openTaskDetails}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  </div>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="in review">
          {(provided) => (
            <div
              className="task-board__item px-3 pt-3 pb-6 rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p className="task-board__label">In Review</p>
              <div className="task-board__tasklist">
                {inReviewTasks?.map((task, index) => (
                  <div className="task-board__task" key={task.id}>
                    <Draggable draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskItem
                          task={task}
                          handleClick={openTaskDetails}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  </div>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="done">
          {(provided) => (
            <div
              className="task-board__item px-3 pt-3 pb-6 rounded-lg"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <p className="task-board__label">Done</p>
              <div className="task-board__tasklist">
                {doneTasks?.map((task, index) => (
                  <div className="task-board__task" key={task.id}>
                    <Draggable draggableId={task.id} index={index}>
                      {(provided) => (
                        <TaskItem
                          task={task}
                          handleClick={openTaskDetails}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          innerRef={provided.innerRef}
                        />
                      )}
                    </Draggable>
                  </div>
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
