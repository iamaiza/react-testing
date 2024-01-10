import "./App.css";
import { useState } from "react";
import validator from "validator";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      return setErrorMessage("The email you input is invalid");
    }
    else if(password.length < 5 && validator.isEmail(email)) {
      return setErrorMessage("The password you've entered should contain 5 or more character")
    }
    else if(confirmPassword !== password && confirmPassword.length !== password.length) {
      return setErrorMessage("The passwords you've entered don't match. Try again")
    } else {
      return setErrorMessage("");
    }
  };

  return (
    <div className="App">
      <div className="form_container">
        <form>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
