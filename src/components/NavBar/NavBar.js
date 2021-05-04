import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import UserButton from "../UserButton/UserButton";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = window.location;
  const path = pathname === "/" ? "home" : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const divStyle = { height: 43,
                     marginBottom: 10 };

  const navBar = user
    ? <div>
      <Menu pointing secondary style={divStyle}>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <UserButton></UserButton>
        </Menu.Menu>
      </Menu>
    </div> : <div>
      <Menu pointing secondary style={divStyle}>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
        <Menu.Menu>
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      </Menu>
    </div>;

  return navBar;
}

export default NavBar;
