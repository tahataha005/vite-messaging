const LoginForm = ({ setAuthState, handleCredentialsChange, login }) => {
  return (
    <div className="flex column full-width white-bg login-box">
      <div className="flex column login-content">
        <h2
          className="white"
          onClick={() => {
            setAuthState("login");
          }}
        >
          Login
        </h2>
        <input
          type="text"
          placeholder="Email"
          className="input"
          onChange={(e) => {
            handleCredentialsChange("email", e);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => {
            handleCredentialsChange("password", e);
          }}
        />
        <p className="primary-text">Forgot Password?</p>
        <button
          className="primary-bg full-width white-text bold"
          onClick={login}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
