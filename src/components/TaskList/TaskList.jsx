import "./TaskList.scss";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/projectContext";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const TaskList = ({ openTaskDetails, openAddTask }) => {
  const { tasksData } = useContext(ProjectContext);

  return (
    <section className="task-list mt-5 xl:mt-10">
      <div className="my-4 md:mt-3 md:mb-5 flex md:justify-end">
        <button className="task-list__btn rounded-lg px-6 py-2" onClick={openAddTask}>Add Task</button>
      </div>
      <div className="task-list--mobile md:hidden">
        {tasksData?.tasks?.map((task) => (
          <div
            key={task?.id}
            className="task-list__card flex flex-col gap-5 p-3"
            onClick={() => openTaskDetails(task)}
          >
            <div className="flex gap-3 justify-between">
              <div className="w-[70%]">
                <p className="task-list__label">TITLE</p>
                <p className="task-list__text">{task.title}</p>
              </div>
              <div>
                <p className="task-list__label">STATUS</p>
                <p className="task-list__text">{task.status}</p>
              </div>
            </div>

            <div>
              <p className="task-list__label">ASSIGNED</p>
              <p className="task-list__text">
                {task?.user
                  ? `${task.user?.first_name}
                ${task.user?.last_name}`
                  : "Unassigned"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Assigned</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {tasksData?.tasks?.map((task) => (
              <Tr key={task?.id} className="task-list__item" onClick={() => openTaskDetails(task)}>
                <Td className="task-list__text task-list__text--title">
                  {task?.title}
                </Td>

                <Td className="task-list__text">
                  {task?.user
                    ? `${task?.user?.first_name} ${task?.user?.last_name}`
                    : "Unassigned"}
                </Td>
                <Td className="task-list__text">{task?.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </section>
  );
};

export default TaskList;
