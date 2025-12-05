import { useQuery } from "@tanstack/react-query";
import useSecure from "../../../hooks/useSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import {
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { PiPersonSimpleBikeBold } from "react-icons/pi";
import { MdOutlineDirectionsBike } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useNavigate } from "react-router";

const RiderDash = () => {
  const { user } = useAuth();
  const secure = useSecure();
  const navigate = useNavigate();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["rider-stats", user.email],
    queryFn: () =>
      secure.get(`/rider-stats/${user.email}`).then((res) => res.data),
  });
  if (isLoading) {
    return <Loading />;
  }
  const chartData = stats?.weeklyDeliveries?.map((item) => ({
    week: `Week ${item._id.week}`,
    deliveries: item.count,
    earnings: Math.round(
      item.earnings *
        (stats.riderInfo.district === item.currentParcel?.senderDistrict
          ? 0.8
          : 0.6)
    ),
  })) || [
    { week: "Week 1", deliveries: 0, earnings: 0 },
    { week: "Week 2", deliveries: 0, earnings: 0 },
    { week: "Week 3", deliveries: 0, earnings: 0 },
    { week: "Week 4", deliveries: 0, earnings: 0 },
  ];
  const statCards = [
    {
      title: "Total Deliveries",
      value: stats?.totalDeliveries || 0,
      icon: <HiOutlineCheckCircle className="text-3xl" />,
      color: "bg-[#ECFDF5] text-[#10B981]",
      borderColor: "border-[#10B981]",
      action: () => navigate("/dashboard/my-deliveries"),
    },
    {
      title: "Pending Deliveries",
      value: stats?.pendingDeliveries || 0,
      icon: <HiOutlineClock className="text-3xl" />,
      color: "bg-[#FEF6E6] text-[#F59E0B]",
      borderColor: "border-[#F59E0B]",
      action: () => navigate("/dashboard/assigned-deliveries"),
    },
    {
      title: "Total Earnings",
      value: `$${stats?.totalEarnings || 0}`,
      icon: <HiOutlineCurrencyDollar className="text-3xl" />,
      color: "bg-[#F3FADC] text-primary",
      borderColor: "border-primary",
      action: () => navigate("/dashboard/my-deliveries"),
    },
    {
      title: "Available Credit",
      value: `$${stats?.availableCredit || 0}`,
      icon: <PiPersonSimpleBikeBold className="text-3xl" />,
      color: "bg-[#E8F4FD] text-[#0C63E5]",
      borderColor: "border-[#0C63E5]",
      action: () => navigate("/dashboard/my-deliveries"),
    },
  ];
  const workStatusConfig = {
    available: { label: "Available", color: "bg-green-100 text-green-800" },
    assigned: {
      label: "On Assignment",
      color: "bg-yellow-100 text-yellow-800",
    },
    "in-transit": { label: "In Transit", color: "bg-blue-100 text-blue-800" },
    offline: { label: "Offline", color: "bg-gray-100 text-gray-800" },
  };
  const currentStatus =
    workStatusConfig[stats?.riderInfo?.workStatus] ||
    workStatusConfig["available"];
  return (
    <>
      <title>Rider Dashboard | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-7 sm:mb-9">
          <div>
            <h1 className="text-3xl lg:text-5xl sm:text-4xl font-bold text-secondary">
              Welcome, {stats?.riderInfo?.name || "Rider"}!
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <MdOutlineDirectionsBike className="text-xl" />
              {stats?.riderInfo?.bikeModel || "Your Bike"} •{" "}
              {stats?.riderInfo?.district || "Your District"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-medium ${currentStatus.color}`}
              >
                {currentStatus.label}
              </span>
              <div className="text-right">
                <p className="text-lg font-bold text-secondary">
                  {stats?.successRate || 0}%
                </p>
                <p className="text-sm text-gray-500">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
        {stats?.currentParcel && (
          <div className="mb-7 sm:mb-9 p-5 sm:p-6 rounded-2xl bg-linear-to-r from-primary/10 to-[#0C63E5]/10 border border-primary/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <HiOutlineSparkles className="text-xl text-primary" />
                  <h2 className="text-lg font-semibold text-secondary">
                    Current Assignment
                  </h2>
                </div>
                <p className="text-gray-600">
                  {stats.currentParcel.parcelName} • From{" "}
                  {stats.currentParcel.senderDistrict} to{" "}
                  {stats.currentParcel.receiverDistrict}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Status:{" "}
                  <span className="font-medium capitalize">
                    {stats.currentParcel.deliveryStatus}
                  </span>
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboard/my-deliveries")}
                className="mt-4 sm:mt-0 text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
              >
                View Details
              </button>
            </div>
          </div>
        )}
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
                Weekly Performance
              </h2>
              <HiOutlineClipboardDocumentList className="text-xl text-gray-400" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "deliveries")
                        return [`${value} deliveries`, "Deliveries"];
                      if (name === "earnings") return [`$${value}`, "Earnings"];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="deliveries"
                    name="Deliveries"
                    radius={[4, 4, 0, 0]}
                    fill="#A3E635"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.deliveries > 0 ? "#A3E635" : "#E5E7EB"}
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="earnings"
                    name="Earnings"
                    radius={[4, 4, 0, 0]}
                    fill="#0C63E5"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.earnings > 0 ? "#0C63E5" : "#E5E7EB"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg sm:text-xl font-semibold text-secondary">
                Recent Deliveries
              </h2>
              <HiOutlineTruck className="text-xl text-gray-400" />
            </div>
            <div className="space-y-4">
              {stats?.recentDeliveries?.length > 0 ? (
                stats.recentDeliveries.map((delivery) => (
                  <div
                    key={delivery._id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2.5 rounded-lg ${
                          delivery.withdraw
                            ? "bg-green-50 group-hover:bg-green-100"
                            : "bg-yellow-50 group-hover:bg-yellow-100"
                        } transition-colors duration-200`}
                      >
                        {delivery.withdraw ? (
                          <HiOutlineCheckCircle className="text-lg text-green-600" />
                        ) : (
                          <HiOutlineCurrencyDollar className="text-lg text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-secondary truncate max-w-[180px] sm:max-w-[200px]">
                          {delivery.trackingID}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(delivery.deliveredAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-lg text-xs font-medium ${
                          delivery.withdraw
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {delivery.withdraw ? "Paid" : "Pending Payment"}
                      </span>
                      <p className="text-sm font-semibold mt-1">
                        ${Math.round(delivery.amount * 0.6)}{" "}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <HiOutlineTruck className="text-gray-400 text-xl" />
                  </div>
                  <p className="text-gray-500">No deliveries completed yet</p>
                  <button
                    onClick={() => navigate("/dashboard/assigned-deliveries")}
                    className="mt-3 text-sm font-medium bg-primary hover:bg-[#c3e460] active:bg-[#bddc5c] transition-all duration-200 text-secondary px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Check Assignments
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
              onClick={() => navigate("/dashboard/assigned-deliveries")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#F3FADC]">
                <HiOutlineClipboardDocumentList className="text-xl text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">View Assignments</p>
                <p className="text-sm text-gray-500">Check new parcels</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/dashboard/my-deliveries")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#E8F4FD]">
                <HiOutlineTruck className="text-xl text-[#0C63E5]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">My Deliveries</p>
                <p className="text-sm text-gray-500">Track progress</p>
              </div>
            </button>
            <button
              onClick={() => navigate("/be-a-rider")}
              className="flex items-center justify-center space-x-3 p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-primary hover:bg-[#FDFEF9] transition-all duration-200"
            >
              <div className="p-2 rounded-lg bg-[#FEF6E6]">
                <PiPersonSimpleBikeBold className="text-xl text-[#F59E0B]" />
              </div>
              <div className="text-left">
                <p className="font-medium text-secondary">Profile Settings</p>
                <p className="text-sm text-gray-500">Update details</p>
              </div>
            </button>
          </div>
        </div>
        <div className="mt-7 sm:mt-9 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary">Delivery Success</h3>
              <HiOutlineCheckCircle className="text-xl text-green-500" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-secondary">
                  {stats?.successRate || 0}%
                </p>
                <p className="text-sm text-gray-500 mt-1">Completion rate</p>
              </div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${stats?.successRate || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary">Average Earnings</h3>
              <HiOutlineCurrencyDollar className="text-xl text-[#0C63E5]" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-secondary">
                  $
                  {stats?.totalDeliveries > 0
                    ? Math.round(
                        (stats.totalEarnings * 0.6) / stats.totalDeliveries
                      )
                    : 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">Per delivery</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary">Work Status</h3>
              <MdOutlineDirectionsBike
                className={`text-xl ${
                  stats?.riderInfo?.workStatus === "available"
                    ? "text-green-500"
                    : stats?.riderInfo?.workStatus === "assigned"
                    ? "text-yellow-500"
                    : stats?.riderInfo?.workStatus === "in-transit"
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-secondary capitalize">
                  {stats?.riderInfo?.workStatus || "available"}
                </p>
                <p className="text-sm text-gray-500 mt-1">Current status</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RiderDash;
