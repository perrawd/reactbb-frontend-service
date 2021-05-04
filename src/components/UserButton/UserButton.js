import React, { useContext, useState } from "react";
import { Popup, Menu } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";

const UserButton = () => {

  const [activeItem, setActiveItem] = useState("");
  const { logout } = useContext(AuthContext);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Popup
      trigger={
        <Menu.Item name="Me" style={{ padding: 3 }}>
          {" "}
          <img
            size="50%"
            alt="avatar"
            src="https://semantic-ui.com/images/avatar2/small/mark.png"
          />
        </Menu.Item>
      }
      hoverable
    >
      <Menu secondary vertical borderless compact>
        <Menu.Item
          name="messages"
          active={activeItem === "messages"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="my account"
          active={activeItem === "my account"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={logout}
        />
      </Menu>
    </Popup>
  );
};

export default UserButton;
