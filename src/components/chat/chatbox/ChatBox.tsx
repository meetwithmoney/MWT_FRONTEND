import Input from "../../common/form/Input";
import lock from "../../../assets/images/Lock.png"
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../../socket/socket";
import { UserListResponseData } from "../../../features/chat/fetchUserListSlice";
import { getLocalStorageItem } from "../../../config/localStorage";
import { MdSend } from "react-icons/md";

interface IProps {
  selectedUser: UserListResponseData | null;
  messageThread: any[];
  setMessageThread: React.Dispatch<React.SetStateAction<any[]>>;
  getUserList: () => Promise<void>;
}

const ChatBox = ({ selectedUser, messageThread, setMessageThread, getUserList }: IProps) => {

  const socketContext = useContext(SocketContext);

  const ref = useRef<any>(selectedUser || null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");

  const userData = JSON.parse(getLocalStorageItem('userData') || '');

  useEffect(() => {
    ref.current = selectedUser;
  }, [selectedUser])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageThread]);

  socketContext.socket?.on("receiveMessage", (data: any) => {
    const isCurrentUserChat = ref.current?._id === data.senderId || ref.current?.user_id === data.senderId;
    // const isOtherUserChat = selectedUser?._id === data.senderId || selectedUser?.user_id === data.senderId;
  
    if (isCurrentUserChat) {
      setMessageThread([...messageThread, { senderId: data?.senderId, receiverId: data.receiverId, message: data.message }]);
    }
    getUserList();
  });

  const handleSendMessage = () => {
    socketContext.socket?.emit("sendMessage", { senderId: userData?._id, receiverId: selectedUser?._id || selectedUser?.user_id, message });
    setMessage("");
    setMessageThread([...messageThread, { senderId: userData?._id, receiverId: selectedUser?._id, message }]);
    getUserList();
  };


  return (
    <div className="border-[0.5px] relative  border-light-gray-400 w-full rounded-md md:rounded-3xl bg-white overflow-hidden bg-opacity-5 shadow-profileFormShadow h-full min-h-[calc(100vh-280px)] max-h-[calc(100vh-280px)] lg:max-h-[calc(100vh-300px)] lg:min-h-[calc(100vh-300px)] flex flex-col justify-between p-0 m-0">
      <div className="max-h-full overflow-y-auto py-4 md:py-5 px-2.5 xl:px-7">
        <div className="w-full flex justify-center items-center mb-5">
          <span className="text-black text-[10px] md:text-xs font-normal leading-3 md:leading-4 bg-light-gray-300  rounded-[14px] px-3 xl:px-6 py-3 xl:py-5 max-w-full lg:max-w-[568px] w-[568px] flex flex-row items-center gap-2.5">
            <img src={lock} alt="lock" height={21} width={18} className="h-[16px] w-[14px] md:w-[18px] md:h-[21px] " /> Messages are end-to-end encrypted. No one outside of this chat, not
            even HII5 can read or listen to them click to learn more.
          </span>
        </div>
        <div className="flex flex-col w-full gap-5 px-0 xl:px-5">
          {messageThread.map((item, index) => (
            <div
              key={index}
              className={`rounded-t-[20px] text-white p-3 text-sm font-normal leading-4 ${item.senderId === userData?._id ?
                "bg-blue self-end rounded-bl-[20px] flex justify-end" :
                "bg-black self-start rounded-br-[20px]"}`}
            >
              {item.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="w-full py-3 px-3 xl:px-7">
        <div className="flex flex-row gap-3 py-1.5 pl-4 pr-2 items-center bg-white border border-gray-400 rounded-full ">
          <Input
            className="bg-transparent border-none !p-0 text-gray-500 !text-sm xl:!text-base leading-7 font-normal"
            placeholder="Say Something"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button className="bg-black text-white px-3 xl:px-5 py-1 xl:py-2 rounded-full text-sm xl:text-base font-normal flex flex-row items-center gap-1.5" onClick={handleSendMessage}>
            Send <MdSend className="text-lg " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
