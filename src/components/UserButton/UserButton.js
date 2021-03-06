/**
 * UserButton component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
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
            src="./profile.png"
            circular
          />
        </Menu.Item>
      }
      hoverable
    >
      <Menu secondary vertical borderless compact>
      {user.role === 'MODERATOR' &&
          <Menu.Item
          name="admin"
            active={activeItem === 'admin'}
            as={Link}
            to="/admin/"
          >
          </Menu.Item>
        }
        <Menu.Item
          name="my page"
          active={activeItem === 'my page'}
          as={Link}
          to="/profile/"
        />
        <Menu.Item
          disabled
          name="friends"
          active={activeItem === 'friends'}
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
