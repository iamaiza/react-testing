import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const typeIntoTheForm = ({ email, password, confirmPassword }) => {
  const emailInput = screen.getByRole("textbox");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
  if (email) {
    userEvent.type(emailInput, email);
  }
  if (password) {
    userEvent.type(passwordInput, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInput, confirmPassword);
  }

  return { emailInput, passwordInput, confirmPasswordInput };
};

const clickSubmitButton = () => {
  const submitBtn = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.click(submitBtn);
};

const inputErrors = () => {
  const error1 = screen.queryByText(/the email you input is invalid/i);
  const error2 = screen.queryByText(
    /the password you've entered should contain 5 or more character/i
  );
  const error3 = screen.queryByText(
    /the passwords you've entered don't match. Try again/i
  );
  return { error1, error2, error3 };
};

export { typeIntoTheForm, clickSubmitButton, inputErrors };
