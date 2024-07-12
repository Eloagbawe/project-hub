import "./Landing.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";

const Landing = () => {
  const { user } = useContext(UserContext);

  return (
    <MainLayout>
      <section className="landing flex justify-center py-6 md:py-10 xl:py-16">
        <div className="landing__content">
          <h1 className="landing__heading flex flex-wrap gap-y-8 gap-x-4 md:gap-8">
            <span>Collaborate.</span>
            <span>Manage.</span>
            <span className="landing__text">Succeed.</span>
          </h1>
          <Link to={`${user ? '/projects/new' : '/login'}`}>
            <button className="landing__button my-10 rounded-lg px-8 py-4 hover:opacity-90 transition duration-500">
              Start New Project
            </button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;
