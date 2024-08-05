import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import LottieAnimationLoader from "../components/ui/LottieAnimationLoader";
import loginanimation from "../assets/loginainmation.json";

function ForgotPassword() {
  return (
    <>
      <Toaster />
      <Link to={`/`}>
        <Button className="absolute top-4 left-2">Home</Button>
      </Link>
      <div className="auth-form-container">
      <div className="hidden sm:block">
          <LottieAnimationLoader animationData={loginanimation}/>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
