import axios from "axios";

class ProjectHubApi {
  constructor() {
    this.api_url = `${import.meta.env.VITE_API_URL}/api/v1`;
  }

  login = (payload) => {
    return axios.post(`${this.api_url}/auth/login`, payload);
  };

  signup = (payload) => {
    return axios.post(`${this.api_url}/auth/signup`, payload);
  };

  getUsers = (query) => {

    return axios.get(`${this.api_url}/users?query=${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  getProjects = () => {
    return axios.get(`${this.api_url}/projects`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  addProject = (payload) => {
    return axios.post(`${this.api_url}/projects`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  getProject = (id) => {
    return axios.get(`${this.api_url}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  updateProject = (id, payload) => {
    return axios.put(`${this.api_url}/projects/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  getTasks = (projectId) => {
    return axios.get(`${this.api_url}/projects/${projectId}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  getTeam = (projectId) => {
    return axios.get(`${this.api_url}/projects/${projectId}/team`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  addTask = (projectId, payload) => {
    return axios.post(`${this.api_url}/projects/${projectId}/tasks`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };

  updateTask = (projectId, taskId, payload) => {
    return axios.put(
      `${this.api_url}/projects/${projectId}/tasks/${taskId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  };

  deleteTask = (projectId, taskId) => {
    return axios.delete(`${this.api_url}/projects/${projectId}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  };
}

const projectHubApi = new ProjectHubApi();

export default projectHubApi;
