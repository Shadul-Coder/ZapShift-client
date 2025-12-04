import { HiMiniMagnifyingGlass } from "react-icons/hi2";

const TrackOrder = () => {
  return (
    <>
      <title>Track Order | ZapShift</title>
      <section className="bg-white my-3 sm:my-3.5 md:my-4 lg:my-4.5 p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Track Your Order
        </h1>
        <form className="bg-[#eff2f6] md:max-w-md mb-7 sm:mb-9 rounded-xl flex">
          <button type="submit">
            <HiMiniMagnifyingGlass className="mx-3 text-xl" />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search Tracking ID…"
            className="flex-1 py-3 pr-3 focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-colors duration-300 px-5 text-secondary font-semibold rounded-xl"
          >
            Search
          </button>
        </form>
      </section>
    </>
  );
};

export default TrackOrder;
