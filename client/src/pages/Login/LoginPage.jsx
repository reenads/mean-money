import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUserDetails } from "../../services/users";
import { login } from "../../services/authentication";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await login(email, password);
      localStorage.setItem("token", token);
      const userDetails = await getMyUserDetails(token);
      const userData = userDetails.userData;
      if (
        userData.currentSavings +
          userData.disposableIncome +
          userData.foodAndDrinkGoal +
          userData.socialAndEntertainmentGoal +
          userData.holidayAndTravelGoal +
          userData.healthAndBeautyGoal +
          userData.miscGoal ==
        0
      ) {
        navigate("/spending-goals");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      navigate("/login");
      alert("Incorrect email or password. Please try again.");
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
