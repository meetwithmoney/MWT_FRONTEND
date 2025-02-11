import PublicLayout from "../../layouts/PublicLayout";
import PeopleComponent from "../../components/people/PeopleComponent";

const PeoplePage = () => {
  return (
    <PublicLayout>
      <h1 className="bg-gradient-text text-transparent bg-clip-text text-2xl md:text-3xl mt-2.5 font-semibold leading-9 md:leading-[48px] px-4 md:px-0">
        People
      </h1>
      <div className="pt-0 md:pt-5 pb-5  h-full ">
        <PeopleComponent/>
      </div>
    </PublicLayout>
  );
};

export default PeoplePage;
