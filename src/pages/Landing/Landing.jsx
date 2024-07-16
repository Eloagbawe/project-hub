import "./Landing.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import Testimonials from "../../components/Testimonials/Testimonials";

const Landing = () => {
  const { user } = useContext(UserContext);

  return (
    <MainLayout no_align={true}>
      <section className="landing">
        <div className="landing__content">
          <div className="landing__header py-6 md:py-10 xl:py-16 px-5 flex justify-center">
            <div className="md:my-8 xl:my-16">
              <h1 className="landing__heading flex flex-wrap gap-y-8 gap-x-4 md:gap-8">
                <span>Collaborate.</span>
                <span>Manage.</span>
                <span className="landing__text">Succeed.</span>
              </h1>
              <Link to={`${user ? "/projects/new" : "/login"}`}>
                <button className="landing__button my-10 rounded-lg px-8 py-4 hover:opacity-90 transition duration-500">
                  Start New Project
                </button>
              </Link>
            </div>
          </div>

          <div className="landing__tagline p-8">
            <div className="landing__sub-header flex justify-center py-8">
              <h2 className="md:w-[60%] text-center">
                A modern tool for project management
              </h2>
            </div>

            <div className="my-16 flex flex-wrap gap-10 md:gap-20 justify-center">
              <div className="tagline flex flex-col gap-2 items-center">
                <h3 className="tagline__heading">Create Project</h3>
                <p className="tagline__text text-center">
                  Set your project up for success with a structured and
                  organized approach.
                </p>
                <div className="tagline__line my-3"></div>
              </div>
              <div className="tagline flex flex-col gap-2 items-center">
                <h3 className="tagline__heading">Manage Tasks</h3>
                <p className="tagline__text text-center">
                  Achieve more with a clear, organized task management system.
                </p>
                <div className="tagline__line my-3"></div>
              </div>
              <div className="tagline flex flex-col gap-2 items-center">
                <h3 className="tagline__heading">Manage Team</h3>
                <p className="tagline__text text-center">
                  Empower your team by assigning tasks, and keeping everyone
                  aligned towards common goals.
                </p>
                <div className="tagline__line my-3"></div>
              </div>
            </div>
          </div>
          <Testimonials />
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;
