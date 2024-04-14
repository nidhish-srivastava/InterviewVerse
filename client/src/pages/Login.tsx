import React, { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { useTrackerContext } from "../context/context";
import InputTag from "../components/InputTag";
import Button from "../components/Button";
import { url } from "../utils";
import { LoaderIcon } from "react-hot-toast";
const Lottie = lazy(() => import("lottie-react"));
import loginanimation from "../assets/loginainmation.json";

const Login = () => {
  const { setLoggedInUser } = useTrackerContext();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (response.status != 200) {
        alert("Check credentials");
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setLoggedInUser({ username: data.admin.username });
      window.location.href = "/";
    } catch (error) {
      setIsLoading(false);
      return alert("Error while creating account");
    } finally {
    }
  };
  return (
    <>
      <Link to={`/`}>
        <Button className="absolute top-4 left-2">Home</Button>
      </Link>
      <div className="auth-form-container">
        <div className="hidden sm:block">
          <Suspense>
          <Lottie animationData={loginanimation} />
          </Suspense>
        </div>
        <form onSubmit={handleSubmit} className="auth-form-group">
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
          {isLoading ? (
            <Button className="loading-btn">
              <LoaderIcon /> Logging In
            </Button>
          ) : (
            <Button btnType="submit" className="">
              Log In
            </Button>
          )}
          <span>
            Don't you have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
