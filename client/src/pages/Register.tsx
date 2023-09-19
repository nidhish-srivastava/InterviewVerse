import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTrackerContext } from "../context/context";

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
      } catch (err) {
      }
    }
    else{
      alert("Password not matching")
    }
  };

  return (
    <div className="auth">
      <Link to={`/`}>Home</Link>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="re-enter password"
          onChange={e=>setConfirmPassword(e.target.value)}
        />
        <button>Register</button>
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;