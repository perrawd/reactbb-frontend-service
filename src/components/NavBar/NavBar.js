/**
 * NavBar component.
 *
 * @author Per Rawdin
 * @version 1.0.0
 */
import React, { useContext, useState } from 'react'
import { Menu, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../../context/auth'
import { MessageContext } from '../../context/flashmessage'

import UserButton from '../UserButton/UserButton'

const NavBar = () => {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useContext(MessageContext)

  const { pathname } = window.location
  const path = pathname === '/' ? 'home' : pathname.substr(1)

  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name)

  const divStyle = {
    height: 43,
    marginBottom: 10
  }

  return user ? <div>
      <Menu pointing secondary style={divStyle}>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <UserButton />
        </Menu.Menu>
      </Menu>
      {message.active && <div style={{ marginBottom: 10 }}>
          <Message
            onDismiss={() => setMessage({
                active: false,
                message: '',
                type: ''
              })}
            color={message.type}
          >
            {message.message}
          </Message>
        </div>
      }
    </div>
    : <div>
      <Menu pointing secondary style={divStyle}>
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
        <Menu.Menu>
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
        </Menu.Menu>
      </Menu>
    </div>
}

export default NavBar
