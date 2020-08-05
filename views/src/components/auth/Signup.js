import React from "react";

const Signup = () => {
  return (
    <div className="signup">
      <form>
        <h1>Registration Form</h1>
        <div className="form_group">
          <label htmlFor="email">E-mail: </label>
          <input
            className="form_input"
            type="text"
            name="email"
            placeholder="Email"
          />
        </div>
        <div className="form_group">
          <label htmlFor="password">Password:</label>
          <input
            className="form_input"
            type="text"
            name="password"
            placeholder="Password"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
