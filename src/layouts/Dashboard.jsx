import { BsBoxes, BsBoxSeam } from "react-icons/bs";
import { Link, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import { SlSocialDropbox } from "react-icons/sl";
import { LuCodesandbox, LuHistory, LuLayoutDashboard } from "react-icons/lu";
import { PiPersonSimpleBikeBold } from "react-icons/pi";
import { TbUsersGroup } from "react-icons/tb";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import { RiEBikeLine } from "react-icons/ri";

const Dashboard = () => {
  const { dashRef } = useAuth();
  const { myRole, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading />;
  }
  return (
    <>
      <title>Dashboard | ZapShift</title>
      <section className="my-3 sm:my-3.5 md:my-4 lg:my-4.5 max-w-7xl mx-auto w-[95%] lg:w-[97%]">
        <div className="drawer lg:drawer-open">
          <input
            id="dashboad-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <div className="lg:ml-4.5 bg-white rounded-2xl h-full">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side h-full is-drawer-close:overflow-visible">
            <label
              htmlFor="dashboad-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
              ref={dashRef}
            ></label>
            <div className="bg-white lg:rounded-2xl min-h-full flex flex-col items-start is-drawer-close:w-15 is-drawer-open:w-55">
              <ul className="menu w-full grow">
                <li>
                  <Link
                    to={"/dashboard"}
                    className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Dashboard"
                  >
                    <LuLayoutDashboard className="my-1.5 is-drawer-close:text-[19px]" />
                    <span className="is-drawer-close:hidden">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/send-parcel"}
                    className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Send Parcel"
                  >
                    <SlSocialDropbox className="my-1.5 is-drawer-close:text-[19px]" />
                    <span className="is-drawer-close:hidden">Send Parcel</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/my-parcels"}
                    className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Parcels"
                  >
                    <BsBoxes className="my-1.5 is-drawer-close:text-[19px]" />
                    <span className="is-drawer-close:hidden">My Parcels</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/payment-history"}
                    className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                  >
                    <LuHistory className="my-1.5 is-drawer-close:text-[19px]" />
                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </Link>
                </li>
                {myRole === "rider" && (
                  <>
                    <li>
                      <Link
                        to={"/dashboard/assigned-deliveries"}
                        className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Assigned Parcels"
                      >
                        <LuCodesandbox className="my-1.5 is-drawer-close:text-[19px]" />
                        <span className="is-drawer-close:hidden">
                          Assigned Parcels
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/dashboard/my-deliveries"}
                        className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="My Deliveries"
                      >
                        <RiEBikeLine className="my-1.5 is-drawer-close:text-[19px]" />
                        <span className="is-drawer-close:hidden">
                          My Deliveries
                        </span>
                      </Link>
                    </li>
                  </>
                )}
                {myRole === "admin" && (
                  <>
                    <li>
                      <Link
                        to={"/dashboard/manage-parcels"}
                        className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Manage Parcels"
                      >
                        <BsBoxSeam className="my-1.5 is-drawer-close:text-[19px]" />
                        <span className="is-drawer-close:hidden">
                          Manage Parcels
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/dashboard/manage-riders"}
                        className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Manage Riders"
                      >
                        <PiPersonSimpleBikeBold className="my-1.5 is-drawer-close:text-[19px]" />
                        <span className="is-drawer-close:hidden">
                          Manage Riders
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/dashboard/manage-users"}
                        className="active:bg-[#F4FBE0] active:text-secondary rounded-xl is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Manage Users"
                      >
                        <TbUsersGroup className="my-1.5 is-drawer-close:text-[19px]" />
                        <span className="is-drawer-close:hidden">
                          Manage Users
                        </span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
