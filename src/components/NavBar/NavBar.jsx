import "./NavBar.scss";
import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import menuIcon from "../../assets/icons/menu.svg";
import settingsIcon from "../../assets/icons/settings.svg";
import MenuDropDown from "../Menu/Menu";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { capitalizeInitials } from "../../utils";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

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
    ];

    if (user) {
      fullList.push({
        name: "Logout",
        clickFn: () => {
          handleLogout();
        },
      });
    } else {
      fullList.push({
        name: "Signup/Login",
        link: "/login",
      });
    }
    return fullList;
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
        {user && <MenuDropDown
          menuIcon={settingsIcon}
          itemList={generateSettingsList()}
        />}

        {!user && (
          <Link to="/login" className="nav__link">
            Log In/Sign Up
          </Link>
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
  );
};

export default NavBar;
