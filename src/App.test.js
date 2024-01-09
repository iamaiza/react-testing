import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInput = screen.getByRole("textbox");
  const passwordInput = screen.getByPlaceholderText("Password");
  const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(confirmPasswordInput.value).toBe("");
});

test("input should be able to type email", () => {
  render(<App />);
  const emailInput = screen.getByRole("textbox");
  userEvent.type(emailInput, "janeDoe22@gmail.com");
  expect(emailInput.value).toBe("janeDoe22@gmail.com");
});

test("input should be able to type password", () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText("Password");
  userEvent.type(passwordInput, "janeDoe22@g");
  expect(passwordInput.value).toBe("janeDoe22@g");
});

test("input should be able to type confirm password", () => {
  render(<App />);
  const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i);
  userEvent.type(confirmPasswordInput, "janeDoe22@g");
  expect(confirmPasswordInput.value).toBe("janeDoe22@g");
});

test("should show email error message on invalid email", () => {
  render(<App />);
  const emailError = screen.queryByText(/the email you input is invalid/i);
  const emailInput = screen.getByRole("textbox");
  const submitBtn = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailError).not.toBeInTheDocument();

  userEvent.type(emailInput, "janeDoe22gmail.com");
  userEvent.click(submitBtn);
  const emailErrorAgain = screen.queryByText(/the email you input is invalid/i);
  if(emailErrorAgain !== null) expect(emailErrorAgain).toBeInTheDocument();
});

test("should show password error if password is less than 5 characters.", () => {
  render(<App />);
  const emailInput = screen.getByRole("textbox");
  const passwordInput = screen.getByPlaceholderText("Password")

  const passwordError = screen.queryByText(/the password you've entered should contain 5 or more character/i);

  const submitBtn = screen.getByRole("button", {
    name: /submit/i,
  });

  userEvent.type(emailInput, "janeDoe22@gmail.com")
  
  expect(passwordError).not.toBeInTheDocument()
  
  userEvent.type(passwordInput, "jane")

  userEvent.click(submitBtn)

  const passwordErrorAgain = screen.queryByText(/the password you've entered should contain 5 or more character/i)

  if(passwordErrorAgain!== null) expect(passwordErrorAgain).toBeInTheDocument()
})