import ChatBox from "../../../components/chat/chatbox/ChatBox";
import { UserListResponseData } from "../../../features/chat/fetchUserListSlice";
import { UserMessagesThreadResponseData } from "../../../features/chat/fetchUserMessagesThreadSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

interface IProps {
  selectedUser: UserListResponseData | null;
  messageThread: UserMessagesThreadResponseData[];
  setMessageThread: React.Dispatch<React.SetStateAction<UserMessagesThreadResponseData[]>>;
  getUserList: () => Promise<void>;
  setIsUserSelectedInMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatDetailsPage = ({ selectedUser, messageThread, setMessageThread, getUserList, setIsUserSelectedInMobile }: IProps) => {
  return (
    <div className="mt-5 px-4 md:px-0 lg:max-h-[calc(100vh-205px)] lg:min-h-[calc(100vh-205px)] h-full pb-5 md:pb-0">
      <div className="flex lg:hidden flex-col w-full gap-3 max-w-full lg:max-w-[1222px]">
        <div className="border-[0.5px] border-light-gray-400 w-full rounded-md md:rounded-3xl px-4 py-4 bg-white bg-opacity-5 shadow-profileFormShadow h-max flex flex-row gap-4">
          <div onClick={() => setIsUserSelectedInMobile(false)}>
            <IoMdArrowRoundBack className="w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex flex-row gap-2.5 items-center">
            <img
              src={"/"}
              alt="profile"
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-2.5">
              <h4 className="text-black font-medium text-lg leading-6">
                {selectedUser?.first_name} {selectedUser?.last_name}
              </h4>
              <p className="text-light-gray-500 text-xs leading-4 font-medium">
                {selectedUser?.last_seen}
              </p>
            </div>
          </div>
        </div>
        <ChatBox
          getUserList={getUserList}
          selectedUser={selectedUser}
          messageThread={messageThread}
          setMessageThread={setMessageThread}
        />
      </div>
    </div>
  );
};

export default ChatDetailsPage;
