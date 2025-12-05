import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../hooks/useSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import {
  HiOutlineUsers,
  HiOutlineTruck,
  HiOutlineCurrencyDollar,
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiOutlineShieldCheck,
} from "react-icons/hi2";
import { PiPersonSimpleBikeBold } from "react-icons/pi";
import { MdOutlineLocalShipping, MdOutlineTrendingUp } from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router";

const AdminDash = () => {
  const { user } = useAuth();
  const secure = useSecure();
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => secure.get("/admin-stats").then((res) => res.data),
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
  const revenueChartData =
    stats?.monthlyRevenue?.map((item) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year
        .toString()
        .slice(-2)}`,
      revenue: Math.round(item.revenue),
      parcels: item.count,
    })) || [];
  const statusColors = {
    pending: "#F59E0B",
    assigned: "#3B82F6",
    "picked-up": "#8B5CF6",
    delivered: "#10B981",
    cancelled: "#EF4444",
  };
  const parcelStatusData =
    stats?.parcelStatus?.map((item) => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.count,
      color: statusColors[item._id] || "#6B7280",
    })) || [];
  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: <HiOutlineUsers className="text-3xl" />,
      color: "bg-[#E8F4FD] text-[#0C63E5]",
      borderColor: "border-[#0C63E5]",
      action: () => navigate("/dashboard/manage-users"),
    },
    {
      title: "Active Riders",
      value: stats?.activeRiders || 0,
      icon: <PiPersonSimpleBikeBold className="text-3xl" />,
      color: "bg-[#F3FADC] text-primary",
      borderColor: "border-primary",
      action: () => navigate("/dashboard/manage-riders"),
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      icon: <HiOutlineCurrencyDollar className="text-3xl" />,
      color: "bg-[#ECFDF5] text-[#10B981]",
      borderColor: "border-[#10B981]",
      action: () => navigate("/dashboard/manage-parcels"),
    },
    {
      title: "Pending Actions",
      value: `${(stats?.pendingRiders || 0) + (stats?.pendingParcels || 0)}`,
      icon: <HiOutlineClipboardDocumentList className="text-3xl" />,
      color: "bg-[#FEF6E6] text-[#F59E0B]",
      borderColor: "border-[#F59E0B]",
      action: () => navigate("/dashboard/manage-parcels"),
    },
  ];
  const todayStats = [
    {
      title: "Today's Revenue",
      value: `$${stats?.todaysRevenue || 0}`,
      change: "+11%",
      icon: <MdOutlineTrendingUp className="text-xl" />,
      color: "text-[#10B981]",
      bgColor: "bg-[#ECFDF5]",
    },
    {
      title: "Today's Parcels",
      value: stats?.todaysParcels || 0,
      change: "+9%",
      icon: <HiOutlineTruck className="text-xl" />,
      color: "text-[#0C63E5]",
      bgColor: "bg-[#E8F4FD]",
    },
    {
      title: "Pending Reviews",
      value: stats?.pendingRiders || 0,
      change: "-3%",
      icon: <HiOutlineClock className="text-xl" />,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#FEF6E6]",
    },
  ];
  const statusLabels = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    assigned: { label: "Assigned", color: "bg-blue-100 text-blue-800" },
    "picked-up": {
      label: "In Transit",
      color: "bg-purple-100 text-purple-800",
    },
    delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
  };
  return (
    <>
      <title>Admin Dashboard | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-7 sm:mb-9">
          <div>
            <h1 className="text-3xl lg:text-5xl sm:text-4xl font-bold text-secondary">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <HiOutlineShieldCheck className="text-xl" />
              Welcome back, {user?.displayName?.split(" ")[0] || "Admin"}!
              System overview and analytics
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-bold text-secondary">
                  {stats?.deliveredParcels || 0}/{stats?.totalParcels || 0}
                </p>
                <p className="text-sm text-gray-500">Delivered/Total Parcels</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-7 sm:mb-9">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary mb-4">
            Today's Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {todayStats.map((stat, index) => (
              <div
                key={index}
                className={`${stat.bgColor} p-4 rounded-2xl border border-gray-200`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-secondary mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <span className={`text-xs font-medium ${stat.color}`}>
                    {stat.change} from yesterday
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7 mb-7 sm:mb-9">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary">
                Revenue Trends
              </h2>
              <HiOutlineChartBar className="text-xl text-gray-400" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueChartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis
                    stroke="#666"
                    fontSize={12}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "revenue") return [`$${value}`, "Revenue"];
                      if (name === "parcels")
                        return [`${value} parcels`, "Parcels"];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#A3E635"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="parcels"
                    stroke="#0C63E5"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary">
                Parcel Status Distribution
              </h2>
              <HiOutlineTruck className="text-xl text-gray-400" />
            </div>
            <div className="h-72">
              {parcelStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={parcelStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {parcelStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value} parcels`, "Count"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">No parcel data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary">
                Recent Parcels
              </h2>
              <MdOutlineLocalShipping className="text-xl text-gray-400" />
            </div>
            <div className="space-y-4">
              {stats?.recentParcels?.length > 0 ? (
                stats.recentParcels.map((parcel) => (
                  <div
                    key={parcel._id}
                    onClick={() => navigate(`/dashboard/manage-parcels`)}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 rounded-lg bg-gray-50 group-hover:bg-[#F3FADC] transition-colors duration-200">
                        <HiOutlineTruck className="text-lg text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary truncate max-w-[180px] sm:max-w-[200px]">
                          {parcel.parcelName}
                        </h3>
                        <p className="text-sm text-gray-500">{parcel.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${
                          statusLabels[parcel.deliveryStatus]?.color ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {statusLabels[parcel.deliveryStatus]?.label ||
                          parcel.deliveryStatus}
                      </span>
                      <p className="text-sm font-semibold mt-1">
                        {new Date(parcel.placedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <HiOutlineTruck className="text-gray-400 text-xl" />
                  </div>
                  <p className="text-gray-500">No recent parcels</p>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary">
                Recent Payments
              </h2>
              <HiOutlineCurrencyDollar className="text-xl text-gray-400" />
            </div>
            <div className="space-y-4">
              {stats?.recentPayments?.length > 0 ? (
                stats.recentPayments.map((payment) => (
                  <div
                    key={payment._id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 rounded-lg bg-green-50">
                        <HiOutlineCheckCircle className="text-lg text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary truncate max-w-[180px] sm:max-w-[200px]">
                          {payment.trackingID}
                        </h3>
                        <p className="text-sm text-gray-500">{payment.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                      <p className="text-sm font-semibold mt-1">
                        ${payment.amount}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <HiOutlineCurrencyDollar className="text-gray-400 text-xl" />
                  </div>
                  <p className="text-gray-500">No recent payments</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-7 sm:mt-9 bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary mb-5">
            System Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-secondary">
                  Delivery Success Rate
                </h3>
                <HiOutlineCheckCircle className="text-green-500" />
              </div>
              <p className="text-2xl font-bold text-secondary">
                {stats?.totalParcels > 0
                  ? `${Math.round(
                      (stats.deliveredParcels / stats.totalParcels) * 100
                    )}%`
                  : "0%"}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width:
                      stats?.totalParcels > 0
                        ? `${
                            (stats.deliveredParcels / stats.totalParcels) * 100
                          }%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-secondary">
                  Average Order Value
                </h3>
                <HiOutlineCurrencyDollar className="text-[#0C63E5]" />
              </div>
              <p className="text-2xl font-bold text-secondary">
                $
                {stats?.totalPayments > 0
                  ? Math.round(stats.totalRevenue / stats.totalPayments)
                  : 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Per transaction</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-secondary">
                  Rider Utilization
                </h3>
                <PiPersonSimpleBikeBold className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-secondary">
                {stats?.totalRiders > 0
                  ? `${Math.round(
                      (stats.activeRiders / stats.totalRiders) * 100
                    )}%`
                  : "0%"}
              </p>
              <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width:
                      stats?.totalRiders > 0
                        ? `${(stats.activeRiders / stats.totalRiders) * 100}%`
                        : "0%",
                  }}
                ></div>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-secondary">Pending Reviews</h3>
                <HiOutlineClock className="text-[#F59E0B]" />
              </div>
              <p className="text-2xl font-bold text-secondary">
                {stats?.pendingRiders || 0}
              </p>
              <p className="text-sm text-gray-500 mt-1">Rider applications</p>
            </div>
          </div>
        </div>
        <div className="mt-7 sm:mt-9 bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-semibold text-secondary mb-5">
            Admin Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/dashboard/manage-parcels")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#F3FADC]">
                <HiOutlineClipboardDocumentList className="text-xl text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Manage Parcels</p>
                <p className="text-sm text-gray-500">Assign riders</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/dashboard/manage-riders")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#E8F4FD]">
                <HiOutlineUserGroup className="text-xl text-[#0C63E5]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Manage Riders</p>
                <p className="text-sm text-gray-500">Review applications</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/dashboard/manage-users")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#ECFDF5]">
                <HiOutlineUsers className="text-xl text-[#10B981]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Manage Users</p>
                <p className="text-sm text-gray-500">User permissions</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/dashboard/manage-riders")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#FEF6E6]">
                <PiPersonSimpleBikeBold className="text-xl text-[#F59E0B]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Review Requests</p>
                <p className="text-sm text-gray-500">
                  {stats?.pendingRiders || 0} pending
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDash;
