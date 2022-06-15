import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Student } from "../../model/Student";
import { User } from "../../model/User";
import { deleteCookie } from "../../utils/customCookie";
import classNames from "../../utils/tailwindClassNames";

const UserDropdown: FC<Partial<Student>> = (props) => {
  const { name } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <Menu as="div" className="relative flex items-center">
      {({ open }) => (
        <>
          <Menu.Button>
            <img
              className={classNames(
                "w-8 h-8 object-cover inline focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-blue-500 rounded-full ring-opacity-60"
              )}
              src={"logo192.png"}
              alt=""
            />
            <p
              className={
                "hidden md:inline mx-2 font-medium text-sm tracking-wide"
              }
            >
              {name || ""}
            </p>

            <ChevronDownIcon
              className={classNames(
                `hidden md:inline h-4 w-4 mb-0.5 transition-all delay-75 text-secondary`,
                open && "rotate-180"
              )}
            />
          </Menu.Button>
          <Transition
            enter="transition transform duration-100 ease-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            leave="transition transform duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-90"
          >
            <Menu.Items className="origin-top-right mt-6 focus:outline-none absolute right-2 bg-white overflow-hidden rounded-md shadow-lg border w-48">
              {/* <Menu.Item>
                <span
                  className={
                    pathname.indexOf("profile") !== -1
                      ? "block px-4 py-2 text-sm text-gray-700 cursor-pointer bg-gray-100"
                      : "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  }
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </span>
              </Menu.Item> */}
              <Menu.Item>
                <span
                  className={
                    "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  }
                  onClick={() => {
                    navigate("/login");
                    deleteCookie("token");
                  }}
                >
                  Logout
                </span>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default UserDropdown;
