import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../components/common/logo/Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { clearSession } from "../config/localStorage";
import { SocketContext } from "../socket/socket";
import { useAppSelector } from "../app/hooks";
const PublicHeader = () => {

  const { responseData } = useAppSelector(state => state.fetchUserProfileDataReducer);

  const [menuOpen, setMenuOpen] = useState(false);
  const socketContext = useContext(SocketContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    clearSession();
    socketContext.socket?.disconnect();
    navigate("/");
  };
  return (
    <nav className={`w-full   ${menuOpen ? "bg-light-gray-200 delay-150" : "bg-light-gray-200"} z-50 py-3 lg:py-2 sticky top-0  shadow-md lg:shadow-none lg:relative transition-all duration-300`}>
      <div className="px-5 md:px-0 chatwithmeet__container flex flex-row justify-between items-center ">
        <div className="flex lg:hidden">
          <GiHamburgerMenu
            className="w-6  h-6  text-black"
            onClick={() => setMenuOpen(true)}
          />
        </div>
        <div className="flex flex-row items-center gap-6">
          {/* {!menuOpen &&  */}
          <div>
            <Logo
              width={71}
              height={71}
              className="w-[50px] h-[50px] lg:w-[71px] lg:h-[71px]"
            />
          </div>

          <ul className="hidden lg:flex flex-row  gap-[30px] items-center no-underline ">
            <li>
              <NavLink
                to={"/chat"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold "
                    : "text-gray-200 text-base font-medium leading-6 pb-0.5 transition-all delay-200 duration-200"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/career"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                    : "text-gray-200 text-base font-medium leading-6 pb-0.5"
                }
              >
                Career
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/people"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                    : "text-gray-200 text-base font-medium leading-6 pb-0.5"
                }
              >
                People
              </NavLink>
            </li>
          </ul>
        </div>
        <div className=" hidden lg:flex  flex-row items-center gap-6">
          <ul className="flex flex-row  gap-[30px] items-center no-underline ">
            <li>
              <NavLink
                to={"/about-us"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                    : "text-gray-200 text-base font-medium leading-6 pb-0.5"
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/contact-us"}
                className={({ isActive }) =>
                  isActive
                    ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                    : "text-gray-200 text-base font-medium leading-6 pb-0.5"
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className=" flex  flex-row items-center gap-6">
          <ul className="flex flex-row  gap-[30px] items-center no-underline ">
            {/* <li className="cursor-pointer hidden lg:block">
              <i className="fa-solid fa-bell text-gray-200 w-5 h-4"></i>
            </li> */}
            <li className="flex flex-row items-center cursor-pointer">
              <NavLink to={"/profile"} className='flex flex-row items-center gap-2'>
                <img className="bg-slate-200 rounded-full" src={responseData?.profile_picture} alt="profile" width={45} height={45} />
                <h6 className="font-poppins leading-6 font-medium text-black-100">
                  {responseData?.first_name} {responseData?.last_name}
                </h6>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className={`absolute top-[0px] shadow-md z-10 bg-white w-full sm:w-[250px] transition-all duration-700 ease-in-out ${menuOpen
        ? "left-0 opacity-100 transform translate-x-0 delay-150 min-h-screen max-h-screen"
        : "left-[-100%] opacity-0 transform translate-x-[-100%] delay-150 min-h-screen max-h-screen"
        }`}>
        <div className="px-6 lg:px-12 w-full py-5 flex flex-row items-start justify-between">
          <div>
            <Logo
              width={71}
              height={71}
              className="w-[60px] h-[60px] lg:w-[71px] lg:h-[71px]"
            />
          </div>
          <IoClose className="w-6 h-6 text-black mt-2.5 cursor-pointer"
            onClick={() => setMenuOpen(false)} />
        </div>
        <ul className="flex flex-col h-full   gap-2.5 lg:gap-[30px] items-start no-underline px-6 lg:px-12 pb-8 z-10 bg-white ">
          <li>
            <NavLink
              to={"/chat"}
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold "
                  : "text-gray-200 text-base font-medium leading-6 pb-0.5 transition-all delay-200 duration-200"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/career"}
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                  : "text-gray-200 text-base font-medium leading-6 pb-0.5"
              }
            >
              Career
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/people"}
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                  : "text-gray-200 text-base font-medium leading-6 pb-0.5"
              }
            >
              People
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about-us"}
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                  : "text-gray-200 text-base font-medium leading-6 pb-0.5"
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact-us"}
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b-[3px]  border-black pb-0.5 font-semibold"
                  : "text-gray-200 text-base font-medium leading-6 pb-0.5"
              }
            >
              Contact Us
            </NavLink>
          </li>
          <li >
            <span
              className="text-gray-200 text-base font-medium leading-6 pb-0.5"
              onClick={handleLogout}

            >
              Log Out
            </span>
          </li>
        </ul>
      </div>

    </nav>
  );
};

export default PublicHeader;
