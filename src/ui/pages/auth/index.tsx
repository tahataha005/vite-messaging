import "./styles.css";
import logo from "../../../../public/logo.svg";
import AuthService from "../../common/AuthService";
import useAuthLogic from "./logic";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import useServicesAuth from "./servicesAuth";

const Auth = () => {
  const { googleLogin } = useServicesAuth();
  const { setAuthState, register, login, handleCredentialsChange } =
    useAuthLogic();

  return (
    <div className="center white-bg page auth-page">
      <div className="flex row white-bg auth-container">
        <div className="flex column center welcome-box">
          <img src={logo} alt="logo" />
          <h1 className="primary-text">Welcome HyChat</h1>
          <p className="grey-text">The best place to chat with your friends</p>

          <div className="divider"></div>

          <h3 className="grey-text">Sign in with</h3>

          <div className="flex row center full-width gap-30">
            <AuthService type="google" onClick={googleLogin} />
            <AuthService type="facebook" />
            <AuthService type="github" />
          </div>
        </div>
        <div className="flex column primary-bg signup-box auth-box">
          <RegisterForm
            handleCredentialsChange={handleCredentialsChange}
            register={register}
            setAuthState={setAuthState}
          />
          <LoginForm
            handleCredentialsChange={handleCredentialsChange}
            login={login}
            setAuthState={setAuthState}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
