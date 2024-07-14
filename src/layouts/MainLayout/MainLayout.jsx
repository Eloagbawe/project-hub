import "./MainLayout.scss";
import NavBar from "../../components/NavBar/NavBar";
import { Divider } from "@chakra-ui/react";
import Footer from "../../components/Footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <main className="main-layout">
      <section className="main-layout__nav">
        <NavBar />
      </section>
      <Divider />
      <section className="main-layout__content px-6 md:px-12 my-4 md:my-8 xl:my-16">
        {children}
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default MainLayout;
