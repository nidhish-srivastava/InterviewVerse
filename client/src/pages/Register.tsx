import { useState } from "react";
import { Link } from "react-router-dom";
import InputTag from "../components/ui/InputTag";
import Button from "../components/ui/Button";
import { url } from "../utils";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import loginanimation from "../assets/loginainmation.json";
import LottieAnimationLoader from "../components/ui/LottieAnimationLoader";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email : ""
  });
  const [errors, setErrors] = useState({
    email : "",
    password: "",
    confirmPassword : ""
  });
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validInputCheckHandler = () => {
    const newErrors = {password: "",confirmPassword : "",email : "" };
    let isValid = true;

    if (inputs.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!isValidEmail(inputs.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if(confirmPassword != inputs.password){
      newErrors.confirmPassword = "Password Not Matching"
      isValid = false
    }

    setErrors(newErrors);
    return isValid;
  };
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validInputCheckHandler()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      if (response.status == 403) {
        setIsLoading(false);
        return toast.error("Username already taken");
      }
      if (response.ok) {
        toast.success("Verification email sent. Please check your inbox.");
        setIsLoading(false);
        setIsEmailSent(true);
      }
    } catch (err) {
      setIsLoading(false);
      return toast.error("Error while creating account");
    }
  };

  return (
    <>
      <Toaster />
      <Link to={`/`}>
        <Button className=" absolute top-4 left-2">Home</Button>
      </Link>
      <div className="auth-form-container">
        {isEmailSent ? (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded absolute right-1/4 left-1/4 top-1/3 mt-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline">
              {" "}
              Verification email has been sent to {inputs.username}. Please
              check your inbox and click the verification link to verify
              account.
            </span>
          </div>
        ) : (
          <>
            <div className="hidden sm:block">
              <LottieAnimationLoader animationData={loginanimation} />
            </div>
            <form onSubmit={handleSubmit} className="auth-form-group">
              <InputTag
              type="text"
              placeholder="Enter username"
              label="Username"
              id="username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              />
              <InputTag
                type="text"
                placeholder="Enter email"
                label="Email"
                id="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <InputTag
                type="password"
                placeholder="Enter password"
                value={inputs.password}
                onChange={handleChange}
                label="Password"
                id="password"
                name="password"
                error={errors.password}
              />
              <InputTag
                label="Confirm Password"
                name="confirm-password"
                id="confirm-password"
                type="password"
                value={confirmPassword}
                placeholder="re-enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
              />
              {isLoading ? (
                <Button className="loading-btn">
                  <LoaderIcon /> Creating account
                </Button>
              ) : (
                <Button btnType="submit">Sign Up</Button>
              )}
              <span className="text-sm">
                Do you have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login
                </Link>
              </span>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
