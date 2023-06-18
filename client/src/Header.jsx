import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
    <nav className='nav-bar'>
    <Link className='logo' to={`/`}>Interview<br/> Tracker</Link>
    <div className="right">
      <Link to={`/`}>My Interviews</Link>
      <Link to={`/create`}>Create Post</Link>
    </div>
    </nav>
    </header>
  )
}

export default Header