const CareerDetails = ({ selectedUser }: any) => {

  return (
    <div className="h-full max-h-[calc(100vh-194px)] min-h-[calc(100vh-194px)] overflow-auto lg:max-h-[calc(100vh-205px)] lg:min-h-[calc(100vh-205px)]  border-0 md:border border-light-gray-400 rounded-[10px] p-0 md:p-6 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-5 items-center">
        <img src={selectedUser?.profile_image} alt="profile" width={70} height={70} className="w-[80px] h-[80px] md:w-[70px] md:h-[70px] bg-slate-200 rounded-full" />
        <div className="flex flex-col items-center md:items-start">
          <p className="text-black text-opacity-50 text-base md:text-base leading-5 md:leading-7 font-medium">
            {selectedUser?.email}
          </p>
          <h1 className="text-black text-xl md:text-2xl leading-6 md:leading-8 font-semibold">
            {selectedUser?.first_name} {selectedUser?.last_name}
          </h1>
        </div>
      </div>
      {/* <h1 className="text-gray-200 text-xl md:text-3xl leading-6 md:leading-9 font-semibold">
        Earnings: {selectedUser?.total_earnings}
      </h1> */}
      <div>
        <div className="w-full flex flex-row justify-between items-center mt-5">
          <div className="flex flex-row gap-1.5 items-center">
            <span className=" w-3 md:w-4 h-3 md:h-4 bg-green rounded-full"></span>
            <p className="text-gray-200 text-base md:text-lg leading-5 md:leading-7 font-medium">Wing</p>
          </div>
          <p className="text-black leading-5 md:leading-7 text-base md:text-lg font-medium">{selectedUser?.total_earnings}</p>
        </div>
        <div className="w-full flex flex-row justify-between items-center mt-5">
          <div className="flex flex-row gap-1.5 items-center">
            <span className="w-3 md:w-4 h-3 md:h-4 bg-red rounded-full"></span>
            <p className="text-gray-200 text-base md:text-lg leading-5 md:leading-7 font-medium">People</p>
          </div>
          <p className="text-black leading-5 md:leading-7 text-base md:text-lg font-medium">{selectedUser?.people_count}</p>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
