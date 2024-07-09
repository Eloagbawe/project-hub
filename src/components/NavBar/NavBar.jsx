import "./NavBar.scss";
import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import menuIcon from "../../assets/icons/menu.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import MenuDropDown from "../Menu/Menu";

const NavBar = () => {
  const generateHamburgerList = () => {
    const fullList = [
      {
        name: "About",
        link: "/",
      },
      {
        name: "Projects",
        link: "/",
      },
      {
        name: "Contact",
        link: "/",
      },
      {
        name: "Signup/Login",
        link: "/",
      },
      {
        name: "Logout",
        clickFn: () => {
          console.log("logout");
        },
      },
    ];
    return fullList;
  };

  const generateSettingsList = () => {
    const fullList = [
      {
        name: "Logout",
        clickFn: () => {
          console.log("logout");
        },
      },
    ];

    return fullList;
  };

  return (
    <div className="nav md:flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <MenuDropDown
            menuIcon={menuIcon}
            itemList={generateHamburgerList()}
          />
        </div>

        <div className="nav__logo">
          <Link to="/">
            <span className="logo">ProjectHUB</span>
          </Link>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <Link to="/" className="nav__link">
          About
        </Link>
        <Link to="/" className="nav__link">
          Contact
        </Link>
        <Link to="/" className="nav__link">
          Projects
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <MenuDropDown
          menuIcon={settingsIcon}
          itemList={generateSettingsList()}
        />

        <Link to="/" className="nav__link">
          Log In/Sign Up
        </Link>
        <div>
          <Profile name="EI" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
