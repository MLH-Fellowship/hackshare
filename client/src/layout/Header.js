import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const links = [
  {
    name: 'Profile',
    route: '/profile'
  },
  {
    name: 'Experts',
    route: '/experts'
  },
  {
    name: 'Learners',
    route: '/learners'
  },
]

const Header = () => {
  const {
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  // @TODO: Change window.location to react router
  const handleLogout = () => logout({ returnTo: window.location.origin })

  return (
    <header>
      HackShare
      { links.map(link => <Link to={link.route}>{ link.name }</Link>)}
      {isAuthenticated ? <button onClick={handleLogout}>Log out</button> : <button onClick={loginWithRedirect}>Log in</button> }
      { error && <div>Oops, Somethign went wrong... {JSON.stringify(error)}</div> }
      { user && user.name }
    </header>
  )
}

export default Header;