import PublicLayout from '../../layouts/PublicLayout'
import ChatComponent from '../../components/chat/ChatComponent'
import { getLocalStorageItem } from '../../config/localStorage';

const HomePage = () => {

  const userData = JSON.parse(getLocalStorageItem('userData') || '{}');

  return (
    <PublicLayout>
      <h1 className="bg-gradient-text text-transparent bg-clip-text text-2xl md:text-3xl mt-2.5 font-semibold leading-9 md:leading-[48px] px-4 md:px-0">
      Walcome, {userData.first_name}
      </h1>
      <div className="pt-0 md:pt-5 pb-0 md:pb-5 h-full">
        <ChatComponent/>
      </div>
    </PublicLayout>
  )
}

export default HomePage
