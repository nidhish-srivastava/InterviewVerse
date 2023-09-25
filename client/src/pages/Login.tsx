import React, { useState,Fragment } from 'react'
import {Link } from 'react-router-dom'
import axios from 'axios'
import { useTrackerContext } from '../context/context'
import InputTag from '../components/InputTag'
import Button from '../components/Button'

const Login = () => {
  const {setLoggedInUser} = useTrackerContext()
  const [inputs,setInputs] = useState({
    username : "",
    password : ""
  })
  
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/auth/login",{inputs})
      localStorage.setItem("token",response.data.token)
      setLoggedInUser({username : response.data.username})
      alert('Logged In Successfully')
      // navigate("/")

      window.location.href = "/"
    } catch (error) {
    }
  }
  return (
    <Fragment>
      <Link to={`/`}>
        <Button label='Home'/>
        </Link>
      <form onSubmit={handleSubmit} className='form-group'>
        <InputTag type="text" placeholder='Enter username' value={inputs.username} onChange={handleChange} label='Username' id='username' name = "username"/>
        <InputTag type='password' placeholder='Enter password' value={inputs.password} onChange={handleChange} label='Password' id='password' name = "password" />
        <Button  btnType='submit' label='Login'/>
        <span>
        Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </Fragment>
  )
}

export default Login