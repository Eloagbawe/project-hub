import "./Signup.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import visibilityIcon from "../../assets/icons/visibility.svg";
import visibilityOffIcon from "../../assets/icons/visibility_off.svg";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import projectHubApi from "../../utils/projectHubApi";
import { UserContext } from "../../contexts/userContext";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/alertContext";
import { validateSignupInput } from "../../utils";
import InputError from "../../components/InputError/InputError";

const Signup = () => {
  const { user, setUser } = useContext(UserContext);
  const { displayAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [signupLoading, setSignupLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const [input, setInput] = useState({
    first_name: {
      value: "",
      error: false,
    },
    last_name: {
      value: "",
      error: false,
    },
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
    confirm_password: {
      value: "",
      error: false,
    },
  });

  const { first_name, last_name, email, password, confirm_password } = input;

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const validatedInput = validateSignupInput(input);

    setInput({
      first_name: validatedInput.first_name,
      last_name: validatedInput.last_name,
      email: validatedInput.email,
      password: validatedInput.password,
      confirm_password: validatedInput.confirm_password,
    });

    if (validatedInput.error) {
      return;
    }

    setSignupLoading(true);

    try {
      const { data } = await projectHubApi.signup({
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      setUser(data.user);
      setSignupLoading(false);
      displayAlert({
        text: data.message,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setSignupLoading(false);
      displayAlert({
        text: err.response?.data?.message,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <MainLayout>
      <section className="signup">
        <h2 className="signup__heading">Create an account</h2>
        <form
          className="signup__form md:flex gap-5 justify-between"
          onSubmit={handleSignup}
        >
          <div className="w-full md:w-5/12">
            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="first_name" className="signup__label block mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={first_name.value}
                onChange={handleInputChange}
                className={`signup__input border rounded-lg py-2 px-3 w-full ${
                  first_name.error && "signup__input--error"
                }`}
              />
              {first_name.error && <InputError text={first_name?.message}/>}
            </div>

            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="last_name" className="signup__label block mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={last_name.value}
                onChange={handleInputChange}
                className={`signup__input border rounded-lg py-2 px-3 w-full ${
                  last_name.error && "signup__input--error"
                }`}
              />
              {last_name.error && <InputError text={last_name?.message}/>}
            </div>

            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="email" className="signup__label block mb-1">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email.value}
                onChange={handleInputChange}
                className={`signup__input border rounded-lg py-2 px-3 w-full ${
                  email.error && "signup__input--error"
                }`}
              />
              {email.error && <InputError text={email?.message}/>}
            </div>
          </div>
          <div className="w-full md:w-5/12">
            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="password" className="signup__label block mb-1">
                Password:
              </label>
              <div
                className={`relative signup__input-container border rounded-lg  w-full ${
                  password.error && "signup__input-container--error"
                }`}
              >
                <input
                  type={viewPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password.value}
                  onChange={handleInputChange}
                  className="signup__input w-full py-2 px-3 rounded-lg"
                />
                {viewPassword ? (
                  <button type="button" onClick={() => setViewPassword(false)}>
                    <img
                      src={visibilityOffIcon}
                      alt="hide password"
                      className="absolute right-3 top-2"
                    />
                  </button>
                ) : (
                  <button type="button" onClick={() => setViewPassword(true)}>
                    <img
                      src={visibilityIcon}
                      alt="view password"
                      className="absolute right-3 top-2"
                    />
                  </button>
                )}
              </div>
              {password.error && <InputError text={password?.message}/>}
            </div>

            <div className="my-6 md:my-8 xl:my-10">
              <label
                htmlFor="confirm_password"
                className="signup__label block mb-1"
              >
                Confirm Password:
              </label>
              <div
                className={`relative signup__input-container border rounded-lg  w-full ${
                  confirm_password.error && "signup__input-container--error"
                }`}
              >
                <input
                  type={viewConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  value={confirm_password.value}
                  onChange={handleInputChange}
                  className="signup__input w-full py-2 px-3 rounded-lg"
                />
                {viewConfirmPassword ? (
                  <button
                    type="button"
                    onClick={() => setViewConfirmPassword(false)}
                  >
                    <img
                      src={visibilityOffIcon}
                      alt="hide confirm password"
                      className="absolute right-3 top-2"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setViewConfirmPassword(true)}
                  >
                    <img
                      src={visibilityIcon}
                      alt="view confirm password"
                      className="absolute right-3 top-2"
                    />
                  </button>
                )}
              </div>
              {confirm_password.error && <InputError text={confirm_password?.message}/>}
            </div>

            <button className="signup__btn rounded-full px-8 md:px-16 py-2 w-full my-2 md:mt-14 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center justify-center">
              Sign Up
              {signupLoading && <Spinner size="xs" />}
            </button>
            <p className="signup__text my-1">
              Already have an account?{" "}
              <Link
                to="/login"
                className="signup__text--link hover:opacity-90 transition duration-300"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </section>
    </MainLayout>
  );
};

export default Signup;
