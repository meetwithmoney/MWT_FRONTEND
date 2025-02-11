import Input from "../common/form/Input";
import ReactTable from "../common/table/ReactTable";
import StatusButton from "../common/statusButton/StatusButton";
import CareerDetails from "./careerDetails/CareerDetails";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { fetchCareerListData } from "../../features/career/fetchCareerListSlice";
import moment from "moment";

const CareerComponent = () => {

  const { responseData } = useAppSelector((state) => state.fetchCareerListDataReducer);

  const [searchText, setSearchText] = useState<string>("");
  const page = 1;
  const [selectedUser, setSelectedUser] = useState<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCareerList();
  }, [searchText]);

  useEffect(() => {
    setSelectedUser(responseData[0]);
  }, [responseData]);

  const getCareerList = async () => {
    await dispatch(fetchCareerListData({ searchText, page, limit: 10000 }));
  };

  const columns = [
    {
      header: "Persons",
      accessorKey: "id",
      cell: ({ row }: any) => (
        <div className="hidden lg:flex flex-row items-center gap-2 md:gap-3 min-w-max cursor-pointer" onClick={() => setSelectedUser(row.original)}>
          <img src={row.original.profile_image} alt="person" height={45} width={45} className="w-[30px] md:w-[45px] h-[30px] md:h-[45px]" />
          <h4 className="text-black text-opacity-50 font-medium text-sm md:text-base leading-5 group-hover:text-opacity-100">
            {row.original.first_name} {row.original.last_name}
          </h4>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <p className="text-sm md:text-base leading-5 font-medium text-black text-opacity-50 group-hover:text-opacity-60 min-w-max">
          {moment(row.original.created_at).format('MMM DD, YYYY')}
        </p>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => (
        <StatusButton
          status={row.original.is_active}
          onClick={() => console.log(`Status of ${row.original.name} clicked!`)}
        />
      ),
    },
    {
      header: "Amount",
      accessorKey: "occupation",
      cell: ({ row }: any) => (
        <p className="text-sm md:text-base leading-5 font-medium text-black text-opacity-50 group-hover:text-opacity-60 min-w-max">
          {row.original.total_earnings}
        </p>
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-7">
      <div className="w-full xl:w-1/2 h-full">
        <div className="border-0 md:border-[0.5px] border-light-gray-400 rounded-none md:rounded-[10px]   shadow-profileFormShadow overflow-hidden  h-full  min-h-[calc(100vh-194px)] lg:max-h-[calc(100vh-205px)] lg:min-h-[calc(100vh-205px)]">
          <div className="w-full px-4 py-3 md:py-5">
            <div className="flex flex-row gap-3 py-2 px-4 items-center bg-white border border-gray-400 rounded-3xl ">
              <Input
                className="bg-transparent border-none !p-0 text-gray-500 text-sm md:text-base leading-5 md:leading-7 font-normal"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div className="h-full pb-5 md:pb-0 max-h-[calc(100vh-220px)] min-h-[calc(100vh-220px)] md:max-h-[calc(100vh-280px)] md:min-h-[calc(100vh-280px)] overflow-scroll table__scroll">
            <ReactTable data={responseData} columns={columns} />
          </div>
        </div>
      </div>
      <div className="w-0 lg:w-full xl:w-1/2 h-full hidden lg:block overflow-hidden">
        <CareerDetails selectedUser={selectedUser} />
      </div>
    </div>
  );
};

export default CareerComponent;
