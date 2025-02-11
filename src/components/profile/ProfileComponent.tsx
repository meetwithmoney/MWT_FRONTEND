import { useContext, useState } from "react";
import profile from "../../assets/images/profile.png";
import PersonalDetails from "./personalDetails/PersonalDetails";
import { clearSession } from "../../config/localStorage";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../socket/socket";

interface ProfileRoute {
  id: number;
  title: string;
  component: JSX.Element | string;
}

const ProfileComponent = () => {

  const socketContext = useContext(SocketContext);

  const [activeTab, setActiveTab] = useState(1);
  const navigate = useNavigate();

  const profileRoutes: ProfileRoute[] = [
    {
      id: 1,
      title: "personal Information",
      component: <PersonalDetails />,
    },
    {
      id: 2,
      title: "Help Center",
      component: "",
    },
  ];

  const activeComponent = profileRoutes.find(
    (route) => route.id === activeTab
  )?.component;

  const handleLogout = () => {
    clearSession();
    socketContext.socket?.disconnect();
    navigate("/");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-7 w-full font-poppins h-full">
      <div className="flex flex-col justify-between w-full lg:w-1/2 gap-10 h-full relative">
        <div>
          <h1 className="text-gray-200 text-[28px] leading-10 font-extrabold max-w-[220px] md:max-w-full lg:max-w-[207px] text-left">
            User Profile management
          </h1>
          <div className="mt-8 lg:mt-16 border-none overflow-auto scroll-smooth lg:overflow-hidden lg:border-[0.5px] xl:border-[0.5px] 2xl:border-[0.5px] border-light-gray-400 bg-none lg:bg-white flex flex-row lg:flex-col gap-5 lg:gap-0 w-full">

            {profileRoutes.map((route) => (
              <button
                key={route.id}
                onClick={() => setActiveTab(route.id)}
                className={`text-left shadow-profileFormShadow border lg:border-b-[0.5px] border-light-gray-400 w-max    lg:w-full rounded-full lg:rounded-sm 
                   px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3 lg:py-6 font-normal text-base md:text-lg leading-5 md:leading-8 transition-all duration-300 ${activeTab === route.id
                    ? "border-2 lg:border-l-4 xl:border-l-4 2xl:border-l-4 border-black lg:border-l-black text-black font-semibold bg-white"
                    : "border-2 text-gray-500 lg:border-l-4  xl:border-l-4 2xl:border-l-4 lg:border-l-transparent"
                  }`}
              >
                {route.title}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex flex-row items-center gap-10 bottom-5 fixed cursor-pointer" onClick={handleLogout}>
          <p className="text-black text-[28px] font-normal leading-10 flex flex-row items-center ">
            logout
          </p>
          <span className="w-6 h-6">
            <i className="fa-solid fa-arrow-right-from-bracket w-5 h-5"></i>
          </span>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 border-0 md:border-[0.5px] border-light-gray-400 rounded-[10px] shadow-profileFormShadow py-5 px-0 md:px-6 xl:px-8  flex-col h-full min-h-[600px]">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl leading-6 text-black font-semibold">
            {profileRoutes.find((route) => route.id === activeTab)?.title}
          </h1>
          {/* {activeTab === 1 && (
            <img src={profile} alt="profile" height={60} width={60} />
          )} */}
        </div>
        <div
          className={`w-full ${activeComponent ? "mt-5" : "mt-0"
            } min-h-[450px] h-full flex justify-center items-center`}
        >
          {activeComponent ? (
            activeComponent
          ) : (
            <p className="w-full text-center h-full flex justify-center items-center text-2xl  font-semibold leading-8">
              No data found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
