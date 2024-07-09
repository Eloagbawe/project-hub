import "./Signup.scss";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import visibilityIcon from "../../assets/icons/visibility.svg";
import visibilityOffIcon from "../../assets/icons/visibility_off.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
  };

  return (
    <MainLayout>
      <section className="signup my-4 md:my-8 xl:my-16 px-5 md:px-10">
        <h2 className="signup__heading">Create an account</h2>
        <form
          className="signup__form md:flex gap-5 justify-between"
          onSubmit={handleSignup}
        >
          <div className="w-full md:w-5/12">
            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="firstName" className="signup__label block mb-1">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                className="signup__input border rounded-lg py-2 px-3 w-full "
              />
            </div>

            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="lastName" className="signup__label block mb-1">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                className="signup__input border rounded-lg py-2 px-3 w-full"
              />
            </div>

            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="email" className="signup__label block mb-1">
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="signup__input border rounded-lg py-2 px-3 w-full"
              />
            </div>
          </div>
          <div className="w-full md:w-5/12">
            <div className="my-6 md:my-8 xl:my-10">
              <label htmlFor="password" className="signup__label block mb-1">
                Password:
              </label>
              <div className="relative signup__input-container border rounded-lg  w-full">
                <input
                  type={viewPassword ? "text" : "password"}
                  id="password"
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
            </div>

            <div className="my-6 md:my-8 xl:my-10">
              <label
                htmlFor="confirmPassword"
                className="signup__label block mb-1"
              >
                Confirm Password:
              </label>
              <div className="relative signup__input-container border rounded-lg  w-full">
                <input
                  type={viewConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
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
            </div>

            <button className="signup__btn rounded-full px-8 md:px-16 py-2 w-full my-2 md:mt-6 md:w-fit hover:opacity-90 transition duration-500">
              Sign Up
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
