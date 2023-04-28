import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import GetAllPosts from './posts/GetAllPosts'
import CreatePost from './posts/CreatePost'

const App = () => {
  return (
    <Router>
      <Link to={`/create`}>Create Post</Link>
      <Routes>
      <Route path='/' element = {<GetAllPosts/>} />
      <Route path='/create' element = {<CreatePost/>} />
      </Routes>
    </Router>
  )
}

export default App