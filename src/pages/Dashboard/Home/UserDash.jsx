import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../hooks/useSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import {
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { BsBoxSeam } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router";
import { PiMapPinAreaBold } from "react-icons/pi";
import { LuClipboardList } from "react-icons/lu";

const UserDash = () => {
  const { user } = useAuth();
  const secure = useSecure();
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["user-stats", user.email],
    queryFn: () =>
      secure.get(`/user-stats/${user.email}`).then((res) => res.data),
  });
  if (isLoading) {
    return <Loading />;
  }
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const chartData =
    stats?.monthlyParcels?.map((item) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      parcels: item.count,
    })) || [];
  const statCards = [
    {
      title: "Total Parcels",
      value: stats?.totalParcels || 0,
      icon: <BsBoxSeam className="text-3xl" />,
      color: "bg-[#E8F4FD] text-[#0C63E5]",
      borderColor: "border-[#0C63E5]",
      action: () => navigate("/dashboard/my-parcels"),
    },
    {
      title: "Pending Delivery",
      value: stats?.pendingParcels || 0,
      icon: <HiOutlineClock className="text-3xl" />,
      color: "bg-[#FEF6E6] text-[#F59E0B]",
      borderColor: "border-[#F59E0B]",
      action: () => navigate("/dashboard/my-parcels"),
    },
    {
      title: "Delivered",
      value: stats?.deliveredParcels || 0,
      icon: <HiOutlineCheckCircle className="text-3xl" />,
      color: "bg-[#ECFDF5] text-[#10B981]",
      borderColor: "border-[#10B981]",
      action: () => navigate("/dashboard/my-parcels"),
    },
    {
      title: "Total Spent",
      value: `$${stats?.totalSpent || 0}`,
      icon: <HiOutlineCurrencyDollar className="text-3xl" />,
      color: "bg-[#F3FADC] text-primary",
      borderColor: "border-primary",
      action: () => navigate("/dashboard/payment-history"),
    },
  ];
  return (
    <>
      <title>Dashboard | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          Welcome back, {user?.displayName?.split(" ")[0] || "User"}!
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 mb-7 sm:mb-9">
          {statCards.map((stat, index) => (
            <div
              key={index}
              onClick={stat.action}
              className={`${stat.color} border-l-4 ${stat.borderColor} p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white/70">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary">
                Parcel Activity (Last 6 Months)
              </h2>
              <HiOutlineClipboardDocumentList className="text-xl text-gray-400" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    formatter={(value) => [`${value} parcels`, "Count"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="parcels"
                    stroke="#A3E635"
                    fill="#A3E635"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary">
                Recent Parcels
              </h2>
              <HiOutlineTruck className="text-xl text-gray-400" />
            </div>
            <div className="space-y-4">
              {stats?.recentParcels?.length > 0 ? (
                stats.recentParcels.map((parcel) => (
                  <div
                    key={parcel._id}
                    onClick={() =>
                      navigate(`/dashboard/my-parcels/${parcel._id}`)
                    }
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 rounded-lg bg-gray-50 group-hover:bg-[#F3FADC] transition-colors duration-200">
                        <MdOutlineLocalShipping className="text-lg text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary truncate max-w-[180px] sm:max-w-[200px]">
                          {parcel.parcelName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(parcel.placedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${
                          parcel.deliveryStatus === "delivered"
                            ? "bg-green-100 text-green-800"
                            : parcel.deliveryStatus === "picked-up"
                            ? "bg-blue-100 text-blue-800"
                            : parcel.deliveryStatus === "assigned"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {parcel.deliveryStatus.charAt(0).toUpperCase() +
                          parcel.deliveryStatus.slice(1)}
                      </span>
                      <p className="text-sm font-semibold mt-1">
                        ${parcel.deliveryCharge}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <BsBoxSeam className="text-gray-400 text-xl" />
                  </div>
                  <p className="text-gray-500">No parcels yet</p>
                  <button
                    onClick={() => navigate("/dashboard/send-parcel")}
                    className="mt-3 text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Send Your First Parcel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-7 sm:mt-9 bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary mb-5">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/dashboard/send-parcel")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#F3FADC]">
                <HiOutlineTruck className="text-xl text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Send New Parcel</p>
                <p className="text-sm text-gray-500">Schedule a delivery</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/track-order")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#E8F4FD]">
                <LuClipboardList className="text-xl text-[#0C63E5]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Track Order</p>
                <p className="text-sm text-gray-500">Check parcel status</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/coverage")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#FEF6E6]">
                <PiMapPinAreaBold className="text-xl text-[#F59E0B]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Check Coverage</p>
                <p className="text-sm text-gray-500">Service areas</p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserDash;
