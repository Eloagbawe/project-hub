import "./Landing.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const Landing = () => {
  return (
    <MainLayout>
      <section className="landing flex justify-center py-12 md:py-28 xl:py-40 px-4">
        <div className="landing__content">
          <h1 className="landing__heading flex flex-wrap gap-y-8 gap-x-4 md:gap-8">
            <span>Collaborate.</span>
            <span>Manage.</span>
            <span className="landing__text">Succeed.</span>
          </h1>
          <button className="landing__button my-10 rounded-lg px-8 py-4 hover:opacity-90 transition duration-500">
            Start New Project
          </button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Landing;
