import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTrackerContext } from "../context/context";
import InputTag from "../components/InputTag";
import Button from "../components/Button";

const Register = () => {
  const {setLoggedInUser} = useTrackerContext()
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [confirmPassword,setConfirmPassword] = useState("")

  const navigate = useNavigate();

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(confirmPassword==inputs.password){
      try {
        const response = await axios.post("http://localhost:3000/auth/signup", inputs);
      localStorage.setItem("token",response.data.token)
        setLoggedInUser({username : response.data.username})
        alert('Registration Successfull')
        navigate("/");
      window.location.href = "/"
      } catch (err) {
      }
    }
    else{
      alert("Password not matching")
    }
  };

  return (
    <Fragment>
      <Link to={`/`}>Home</Link>
      <form onSubmit={handleSubmit} className="form-group">
      <InputTag type="text" placeholder='Enter username' value={inputs.username} onChange={handleChange} label='Username' id='username' name = "username"/>
      <InputTag type='password' placeholder='Enter password' value={inputs.password} onChange={handleChange} label='Password' id='password' name = "password" />
      <InputTag label="Confirm Password" name="confirm-password" id="confirm-password" type="password" value={confirmPassword} placeholder="re-enter password" onChange={e=>setConfirmPassword(e.target.value)}/>
        <Button btnType='submit' label='Register'/>
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </Fragment>
  );
};

export default Register;