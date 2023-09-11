import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [inputs,setInputs] = useState({
    username : "",
    password : ""
  })
  const navigate = useNavigate()
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:4000/auth/login",{inputs})
      navigate("/")
    } catch (error) {

    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' name='username' onChange={handleChange} />
        <input type="password" placeholder='password' name='password' onChange={handleChange} />
        <button>Login</button>
        <span>
        Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login