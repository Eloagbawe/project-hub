import "./Menu.scss";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

const MenuDropDown = ({ menuIcon, itemList }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<img src={menuIcon} alt="menu icon" />}
        variant="none"
        size={"small"}
      />
      <MenuList>
        {itemList?.map((item, index) => (
          <MenuItem key={index} onClick={() => item.clickFn && item.clickFn()}>
            {item.link ? <Link to={item.link} className="menu__text">
              {item.name}
            </Link> : 
            <span className="menu__text">
              {item.name}
            </span>}
          </MenuItem>
        ))}
        {/* <MenuItem><Link to="/" className="nav__link">About</Link></MenuItem>
        <MenuItem><Link to="/" className="nav__link">Projects</Link></MenuItem>
        <MenuItem><Link to="/" className="nav__link">Contact</Link></MenuItem>
        <MenuItem><Link to="/" className="nav__link">Signup/Login</Link></MenuItem> */}
      </MenuList>
    </Menu>
  );
};

export default MenuDropDown;
