import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { useContext } from "react";
import { AlertContext } from "./contexts/alertContext";
import Alert from "./components/Alert/Alert";
import NotFound from "./pages/NotFound/NotFound";
import ProjectList from "./pages/ProjectList/ProjectList";
import AddProject from "./pages/AddProject/AddProject";
import ProjectOverview from "./pages/ProjectOverview/ProjectOverview";
import ProjectBoard from "./pages/ProjectBoard/ProjectBoard";
import EditProject from "./pages/EditProject/EditProject";
import ProjectTeam from "./pages/ProjectTeam/ProjectTeam";

function App() {
  const { alert } = useContext(AlertContext);

  return (
    <BrowserRouter>
      {alert && <Alert text={alert.text} status={alert.status} end={alert.end}/>}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/projects" element={<ProjectList/>} />
        <Route path="/projects/new" element={<AddProject/>} />
        <Route path="/projects/:id/overview" element={<ProjectOverview/>} />
        <Route path="/projects/:id/board" element={<ProjectBoard/>} />
        <Route path="/projects/:id/edit" element={<EditProject/>} />
        <Route path="/projects/:id/team" element={<ProjectTeam/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
