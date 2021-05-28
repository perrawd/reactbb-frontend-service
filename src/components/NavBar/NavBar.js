import React, { useContext, useState } from 'react'
import { Menu, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import UserButton from '../UserButton/UserButton'
import { messageContext } from '../../context/flashmessage'

const NavBar = () => {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useContext(messageContext)
  // eslint-disable-next-line no-console
  console.log(user)
  const { pathname } = window.location
  const path = pathname === '/' ? 'home' : pathname.substr(1)

  const [activeItem, setActiveItem] = useState(path)
  const handleItemClick = (e, { name }) => setActiveItem(name)

  const divStyle = {
    height: 43,
    marginBottom: 10
  }

  const navBar = user
  ? <div>
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
      {
        message.length > 0
        ? <div><Message>{message}</Message></div>
        : <div><p>No message :(</p>
        <Button onClick={() => setMessage("Hello world context")}></Button>
        </div>
      }
    </div> : <div>
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

  return navBar
}

export default NavBar
