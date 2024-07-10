import "./ProjectList.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

const ProjectList = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <section className="projects">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <h2 className="projects__heading">Projects</h2>
          <button className="projects__add-btn rounded-lg px-5 py-1">
            Start New Project
          </button>
        </div>
        <div className="my-10">
      
        </div>
      </section>
    </MainLayout>
  );
};

export default ProjectList;
