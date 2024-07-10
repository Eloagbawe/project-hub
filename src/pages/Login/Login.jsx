import "./Login.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import visibilityIcon from "../../assets/icons/visibility.svg";
import visibilityOffIcon from "../../assets/icons/visibility_off.svg";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { validateLoginInput } from "../../utils";
import projectHubApi from "../../utils/projectHubApi";
import { UserContext } from "../../contexts/userContext";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { AlertContext } from "../../contexts/alertContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const { displayAlert } = useContext(AlertContext);
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [input, setInput] = useState({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  });

  const { email, password } = input;

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validatedInput = validateLoginInput(input);

    setInput({
      email: validatedInput.email,
      password: validatedInput.password,
    });

    if (validatedInput.error) {
      return;
    }
    setLoginLoading(true);

    try {
      const { data } = await projectHubApi.login({
        email: email.value,
        password: password.value,
      });

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
      setUser(data.user);
      setLoginLoading(false);
      displayAlert({
        text: data.message,
      });
      navigate("/");
    } catch (err) {
      setLoginLoading(false);
      displayAlert({
        text: err.response?.data?.message,
        status: "error",
      });
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <MainLayout>
      <section className="login my-4 md:my-8 xl:my-16 px-5 md:px-10">
        <h2 className="login__heading">Login to your account</h2>
        <form className="login__form" onSubmit={handleLogin}>
          <div className="my-6 md:my-8 xl:my-10">
            <label htmlFor="email" className="login__label block mb-1">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email.value}
              onChange={handleInputChange}
              className={`login__input border ${
                email.error && "login__input--error"
              } rounded-lg py-2 px-3 w-full md:w-6/12 xl:w-5/12`}
            />
          </div>
          <div className="my-6 md:my-8 xl:my-10">
            <label htmlFor="password" className="login__label block mb-1">
              Password:
            </label>
            <div
              className={`relative login__input-container border ${
                password.error && "login__input-container--error"
              } rounded-lg  w-full md:w-6/12 xl:w-5/12`}
            >
              <input
                type={viewPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password.value}
                onChange={handleInputChange}
                className="login__input w-full py-2 px-3 rounded-lg"
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
          </div>

          <button className="login__btn rounded-full px-8 md:px-16 py-2 w-full my-2 md:w-fit hover:opacity-90 transition duration-500 flex gap-2 items-center">
            Log In
            {loginLoading && <Spinner size="xs" />}
          </button>
          <p className="login__text my-1">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="login__text--link hover:opacity-90 transition duration-300"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </MainLayout>
  );
};

export default Login;
