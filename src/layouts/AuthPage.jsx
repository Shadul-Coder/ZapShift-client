import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";

const AuthPage = () => {
  return (
    <>
      <header>Navbar</header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AuthPage;
