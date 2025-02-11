import { useEffect, useState } from "react";
import PeopleDetails from "./PeopleDetails/PeopleDetails";
import Input from "../common/form/Input";
import ReactTable from "../common/table/ReactTable";
import personImage from "../../assets/images/profile.png";
import StatusButton from "../common/statusButton/StatusButton";
import filter from "../../assets/images/Vector.png";
import search from "../../assets/images/Combined Shape.png";
import Filter from "./filter/Filter";
import { fetchPeopleListData } from "../../features/people/fethcPeopleListSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { NavLink } from "react-router-dom";

export type filterValuesType = {
  age: string;
  gender: string;
  area: string;
  college: string;
};

const PeopleComponent = () => {

  const { responseData } = useAppSelector((state) => state.fetchPeopleListDataReducer);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const page = 1;
  const [selectedUser, setSelectedUser] = useState<any>();
  const [searchText, setSearchText] = useState<string>("");
  const [filterValues, setFilterValues] = useState<filterValuesType>({
    age: "",
    gender: "",
    area: "",
    college: "",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserList();
  }, [searchText]);

  useEffect(() => {
    setSelectedUser(responseData.people[0]);
  }, [responseData.people]);

  const getUserList = async () => {
    await dispatch(fetchPeopleListData({ searchText, page, limit: 10000, age: filterValues.age, gender: filterValues.gender, area: filterValues.area, collage: filterValues.college }));
  };

  const handleFilterSubmit = () => {
    getUserList();
    setIsFilterOpen(false);
  };

  const columns = [
    {
      header: "Persons",
      accessorKey: "id",
      cell: ({ row }: any) => (
        <>
          <div className="hidden lg:flex flex-row items-center gap-3 cursor-pointer" onClick={() => setSelectedUser(row.original)}>
            <img src={row.original.profile_picture} alt="person" height={45} width={45} className="w-[30px] md:w-[45px] h-[30px]  md:h-[45px] bg-slate-200 rounded-full" />
            <h4 className="text-black text-opacity-50 font-medium text-sm md:text-base leading-5 group-hover:text-opacity-100">
              {row.original.first_name} {row.original.last_name}
            </h4>
          </div>
          <NavLink to={`/people/personal-details/${row?.original?.user_id}`} className="flex lg:hidden flex-row items-center gap-3 cursor-pointer min-w-max" >
            <img src={personImage} alt="person" height={45} width={45} className="w-[30px] md:w-[45px] h-[30px]  md:h-[45px]" />
            <h4 className="text-black text-opacity-50 font-medium text-sm md:text-base leading-5 group-hover:text-opacity-100">
              {row.original.first_name} {row.original.last_name}
            </h4>
          </NavLink>
        </>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: () => (
        <p className=" text-sm md:text-base leading-5 font-medium text-black text-opacity-50 group-hover:text-opacity-60 min-w-max">
          Mar 12,2024
        </p>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => (
        <StatusButton
          status={row.original.is_active}
          onClick={() => console.log(`Status of ${row.original.first_name} ${row.original.last_name} clicked!`)}
        />
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }: any) => (
        <p className=" text-sm md:text-base leading-5 font-medium text-black text-opacity-50 group-hover:text-opacity-60">
          {row.original.amount}
        </p>
      ),
    },
  ];

  return (
    <div className="w-full h-full   flex flex-col xl:flex-row gap-5 md:gap-7">
      <div className="w-full xl:w-1/2 h-full ">
        <div className="border-0 md:border border-light-gray-400 rounded-[10px] overflow-hidden  shadow-profileFormShadow relative h-full max-h-[calc(100vh-195px)] min-h-[calc(100vh-195px)]">
          <div className="w-full px-4  py-3 md:py-5 flex flex-row items-center gap-6 md:gap-11">
            <div
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="cursor-pointer"
            >
              <img src={filter} alt="filter" width={20} height={18} />
            </div>
            <div className="flex flex-row gap-3 py-2 px-5 items-center bg-white border border-gray-400 rounded-3xl w-full">
              <img src={search} alt="filter" width={20} height={20} />
              <Input
                className="bg-transparent border-none !p-0 text-gray-500 text-sm md:text-base leading-3 md:leading-7 font-normal"
                placeholder="Search or start a new chat"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div className="h-full  pb-5 md:pb-0  max-h-[calc(100vh-220px)] min-h-[calc(100vh-220px)] md:max-h-[calc(100vh-280px)] md:min-h-[calc(100vh-280px)] overflow-scroll">
            <ReactTable data={responseData.people || []} columns={columns} />
          </div>
          {isFilterOpen && (
            <div className="absolute inset-0 bg-white bg-opacity-70 mt-[60px] md:mt-[75px] pt-2.5 pl-2.5 pr-2.5 md:pr-0 overflow-auto md:overflow-y-hidden md:pl-5 rounded-none md:rounded-[10px]  ">
              <div
                className=" inset-0 left-0 "
                onClick={() => setIsFilterOpen(false)}
              ></div>
              <Filter filterValues={filterValues} setFilterValues={setFilterValues} setIsFilterOpen={setIsFilterOpen} handleFilterSubmit={handleFilterSubmit} />
            </div>
          )}
        </div>
      </div>
      <div className="w-0 lg:w-full xl:w-1/2 h-full hidden lg:block overflow-hidden">
        {selectedUser && <PeopleDetails data={selectedUser} />}
      </div>
    </div>
  );
};

export default PeopleComponent;
