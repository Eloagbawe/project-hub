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
import { ProjectContext } from "../../contexts/projectContext";

import menuIcon from "../../assets/icons/menu.svg";

const ProjectLayout = ({ children }) => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
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

  const generateHamburgerList = () => {
    const fullList = [
      {
        name: "Overview",
        link: `/projects/${id}/overview`,
      },
      {
        name: "Tasks",
        link: `/projects/${id}/board`,
      },
      {
        name: "Team",
        link: `/projects/${id}/team`,
      },
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
              <ProjectActions />
            </div>
          </div>

          <div className="nav__links">
            <Link
              to={`/projects/${id}/overview`}
              className={`nav__link block my-2 rounded-lg p-2 ${
                (pathname === `/projects/${id}/overview` ||
                  pathname === `/projects/${id}/edit`) &&
                "nav__link--active"
              }`}
            >
              Overview
            </Link>
            <Link
              to={`/projects/${id}/board`}
              className={`nav__link block my-2 rounded-lg p-2  ${
                pathname === `/projects/${id}/board` && "nav__link--active"
              }`}
            >
              Task Board
            </Link>
            <Link
              to={`/projects/${id}/team`}
              className={`nav__link block my-2 rounded-lg p-2  ${
                pathname === `/projects/${id}/team` && "nav__link--active"
              }`}
            >
              Team
            </Link>
          </div>
        </section>
        <section className="project-layout__content w-[100%] xl:w-[80%] px-2 md:px-4">
          <div className="flex flex-wrap gap-3 justify-between items-center xl:block w-[100%] py-4 px-2 md:px-4 xl:p-0">
            <div className="md:hidden">
              <MenuDropDown
                menuIcon={menuIcon}
                itemList={generateHamburgerList()}
              />
            </div>
            <div className="xl:hidden project-layout__logo">
              <Link to="/">
                <span className="logo">ProjectHUB</span>
              </Link>
            </div>

            <div className="hidden md:flex xl:hidden flex gap-5">
              <Link to={`/projects/${id}/overview`}>
                <span className="nav__link">Overview</span>
              </Link>
              <Link to={`/projects/${id}/board`}>
                <span className="nav__link">Tasks</span>
              </Link>
              <Link to={`/projects/${id}/team`}>
                <span className="nav__link">Team</span>
              </Link>
            </div>
            <div className="project-layout__actions xl:p-4 flex xl:justify-end gap-4 items-center">
              <div className="hidden md:block">
                {user && (
                  <MenuDropDown
                    menuIcon={settingsIcon}
                    itemList={generateSettingsList()}
                  />
                )}
              </div>

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

            <Link
              to={`/projects/${id}/team`}
              className="project__team flex gap-1 items-center"
            >
              <span className="project__team-label">Team Members</span>
              <span className="project__team-count rounded-full flex items-center justify-center">
                {project?.team?.length <= 10 ? project?.team?.length : "10+"}
              </span>
            </Link>
          </div>

          {/* <div className="xl:hidden px-2 md:px-4">
            <h3 className="nav__header">{project?.title}</h3>
            <p className="nav__sub-text">Project</p>
          </div> */}
          <div className="px-2 md:px-4">{children}</div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default ProjectLayout;
