import ChatSidebar from "./chatSidebar/ChatSidebar";
import ChatBox from "./chatbox/ChatBox";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../socket/socket";
import { fetchUserListData, UserListResponseData } from "../../features/chat/fetchUserListSlice";
import { useAppDispatch } from "../../app/hooks";
import { fetchUserProfileData } from "../../features/user/userProfileSlice";
import { OK } from "../../config/httpStatusCodes";
import { setLocalStorageItem } from "../../config/localStorage";
import { UserMessagesThreadResponseData } from "../../features/chat/fetchUserMessagesThreadSlice";
import { useLocation } from "react-router-dom";
import ChatDetailsPage from "../../pages/chat/chatdetails/ChatdetailsPage";

const ChatComponent = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const [selectedUser, setSelectedUser] = useState<UserListResponseData | null>(
    user || null
  );
  const [messageThread, setMessageThread] = useState<
    UserMessagesThreadResponseData[]
  >([]);
  const [isUserSelectedInMobile, setIsUserSelectedInMobile] = useState<boolean>(false);
  const [userList, setUserList] = useState<UserListResponseData[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const socketContext = useContext(SocketContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const { payload } = await dispatch(fetchUserProfileData());
    if (payload?.data.responseCode === OK) {
      setLocalStorageItem(
        "userData",
        JSON.stringify(payload.data.responseData.profileData)
      );
    }
  };

  useEffect(() => {
    if (!socketContext.socket?.connected) {
      socketContext.initiateConnection();
    }
  }, []);

  const getUserList = async () => {
    const { payload } = await dispatch(fetchUserListData(searchText));
    if (payload.status === OK) {
      setUserList(payload.data.responseData);
    }
  };

  return (
    <div className="flex flex-row gap-6 xl:gap-10 h-full">
      {!isUserSelectedInMobile && (
        <div className="max-w-full lg:max-w-[409px] w-full">
          <ChatSidebar
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setMessageThread={setMessageThread}
            getUserList={getUserList}
            userList={userList}
            searchText={searchText}
            setSearchText={setSearchText}
            setIsUserSelectedInMobile={setIsUserSelectedInMobile}
          />
        </div>
      )}
      {selectedUser && (
        <div className="hidden lg:flex flex-col w-full gap-3 max-w-full lg:max-w-[1222px] pb-5 md:pb-0">
          <div className="border-[0.5px] border-light-gray-400 w-full rounded-3xl px-1.5 sm:px-4 py-4 bg-white bg-opacity-5 shadow-profileFormShadow h-max">
            <div></div>{" "}
            <div className="flex flex-row gap-2.5 items-center">
              <img
                src={selectedUser?.profile_picture}
                alt="profile"
                className="bg-slate-200 rounded-full"
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
          <div className="h-full">
            <ChatBox
              selectedUser={selectedUser}
              messageThread={messageThread}
              setMessageThread={setMessageThread}
              getUserList={getUserList}
            />
          </div>
        </div>
      )}
      {selectedUser && isUserSelectedInMobile && (
        <div className="lg:hidden w-full">
          <ChatDetailsPage
            selectedUser={selectedUser}
            messageThread={messageThread}
            setMessageThread={setMessageThread}
            getUserList={getUserList}
            setIsUserSelectedInMobile={setIsUserSelectedInMobile}
          />
        </div>
      )}
      {!selectedUser && <div className="border-[0.5px] border-light-gray-400 w-full rounded-3xl px-1.5 sm:px-4 py-4 bg-white bg-opacity-5 shadow-profileFormShadow h-full min-h-[calc(100vh-194px)] max-h-[calc(100vh-194px)] lg:max-h-[calc(100vh-205px)] lg:min-h-[calc(100vh-205px)] hidden lg:flex item-center justify-center"><p className="text-xl font-bold leading-9">No data Found!</p></div>}
    </div>
  );
};

export default ChatComponent;
