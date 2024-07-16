import "./MainLayout.scss";
import NavBar from "../../components/NavBar/NavBar";
import { Divider } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";

const MainLayout = ({ children, no_align }) => {
  return (
    <main className="main-layout">
      <section className="main-layout__nav">
        <NavBar />
      </section>
      <Divider className="nav__divider" />
      <section
        className={`main-layout__content ${
          no_align
            ? ""
            : "main-layout__content--x-align px-6 my-4 md:my-8 xl:my-16"
        }`}
      >
        {children}
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default MainLayout;
