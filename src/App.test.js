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
  const emailInput = screen.getByPlaceholderText(/email address/i);
  const passwordInput = screen.getByPlaceholderText("Password")
  const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i)
  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("")
  expect(confirmPasswordInput.value).toBe("")
});

test("input should be able to type email", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/email address/i);
  userEvent.type(emailInput, "janeDoe22@gmail.com")
  expect(emailInput.value).toBe("janeDoe22@gmail.com")
})

test("input should be able to type password", () => {
  render(<App />);
  const passwordInput = screen.getByPlaceholderText("Password")
  userEvent.type(passwordInput, "janeDoe22@g")
  expect(passwordInput.value).toBe("janeDoe22@g")
})

test("input should be able to type confirm password", () => {
  render(<App />);
  const confirmPasswordInput = screen.getByPlaceholderText(/confirm password/i)
  userEvent.type(confirmPasswordInput, "janeDoe22@g")
  expect(confirmPasswordInput.value).toBe("janeDoe22@g")
})

test("should show email error message on invalid email", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText(/email address/i);
  userEvent.type(emailInput, "janeDoe22gmail")

  const submitBtn = screen.getByRole("button", {
    name: /submit/i
  })
  userEvent.click(submitBtn)
  const emailError = screen.getByText(/the email you input is invalid/i)
  expect(emailError).toBeInTheDocument()
})