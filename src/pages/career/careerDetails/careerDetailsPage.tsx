import PublicLayout from "../../../layouts/PublicLayout";
import CareerDetails from "../../../components/career/careerDetails/CareerDetails";
import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

const CareerDetailsPage = () => {
  return (
    <PublicLayout>
      <div className="flex flex-row-reverse items-center justify-end gap-5 w-full mt-2.5 px-4 md:px-0">
      <h1 className="bg-gradient-text text-transparent bg-clip-text text-2xl md:text-3xl  font-semibold leading-[48px]">
        Member Details
        </h1>
        <NavLink to={"/career"}>
        <IoMdArrowRoundBack className="w-6 h-6 text-2xl cursor-pointer"/></NavLink>
      </div>
      <div className="pt-4 md:pt-5 pb-5 h-full px-4 md:px-0">
        <CareerDetails />
      </div>
    </PublicLayout>
  );
};

export default CareerDetailsPage;
