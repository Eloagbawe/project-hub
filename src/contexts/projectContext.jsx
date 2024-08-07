import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import projectHubApi from "../utils/projectHubApi";
import { AlertContext } from "./alertContext";
import { UserContext } from "./userContext";

export const ProjectContext = createContext(null);

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [projectLoading, setProjectLoading] = useState(false);
  const [tasksData, setTasksData] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [teamData, setTeamData] = useState(false);
  const [teamLoading, setTeamLoading] = useState(false);

  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const { displayAlert } = useContext(AlertContext);
  const { logoutUser } = useContext(UserContext);

  const navigate = useNavigate();

  const getProject = async (id) => {
    setProjectLoading(true);
    try {
      const { data } = await projectHubApi.getProject(id);
      setProjectLoading(false);
      setProject(data);
    } catch (err) {
      if (err.response.status === 404) {
        navigate("/not-found");
      }
      if (err.response.status === 401) {
        displayAlert({
          text: 'Session Invalid, Please Log in',
          status: 'error'
        })
        logoutUser();
        navigate('/login')
      }
      setProjectLoading(false);
    }
  };

  const getTeam = async (projectId) => {
    setTeamLoading(true);
    try {
      const { data } = await projectHubApi.getTeam(projectId);
      setTeamLoading(false);
      setTeamData(data);
    } catch (err) {
      console.error(err);
      setTeamLoading(false);
    }
  };

  const filterTasks = (tasks) => {
    setTodoTasks(tasks?.filter((task) => task.status === "to do"));
    setInProgressTasks(tasks?.filter((task) => task.status === "in progress"));
    setInReviewTasks(tasks?.filter((task) => task.status === "in review"));
    setDoneTasks(tasks?.filter((task) => task.status === "done"));
  };

  const getTasks = async (projectId) => {
    setTasksLoading(true);
    try {
      const { data } = await projectHubApi.getTasks(projectId);
      setTasksLoading(false);
      setTasksData(data);
      const { tasks } = data;
      setTodoTasks(tasks?.filter((task) => task.status === "to do"));
      setInProgressTasks(
        tasks?.filter((task) => task.status === "in progress")
      );
      setInReviewTasks(tasks?.filter((task) => task.status === "in review"));
      setDoneTasks(tasks?.filter((task) => task.status === "done"));
    } catch (err) {
      console.error(err);
      setTasksLoading(false);
    }
  };

  const loadProject = (id) => {
    getProject(id);
    getTasks(id);
    getTeam(id);
  };

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
      getTasks(projectId);
      getTeam(projectId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <ProjectContext.Provider
      value={{
        setProjectId,
        project,
        projectLoading,
        setProject,
        setProjectLoading,
        tasksData,
        tasksLoading,
        teamLoading,
        teamData,
        todoTasks,
        inProgressTasks,
        inReviewTasks,
        doneTasks,
        getTasks,
        filterTasks,
        setTodoTasks,
        setInProgressTasks,
        setInReviewTasks,
        setDoneTasks,
        loadProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
