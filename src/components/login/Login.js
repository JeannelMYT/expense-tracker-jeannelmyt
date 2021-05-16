import { useState } from "react";
import PropTypes from "prop-types";
import FormCard from "../cards/FormCard";
import "./Login.css";

export default function Login(props) {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    message: "",
  });

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
  const errorMessageChangeHandler = (message) => {
    setErrorMessage(() => {
      return { message };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = await loginUser({
      username: userInput.username,
      password: userInput.password,
    });
    if (token.statusCode === 401) {
      errorMessageChangeHandler("Invalid login details, please try again!");
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
          <input type="text" required onChange={usernameChangeHandler} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" required onChange={passwordChangeHandler} />
        </label>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
      <h4 className="error">{errorMessage.message}</h4>
    </FormCard>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

async function loginUser(credentials) {
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
