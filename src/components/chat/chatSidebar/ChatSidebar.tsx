import Input from "../../common/form/Input";
import { useContext, useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { UserListResponseData } from "../../../features/chat/fetchUserListSlice";
import { fetchUserMessagesThreadData, UserMessagesThreadResponseData } from "../../../features/chat/fetchUserMessagesThreadSlice";
import { SocketContext } from "../../../socket/socket";
import { updateMessageData } from "../../../features/chat/updateMessageDataSlice";

interface IProps {
  selectedUser: UserListResponseData | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserListResponseData | null>>;
  setMessageThread: React.Dispatch<React.SetStateAction<UserMessagesThreadResponseData[]>>;
  userList: UserListResponseData[];
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  getUserList: () => Promise<void>;
  setIsUserSelectedInMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatSidebar = ({ selectedUser, setSelectedUser, setMessageThread, userList, searchText, setSearchText, getUserList, setIsUserSelectedInMobile }: IProps) => {

  const socketContext = useContext(SocketContext);

  const [updateSenderMessage, setUpdateSenderMessage] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedUser) {
      getMessageThreadFromPeople();
    }
  }, []);

  const getMessageThreadFromPeople = async () => {
    selectedUser && await dispatch(fetchUserMessagesThreadData(selectedUser.user_id)).then((res) => {
      setMessageThread(res.payload.data.responseData);
    });
  }

  useEffect(() => {
    getUserList();
  }, [searchText]);

  const onUserClick = async (user: UserListResponseData) => {
    setSelectedUser(user);
    await dispatch(fetchUserMessagesThreadData(user._id)).then(async (res) => {
      setMessageThread(res.payload.data.responseData);
      await dispatch(updateMessageData({ receiverId: user._id }));
      await getUserList();
    });
  };

  socketContext.socket?.on("updateSenderMessage", (data: any) => {
    setUpdateSenderMessage(data);
  });

  return (
    <div className="flex flex-col border-0 md:border-[0.5px] border-light-gray-400 shadow-profileFormShadow overflow-hidden min-h-[calc(100vh-100px)] lg:max-h-[calc(100vh-205px)] lg:min-h-[calc(100vh-205px)]  h-full rounded-3xl bg-white bg-opacity-100 md:bg-opacity-5">
      <div className="w-full p-3 xl:p-5">
        <div className="flex flex-row gap-3 py-2 px-4 items-center bg-white border border-gray-400 rounded-3xl ">
          <Input
            className="bg-transparent border-none !p-0 text-gray-500 text-sm xl:!text-base leading-5 md:leading-7 font-normal"
            placeholder="Search or start a new chat"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      {!userList || userList.length === 0 ?
        <>No Data Found</>
        :
        <div className="flex flex-col flex-grow overflow-y-auto h-full">
          {userList.map((user: UserListResponseData, index) => (
            <div key={index}>
              <div
                className={` hidden lg:flex flex-row justify-between cursor-pointer hover:bg-light-gray-300 px-2.5  xl:px-5 py-2.5 ${(selectedUser?._id === user._id || selectedUser?.user_id === user._id) ? "bg-light-gray-300" : ""}`}
                onClick={() => onUserClick(user)}
              >
                <div className="flex flex-row gap-3 items-center">
                  <img src={user.profile_picture} alt="profile" width={60} height={60} className="w-[50px] h-[50px] xl:w-[60px] xl:h-[60px] bg-slate-200 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-black font-bold text-sm  xl:text-base leading-5  lg:leading-6">{user.first_name} {user.last_name}</h4>
                    <p className="text-black text-xs leading-4 font-normal">{updateSenderMessage && updateSenderMessage.receiverId === user._id && updateSenderMessage?.message ? updateSenderMessage?.message : user.last_message}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2.5 items-end">
                  <p className="text-[10px] xl:text-xs leading-4 xl:leading-5 text-gray-600 font-normal">{updateSenderMessage && updateSenderMessage.receiverId === user._id && updateSenderMessage?.last_message_at ? updateSenderMessage?.last_message_at : user.last_message_at}</p>
                  {user.unread_count > 0 && (
                    <span className="w-4 xl:w-5 h-4 xl:h-5 bg-black text-white text-[10px] xl:text-xs font-semibold xl:font-bold leading-3 rounded-full p-0.5 flex items-center justify-center">
                      {user.unread_count}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={`flex lg:hidden flex-row justify-between cursor-pointer hover:bg-light-gray-300 px-5 py-2.5 ${(selectedUser?._id === user._id || selectedUser?.user_id === user._id) ? "bg-light-gray-300" : ""}`}
                onClick={() => {onUserClick(user); setIsUserSelectedInMobile(true);}}
              >
                <div className="flex flex-row gap-3 items-center">
                  <img src={user.profile_picture} alt="profile" width={60} height={60} className="bg-slate-200 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <h4 className="text-black font-bold text-base leading-6">{user.first_name} {user.last_name}</h4>
                    <p className="text-black text-xs leading-4 font-normal">{updateSenderMessage?.message ? updateSenderMessage?.message : user.last_message}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2.5 items-end">
                  <p className="text-xs leading-5 text-gray-600 font-normal">{updateSenderMessage?.last_message_at ? updateSenderMessage?.last_message_at : user.last_message_at}</p>
                  {updateSenderMessage?.senderUnreadCount !== 0 || user.unread_count > 0 && (
                    <span className="w-5 h-5 bg-black text-white text-xs font-bold leading-3 rounded-full p-0.5 flex items-center justify-center">
                      {user.unread_count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default ChatSidebar;
