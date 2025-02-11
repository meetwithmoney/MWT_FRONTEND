import { useEffect, useState } from "react";
import Label from "../../../components/common/form/Label";
import CustomButton from "../../../components/common/form/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import ProfileImage from "../../../assets/images/profile.png";
import PublicLayout from "../../../layouts/PublicLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

const PeopleDetails = () => {
  const { responseData } = useAppSelector(
    (state) => state.fetchPeopleListDataReducer
  );
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<any>();
  useEffect(() => {
    setSelectedUser(responseData.people[0]);
  }, [responseData.people]);
  const onChatClick = () => {
    navigate("/chat", { state: { user: selectedUser } });
  };
  return (
    <PublicLayout>
       <div className="flex flex-row-reverse items-center justify-between  w-full mt-2.5 px-5 md:px-0">
      <h1 className="bg-gradient-text text-transparent bg-clip-text text-2xl md:text-3xl  font-semibold leading-[48px]">
        People Details
        </h1>
        <NavLink to={"/career"}>
        <IoMdArrowRoundBack className="w-6 h-6 text-2xl cursor-pointer"/></NavLink>
      </div>
      <div className="my-10 h-full max-h-[calc(100vh-194px)] min-h-[calc(100vh-194px)] lg:max-h-[calc(100vh-205px)] lg:min-h-[calc(100vh-205px)] px-5 md:px-0">
        <div className=" flex flex-col gap-10  shadow-profileFormShadow h-full max-h-[calc(100vh-164px)] min-h-[calc(100vh-164px)] lg:max-h-[calc(100vh-175px)] lg:min-h-[calc(100vh-175px)]">
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <img src={ProfileImage} alt="profile" width={75} height={75} />
              <h4 className="font-semibold text-xl">
                {selectedUser?.first_name} {selectedUser?.last_name}
              </h4>
            </div>
            <div className="w-full mt-6">
              <div className="grid grid-cols-1 gap-x-10 gap-y-6">
                <div className="w-full flex flex-row gap-2.5">
                  <Label
                    htmlFor="fullName"
                    text="Full Name : "
                    className="!text-lg font-semibold !leading-5"
                  />
                  <p className="text-lg font-normal leading-5">
                    {selectedUser?.first_name} {selectedUser?.last_name}
                  </p>
                </div>
                <div className="w-full flex flex-row gap-2.5">
                  <Label
                    htmlFor="area"
                    text="Area : "
                    className="!text-lg font-semibold !leading-5"
                  />
                  <p className="text-lg font-normal leading-5">
                    {selectedUser?.area}
                  </p>
                </div>
                <div className="w-full flex flex-row gap-2.5">
                  <Label
                    htmlFor="collage"
                    text="Collage : "
                    className="!text-lg font-semibold !leading-5"
                  />
                  <p className="text-lg font-normal leading-5">
                    {selectedUser?.collage}
                  </p>
                </div>
                <div className="w-full flex flex-row gap-2.5">
                  <Label
                    htmlFor="gender"
                    text="Gender : "
                    className="!text-lg font-semibold !leading-5"
                  />
                  <p className="text-lg font-normal leading-5">
                    {selectedUser?.gender}
                  </p>
                </div>
                <div className="w-full flex flex-row gap-2.5">
                  <Label
                    htmlFor="age"
                    text="Age : "
                    className="!text-lg font-semibold !leading-5"
                  />
                  <p className="text-lg font-normal leading-5">
                    {selectedUser?.age}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <CustomButton
              className="bg-black text-white px-5 py-3 rounded-3xl w-full max-w-[400px] text-xl "
              onClick={onChatClick}
            >
              Chat
            </CustomButton>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PeopleDetails;
