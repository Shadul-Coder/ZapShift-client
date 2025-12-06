import img from "../../assets/Error Page.png";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Error = () => {
  return (
    <>
      <title>Error 404 | ZapShift</title>
      <header className="sticky top-3 sm:top-3.5 md:top-4 lg:top-4.5 z-70">
        <Navbar />
      </header>
      <main>
        <section className="bg-white my-3 sm:my-3.5 md:my-4 lg:my-4.5 p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
          <img src={img} alt="" className="max-h-[450px] mx-auto" />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Error;
