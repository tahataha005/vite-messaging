const RegisterForm = ({ setAuthState, handleCredentialsChange, register }) => {
  return (
    <>
      <h2
        className="white-text"
        onClick={() => {
          setAuthState("register");
        }}
      >
        Sign Up
      </h2>
      <input
        type="email"
        placeholder="name@example.com"
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
      <div className="flex row gap-15 full-width">
        <input
          type="text"
          placeholder="First Name"
          className="input"
          onChange={(e) => {
            handleCredentialsChange("firstName", e);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="input"
          onChange={(e) => {
            handleCredentialsChange("lastName", e);
          }}
        />
      </div>
      <input
        type="text"
        placeholder="+01 123 456 7890"
        className="input"
        onChange={(e) => {
          handleCredentialsChange("phone", e);
        }}
      />

      <button className="button white-bg full-width bold" onClick={register}>
        Register
      </button>
    </>
  );
};

export default RegisterForm;
