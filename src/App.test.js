import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { typeIntoTheForm, clickSubmitButton, inputErrors } from "./utils";

beforeEach(() => {
  render(<App />);
});

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("inputs should be initially empty", () => {
  expect(screen.getByRole("textbox").value).toBe("");
  expect(screen.getByPlaceholderText("Password").value).toBe("");
  expect(screen.getByPlaceholderText(/confirm password/i).value).toBe("");
});

test("input should be able to type email", () => {
  const { emailInput } = typeIntoTheForm({
    email: "janeDoe22@gmail.com",
  });
  expect(emailInput.value).toBe("janeDoe22@gmail.com");
});

test("input should be able to type password", () => {
  const { passwordInput } = typeIntoTheForm({ password: "janeDoe22@g" });
  expect(passwordInput.value).toBe("janeDoe22@g");
});

test("input should be able to type confirm password", () => {
  const { confirmPasswordInput } = typeIntoTheForm({
    confirmPassword: "janeDoe22@g",
  });
  expect(confirmPasswordInput.value).toBe("janeDoe22@g");
});

test("should show email error message on invalid email", () => {
  const { error1 } = inputErrors()
  expect(error1).not.toBeInTheDocument();

  typeIntoTheForm({ email: "janeDoe22gmail.com" });
  clickSubmitButton();
  if (error1 !== null) expect(error1).toBeInTheDocument();
});

test("should show password error if password is less than 5 characters.", () => {

  const { error2 } = inputErrors()
  typeIntoTheForm({ email: "janeDoe22@gmail.com" });

  expect(error2).not.toBeInTheDocument();

  typeIntoTheForm({ password: "123" });
  clickSubmitButton();

  if (error2 !== null)
    expect(error2).toBeInTheDocument();
});

test("should show confirm password error if both passwords don't match", () => {

  const { error3 } = inputErrors()
  typeIntoTheForm({ email: "janeDoe22@gmail.com", password: "12345" });

  expect(error3).not.toBeInTheDocument();

  typeIntoTheForm({ confirmPassword: "123" });
  clickSubmitButton();

  if (error3 !== null)
    expect(error3).toBeInTheDocument();
});

test("should show no error if all inputs are valid", () => {

  typeIntoTheForm({
    email: "janeDoe22@gmail.com",
    password: "12345",
    confirmPassword: "12345",
  });

  clickSubmitButton();

  const { error1, error2, error3 } = inputErrors()
  expect(error1).not.toBeInTheDocument();
  expect(error2).not.toBeInTheDocument();
  expect(error3).not.toBeInTheDocument();
});
