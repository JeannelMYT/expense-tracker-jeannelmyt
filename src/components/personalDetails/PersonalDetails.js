import { useState } from "react";
import FormWrapperCard from "../cards/FormCard";

const PersonalDetails = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [userInput, setUserInput] = useState({
    username: token.username,
    email: token.email,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  const usernameChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, username: event.target.value };
    });
  };
  const emailChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, email: event.target.value };
    });
  };
  const passwordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, password: event.target.value };
    });
  };
  const newPasswordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, newPassword: event.target.value };
    });
  };

  const confirmPasswordChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, confirmPassword: event.target.value };
    });
    if (
      userInput.newPassword !== "undefined" &&
      userInput.confirmPassword !== "undefined"
    ) {
      if (userInput.newPassword !== event.target.value) {
        setSuccessMessage("");
        setErrorMessage("Passwords don't match");
        event.target.setCustomValidity("Needs to match New Password"); 
      } else if (userInput.newPassword === event.target.value) {
        event.target.setCustomValidity("");
        setErrorMessage("");
      }
    }
  };

  const submitHandler = async (event) => {
    let updated = "";
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!userInput.newPassword) {
      updated = await updateUserDetails(token, {
        username: userInput.username,
        email: userInput.email,
        password: userInput.password,
      });
    } //else if (userInput.newPassword !== userInput.confirmPassword){
    //   setErrorMessage("New Password and Confirm Password do not match")
    // } 
    
    else {
      updated = await updateUserDetails(token, {
        username: userInput.username,
        email: userInput.email,
        password: userInput.password,
        newPassword: userInput.newPassword,
      });
    }
    if (updated.statusCode) {
      setErrorMessage(updated.message);
    } else if (!updated.statusCode) {
      setSuccessMessage("Details changed!");
      props.setToken({
        ...token,
        username: userInput.username,
        email: userInput.email,
      });
    }
    setUserInput({
      password: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <FormWrapperCard>
      <h1 className="title">Update Personal Details</h1>
      <form className="form" onSubmit={submitHandler}>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={userInput.username}
            maxlength="12"
            required
            onChange={usernameChangeHandler}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="email"
            value={userInput.email}
            required
            onChange={emailChangeHandler}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={userInput.password}
            required
            onChange={passwordChangeHandler}
          />
        </label>
        <label>
          <p>New Password</p>
          <input
            type="password"
            value={userInput.newPassword}
            minLength="8"
            onChange={newPasswordChangeHandler}
          />
        </label>
        <label>
          <p>Confirm New Password</p>
          <input
            type="password"
            value={userInput.confirmPassword}
            required={userInput.newPassword}
            onChange={confirmPasswordChangeHandler}
          />
        </label>
        <div className="submit-button">
          <button type="submit">Submit</button>
        </div>
      </form>
      <h4 className="error">{errorMessage}</h4>
      <h4 className="success">{successMessage}</h4>
    </FormWrapperCard>
  );
};

const updateUserDetails = async (token, credentials) => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/${token.userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export default PersonalDetails;
