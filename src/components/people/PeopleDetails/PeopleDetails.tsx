import { useNavigate } from "react-router-dom";
import Label from "../../common/form/Label";
import CustomButton from "../../common/form/Button";
import { useAppDispatch } from "../../../app/hooks";
import { updateMessageData } from "../../../features/chat/updateMessageDataSlice";

type IProps = {
  data: any;
};

const PeopleDetails = ({ data }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onChatClick = async () => {
    await dispatch(updateMessageData({ receiverId: data.user_id }));
    navigate("/chat", { state: { user: data } });
  };

  return (
    <div className="border-[0.5px] border-light-gray-400 rounded-[10px] flex flex-col overflow-auto justify-between px-6 py-6 shadow-profileFormShadow h-full max-h-[calc(100vh-164px)] min-h-[calc(100vh-164px)] lg:max-h-[calc(100vh-195px)] lg:min-h-[calc(100vh-195px)]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-4">
          <img src={data.profile_picture} alt="profile" width={75} height={75} className="bg-slate-200 rounded-full" />
          <h4 className="font-semibold text-xl">
            {data.first_name} {data.last_name}
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
                {data.first_name} {data.last_name}
              </p>
            </div>
            <div className="w-full flex flex-row gap-2.5">
              <Label
                htmlFor="area"
                text="Area : "
                className="!text-lg font-semibold !leading-5"
              />
              <p className="text-lg font-normal leading-5">{data.area}</p>
            </div>
            <div className="w-full flex flex-row gap-2.5">
              <Label
                htmlFor="collage"
                text="Collage : "
                className="!text-lg font-semibold !leading-5"
              />
              <p className="text-lg font-normal leading-5">{data.collage}</p>
            </div>
            <div className="w-full flex flex-row gap-2.5">
              <Label
                htmlFor="gender"
                text="Gender : "
                className="!text-lg font-semibold !leading-5"
              />
              <p className="text-lg font-normal leading-5">{data.gender}</p>
            </div>
            <div className="w-full flex flex-row gap-2.5">
              <Label
                htmlFor="age"
                text="Age : "
                className="!text-lg font-semibold !leading-5"
              />
              <p className="text-lg font-normal leading-5">{data.age}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-5">
        <CustomButton
          className="bg-black text-white px-5 py-3 rounded-3xl w-full text-xl "
          onClick={onChatClick}
        >
          Chat
        </CustomButton>
      </div>
    </div>
  );
};

export default PeopleDetails;
