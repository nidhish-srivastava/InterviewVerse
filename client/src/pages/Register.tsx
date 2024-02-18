import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useTrackerContext } from "../context/context";
import InputTag from "../components/InputTag";
import Button from "../components/Button";
import { url } from "../utils";
import  { LoaderIcon  } from "react-hot-toast";

const Register = () => {
  const { setLoggedInUser } = useTrackerContext();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword != inputs.password)
      return alert("Password not matching");
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      if (response.status == 403) {
        return alert("User already exists");
      }
      setIsLoading(true)
      const data = await response.json();
      localStorage.setItem("token",data.token)
      setLoggedInUser({username : data.username})
      window.location.href = "/"
    } catch (err) {
      return alert("Error while creating account");
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <Fragment>
      <Link to={`/`}>
        <Button className="home-btn">Home</Button>
      </Link>
      <form onSubmit={handleSubmit} className="form-group">
        <InputTag
          type="text"
          placeholder="Enter username"
          value={inputs.username}
          onChange={handleChange}
          label="Username"
          id="username"
          name="username"
        />
        <InputTag
          type="password"
          placeholder="Enter password"
          value={inputs.password}
          onChange={handleChange}
          label="Password"
          id="password"
          name="password"
        />
        <InputTag
          label="Confirm Password"
          name="confirm-password"
          id="confirm-password"
          type="password"
          value={confirmPassword}
          placeholder="re-enter password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {isLoading ? (
          <Button className="loading-btn">
            <LoaderIcon /> Creating account
          </Button>
        ) : (
          <Button btnType="submit">Sign Up</Button>
        )}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </Fragment>
  );
};

export default Register;
