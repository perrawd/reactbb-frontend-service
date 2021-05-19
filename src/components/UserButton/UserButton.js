import React, { useContext, useState } from 'react'
import { Popup, Menu, Image } from 'semantic-ui-react'
import { AuthContext } from '../../context/auth'

const UserButton = () => {
  const [activeItem, setActiveItem] = useState('')
  const { user, logout } = useContext(AuthContext)
  const handleItemClick = (e, { name }) => setActiveItem(name)

  return (
    <Popup
      trigger={
        <Menu.Item name="Me" style={{ padding: 3 }}>
          {' '}
          <Image
            size="mini"
            alt="avatar"
            src="https://semantic-ui.com/images/avatar2/small/mark.png"
            circular
          />
        </Menu.Item>
      }
      hoverable
    >
      <Menu secondary vertical borderless compact>
        {user.sub.role === 'MODERATOR' &&
          <Menu.Item
          name="admin"
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          >
          </Menu.Item>
        }
        <Menu.Item
          name="messages"
          active={activeItem === 'messages'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="my account"
          active={activeItem === 'my account'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="logout"
          active={activeItem === 'logout'}
          onClick={logout}
        />
      </Menu>
    </Popup>
  )
}

export default UserButton
