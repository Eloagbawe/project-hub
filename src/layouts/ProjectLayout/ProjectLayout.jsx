import "./ProjectLayout.scss";
import Footer from "../../components/Footer/Footer";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import settingsIcon from "../../assets/icons/settings.svg";
import MenuDropDown from "../../components/Menu/Menu";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { capitalizeInitials } from "../../utils";
import Profile from "../../components/Profile/Profile";
import { Divider } from "@chakra-ui/react";
import ProjectActions from "../../components/ProjectActions/ProjectActions";

const ProjectLayout = ({ project, children }) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const generateSettingsList = () => {
    const fullList = [
      {
        name: "Logout",
        clickFn: () => {
          handleLogout();
        },
      },
    ];

    return fullList;
  };

  return (
    <main className="project-layout">
      <div className="flex">
        <section className="nav xl:w-[20%] p-6 hidden xl:block">
          <div className="project-layout__logo pl-2">
            <Link to="/">
              <span className="logo">ProjectHUB</span>
            </Link>
          </div>

          <div className="my-10 px-2 flex gap-2">
            <div className="w-[80%]">
              <h3 className="nav__header break-words">{project?.title}</h3>
              <p className="nav__sub-text">Project</p>
            </div>
            <div className="mt-1 cursor-pointer">
              {/* <button onClick={() => setProjectPopover(true)}>
                <img src={moreIcon} alt="project options" className="" />
              </button> */}
              <ProjectActions/>
            </div>
          </div>

          <div className="nav__links">
            <Link
              to={`/projects/${id}/overview`}
              className={`nav__link block my-2 rounded-lg p-2 ${
                pathname === `/projects/${id}/overview` && "nav__link--active"
              }`}
            >
              Overview
            </Link>
            <Link
              className={`nav__link block my-2 rounded-lg p-2  ${
                pathname === `/projects/${id}/tasks` && "nav__link--active"
              }`}
            >
              Task Board
            </Link>
          </div>
        </section>
        <section className="project-layout__content w-[100%] xl:w-[80%] px-2 md:px-4">
          <div className="flex flex-wrap gap-3 justify-between items-center xl:block w-[100%] py-4 px-2 md:px-4 xl:p-0">
            <div className="xl:hidden project-layout__logo">
              <Link to="/">
                <span className="logo">ProjectHUB</span>
              </Link>
            </div>
            <div className="project-layout__actions xl:p-4 flex xl:justify-end gap-4">
              {user && (
                <MenuDropDown
                  menuIcon={settingsIcon}
                  itemList={generateSettingsList()}
                />
              )}
              <div>
                {user && (
                  <Profile
                    name={capitalizeInitials(user.first_name, user.last_name)}
                  />
                )}
              </div>
            </div>
          </div>
          <Divider className="xl:hidden" />

          <div className="project-layout__nav px-2 md:px-4 my-6 xl:mb-4 xl:mt-6 flex flex-wrap items-center gap-x-5 justify-between">
            <p className="project-layout__links">
              <Link to="/projects" className="project-layout__link mr-1">
                Projects
              </Link>
              /
              <Link
                to={window.location.pathname}
                className="project-layout__link ml-1"
              >
                {project?.title}
              </Link>
            </p>
            <div className="project__team flex gap-1 items-center">
              <p className="project__team-label">Team Members</p>
              <p className="project__team-count rounded-full flex items-center justify-center">
                {project?.team?.length <= 10 ? project?.team?.length : "10+"}
              </p>
            </div>
          </div>

          <div className="xl:hidden px-2 md:px-4">
            <h3 className="nav__header">{project?.title}</h3>
            <p className="nav__sub-text">Project</p>
          </div>
          <div className="px-2 md:px-4">{children}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default ProjectLayout;
