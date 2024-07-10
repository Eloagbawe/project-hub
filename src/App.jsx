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
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
