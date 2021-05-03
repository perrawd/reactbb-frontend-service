import React, { Component, useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

export default function NavBar (props) {
  const { user, logout } = useContext(AuthContext)
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name)


  const navBar = user ? (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name='messages'
          active={activeItem === 'messages'}
          onClick={handleItemClick}
          as={Link}
          to="/graphql"
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={handleItemClick}
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='my profile'
            onClick={logout}
          />
        </Menu.Menu>
        <Menu.Menu>
          <Menu.Item
            name='logout'
            onClick={logout}
          />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
        <Menu.Menu >
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      </Menu>
    </div>
  )

  return navBar
}
