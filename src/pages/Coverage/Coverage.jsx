import { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const Coverage = () => {
  const axios = useAxios();
  const { data, isLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: () => axios.get("/warehouses").then((res) => res.data),
  });
  const mapRef = useRef(null);
  if (isLoading) {
    return <Loading />;
  }
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.search.value.trim();
    if (!value) {
      return;
    }
    const district = data.find((city) =>
      city.district.toLowerCase().startsWith(value.toLowerCase())
    );
    if (district) {
      mapRef.current.flyTo([district.latitude, district.longitude], 13);
    }
  };
  return (
    <>
      <title>Coverage | ZapShift</title>
      <section className="bg-white my-3 sm:my-3.5 md:my-4 lg:my-4.5 p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15 max-w-7xl mx-auto w-[95%] lg:w-[97%] rounded-2xl">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          We are available in 64 districts
        </h1>
        <form
          onSubmit={handleSearch}
          className="bg-[#eff2f6] md:max-w-md mb-7 sm:mb-9 rounded-xl flex"
        >
          <button type="submit">
            <HiMiniMagnifyingGlass className="mx-3 text-xl" />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search District…"
            className="flex-1 py-3 pr-3 focus:outline-none"
          />
          <button
            type="submit"
            className="cursor-pointer bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-colors duration-300 px-5 text-secondary font-semibold rounded-xl"
          >
            Search
          </button>
        </form>
        <h2 className="text-xl md:text-start lg:text-3xl sm:text-2xl pt-5 pb-3 sm:pt-7 sm:pb-5 font-semibold text-center border-t border-gray-200">
          We deliver almost all over Bangladesh
        </h2>
        <div className="h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[700px] rounded-xl overflow-hidden">
          <MapContainer
            ref={mapRef}
            center={[23.8041, 90.4152]}
            zoom={9}
            scrollWheelZoom={false}
            className="h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((district) => (
              <Marker
                key={district._id}
                position={[district.latitude, district.longitude]}
              >
                <Popup>
                  <h3 className="font-semibold">{district.district}</h3>
                  <h5>Service Area : {district.covered_area.join(", ")}</h5>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </>
  );
};

export default Coverage;
