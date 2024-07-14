import MainLayout from "../../layouts/MainLayout/MainLayout";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <MainLayout>
      <section className="not-found">
        <div>
          <p className="not-found__text my-2">
            The page you&apos;re looking for does not exist.
          </p>
          <Link to="/" className="not-found__link">
            Back to home
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default NotFound;
