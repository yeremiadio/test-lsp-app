import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import Navbar from "../Navigations/Navbar";
import { motion } from "framer-motion";
import AdminSidebar from "../Sidebars/AdminSidebar";
import { getCookie } from "../../utils/customCookie";
import { useNavigate } from "react-router-dom";
interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const token = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <Fragment>
      <div className="flex min-h-screen" style={{ background: "#f7fafc" }}>
        <AdminSidebar open={open} setOpen={setOpen} />
        <div className="overflow-y-auto flex-1">
          <Navbar />
          <main className="wrapper">
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
              }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
      {/*
      <main className="pt-24 bg-gray-50">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
        >
          {children}
        </motion.div>
      </main> */}
    </Fragment>
  );
};

export default Layout;
