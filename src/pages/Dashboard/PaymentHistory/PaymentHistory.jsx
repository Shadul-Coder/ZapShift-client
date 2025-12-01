import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading/Loading";
import useSecure from "../../../hooks/useSecure";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

const PaymentHistory = () => {
  const { user } = useAuth();
  const secure = useSecure();
  const { data = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: () =>
      secure.get(`/payments/${user.email}`).then((res) => res.data),
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <title>Payment History | ZapShift</title>
      <section className="p-6 sm:p-9 md:p-11 lg:p-13 xl:p-15">
        <h1 className="text-3xl md:text-start my-7 lg:text-5xl sm:my-9 md:mt-0 lg:mb-11 font-bold text-center sm:text-4xl">
          My Payment History
        </h1>
        {data.length === 0 ? (
          <div className="text-center py-12 md:py-16 rounded-2xl border border-gray-200">
            <div className="w-15 h-15 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HiOutlineClipboardDocumentList className="text-gray-400 text-2xl md:text-3xl" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              No Payment History
            </h3>
            <p className="text-gray-700 max-w-sm mx-auto text-sm md:text-base">
              Complete your first shipment to see payments
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold text-secondary">
                Payments
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-3xl sm:min-w-full">
                <thead>
                  <tr className="bg-[#F3FADC]">
                    <th className="py-3 px-3 sm:py-4 sm:px-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      No.
                    </th>
                    <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th className="py-3 px-3 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-2 sm:py-4 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Paid On
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`hover:bg-[#FDFEF9] transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-3 sm:py-4 sm:px-4">{index + 1}</td>
                      <td className="py-3 px-3 sm:py-4">{item.parcelName}</td>
                      <td className="py-3 px-3 sm:py-4 font-medium truncate">
                        {item.trackingID}
                      </td>
                      <td className="py-3 px-3 sm:py-4 font-medium">
                        {item.transactionID}
                      </td>
                      <td className="py-3 px-3 sm:py-4">${item.amount}</td>
                      <td className="py-3 px-3 font-medium sm:py-4 text-[#0ab010]">
                        {item.paymentStatus}
                      </td>
                      <td className="py-3 px-3 sm:py-4">
                        {new Date(item.paidAt)
                          .toLocaleString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          .replace(",", "")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PaymentHistory;
