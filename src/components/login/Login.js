import { useState } from "react";
import PropTypes from "prop-types";
import FormCard from "../cards/FormCard";
import "./Login.css";

const Login = (props) => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const usernameChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };
  const passwordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      username: userInput.username,
      password: userInput.password,
    });
    if (token.statusCode === 401) {
      setErrorMessage("Invalid login details, please try again!");
    } else if (!token.statusCode) {
      props.setToken(token);
    }
  };

  return (
    <FormCard>
      <h1 className="title">Please Log In </h1>
      <form className="form login" onSubmit={submitHandler}>
        <label>
          <p>Username</p>
          <input
            type="text"
            maxlength="12"
            required
            onChange={usernameChangeHandler}
          />
        </label>
        <label>
          <p>Password</p>
          <input type="password" required onChange={passwordChangeHandler} />
        </label>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
      <h4 className="error">{errorMessage}</h4>
    </FormCard>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const loginUser = async (credentials) => {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export default Login;
