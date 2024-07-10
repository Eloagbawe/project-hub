import axios from 'axios';

class ProjectHubApi {

  constructor(){
    this.api_url = `${import.meta.env.VITE_API_URL}/api/v1`;
  }

  login = (payload) => {
    return axios.post(`${this.api_url}/auth/login`, payload);
  }

  signup = (payload) => {
    return axios.post(`${this.api_url}/auth/signup`, payload)
  }

}

const projectHubApi = new ProjectHubApi();

export default projectHubApi;
