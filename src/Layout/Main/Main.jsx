/* eslint-disable no-unused-vars */
import { Outlet, Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { ConfigProvider, Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import brandlogo from "../../assets/image/Logo.png";
import user from "../../assets/image/user.png";

const MainLayout = () => {
  const [drawer, setDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const toggleDrawer = () => setDrawer((d) => !d);
  const closeDrawer = () => setDrawer(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) closeDrawer();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="h-20 bg-primary flex justify-between items-center px-2 md:px-20 gap-2 sticky top-0 z-50">
        {isMobile && (
          <GiHamburgerMenu
            onClick={toggleDrawer}
            className="h-8 w-8 cursor-pointer text-white"
          />
        )}

        <div>
          <Link to="/">
            <img
              src={brandlogo}
              alt="brand logo"
              className="md:h-full md:w-full object-cover"
            />
          </Link>
        </div>

        <div className="flex items-center gap-2 text-white mx-2 md:mx-10">
          <Link to="/admin-profile">
            <div className="flex items-center gap-2">
              <img
                src={user}
                alt="User"
                className="w-10 h-10 rounded-full border border-primary"
              />
              <p className="md:text-xl font-semibold">Rabeya Akter</p>
            </div>
          </Link>
        </div>
      </header>

      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              footerPaddingInline: 0,
              footerPaddingBlock: 0,
              padding: 0,
              paddingLG: 0,
              paddingXS: 30,
            },
          },
        }}
      >
        <div className="flex flex-1 min-h-0 w-full">
          {isMobile ? (
            <Drawer
              title="Menu"
              placement="left"
              closable
              onClose={closeDrawer}
              open={drawer}
              width="80%"
              closeIcon={<FaX className="text-black" />}
            >
              <Sidebar onClose={closeDrawer} />
            </Drawer>
          ) : (
            <aside className="w-[30%] lg:w-[18.5%] shrink-0 border-r border-gray-200">
              <div className="sticky top-20 h-[calc(100vh-5rem)]">
                <Sidebar />
              </div>
            </aside>
          )}

          <main
            className={`flex-1 bg-[#eeeeee] ${
              isMobile ? "p-4" : "p-10"
            } overflow-y-auto h-[calc(100vh-5rem)] overscroll-contain`}
          >
            <Outlet />
          </main>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
