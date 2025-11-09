/* eslint-disable react/prop-types */
import { useEffect, useState, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BiChevronDown, BiTransferAlt } from "react-icons/bi";
import { MdDashboard, MdPrivacyTip } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiTerminalWindowLine } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { SlNotebook } from "react-icons/sl";
import { LuArrowRightLeft, LuFileQuestion } from "react-icons/lu";
import { LiaCarSolid } from "react-icons/lia";

const Sidebar = ({ onClose, closeDrawer }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState("");
  const close = onClose || closeDrawer || (() => {});

  const menuItems = useMemo(
    () => [
      {
        icon: <MdDashboard className="h-5 w-5" />,
        label: "Dashboard",
        Link: "/",
      },
      {
        icon: <FiUser className="h-5 w-5" />,
        label: "All Booking",
        Link: "/all-booking",
      },
      {
        icon: <GrMapLocation className="h-5 w-5" />,
        label: "Add Events",
        Link: "/all-events",
      },
      {
        icon: <SiHomeassistantcommunitystore className="h-5 w-5" />,
        label: "Add Package",
        Link: "/packages",
      },
      {
        icon: <SlNotebook className="h-5 w-5" />,
        label: "Add Blog",
        Link: "/blog",
      },
      {
        icon: <BiTransferAlt className="h-5 w-5" />,
        label: "Transfer Option",
        Link: "/transfer-option",
      },
      {
        icon: <LuFileQuestion className="h-5 w-5" />,
        label: "Add FAQ",
        Link: "/faq",
      },

      {
        icon: <AiOutlineSetting className="h-5 w-5" />,
        label: "Settings",
        isDropdown: true,
        subItems: [
          {
            icon: <FaEdit className="h-5 w-5" />,
            label: "About Us",
            Link: "/settings/about-us",
          },
          {
            icon: <MdPrivacyTip className="h-5 w-5" />,
            label: "Privacy Policy",
            Link: "/settings/privacy-policy",
          },
          {
            icon: <RiTerminalWindowLine className="h-5 w-5" />,
            label: "Terms & Condition",
            Link: "/settings/terms-condition",
          },
          {
            icon: <LuArrowRightLeft className="h-5 w-5" />,
            label: "Refund & Returns",
            Link: "/settings/refund",
          },
        ],
      },
    ],
    []
  );

  const isItemActive = (item, pathname) => {
    if (item.isDropdown) {
      return item.subItems?.some((si) => pathname.startsWith(si.Link));
    }
    if (item.Link === "/") {
      return pathname === "/";
    }
    return pathname === item.Link || pathname.startsWith(item.Link + "/");
  };

  useEffect(() => {
    const activeParent = menuItems.find(
      (mi) =>
        mi.isDropdown &&
        mi.subItems?.some((si) => location.pathname.startsWith(si.Link))
    );
    setOpenDropdown(activeParent?.label ?? "");
  }, [location.pathname, menuItems]);

  const toggleDropdown = (label) => {
    setOpenDropdown((cur) => (cur === label ? "" : label));
  };

  return (
    <div className="bg-white h-full md:ml-16">
      <div className="flex flex-col md:h-full">
        <div className="flex flex-col gap-2 md:my-5 mb-10">
          {menuItems.map((item) => {
            const active = isItemActive(item, location.pathname);

            return (
              <div key={item.label}>
                <div
                  className={`w-72 flex justify-between items-center px-5 py-2 rounded-s-2xl
                    ${
                      active
                        ? "bg-secondary text-primary font-semibold"
                        : "bg-white text-black font-semibold"
                    }`}
                >
                  {item.isDropdown ? (
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center gap-3 w-full text-left"
                    >
                      {item.icon}
                      <p>{item.label}</p>
                      <BiChevronDown
                        className={`ml-auto transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <NavLink
                      to={item.Link}
                      end={item.Link === "/"}
                      className="flex items-center gap-3 w-full"
                      onClick={close}
                    >
                      {item.icon}
                      <p>{item.label}</p>
                    </NavLink>
                  )}
                </div>

                {item.isDropdown && openDropdown === item.label && (
                  <div className="flex flex-col">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.label}
                        to={subItem.Link}
                        className={({ isActive }) =>
                          `py-2 px-5 ${
                            isActive
                              ? "text-white bg-primary font-bold"
                              : "text-primary bg-secondary"
                          }`
                        }
                        onClick={close}
                      >
                        <p className="flex items-center gap-2 ml-10">
                          {subItem.icon}
                          {subItem.label}
                        </p>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="my-40"></div>
          <NavLink
            className="text-black hover:text-black"
            to="/sign-in"
            onClick={close}
          >
            <div className="bg-primary w-72  py-3 flex justify-center items-center  text-white">
              <FiLogOut className="text-xl" />
              <p className="ml-2 cursor-pointer">Log out</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
