import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OK } from "../../config/httpStatusCodes";
import { AppDispatch } from "../../app/store";
import { forgotPasswordData } from "../../features/auth/forgotPasswordSlice";
import { showSuccess } from "../../helpers/messageHelper";
import CustomButton from "../common/form/Button";
import Slider from "../common/slider/Slider";
import SliderContentCard from "../common/sliderContentCard/SliderContentCard";
import slideImage from "./../../assets/images/photorealistic-money-concept 1.png";
import Label from "../common/form/Label";
import Input from "../common/form/Input";
import Logo from "../common/logo/Logo";
const forgotPasswordValidationSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/,
        "Please enter a valid email address."
      )
      .email("Please enter a valid email address"),
  })
  .required();

export default function ForgotPasswordComponent() {
  const dispatch = useDispatch();

  type FormData = yup.InferType<typeof forgotPasswordValidationSchema>;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(forgotPasswordValidationSchema),
  });

  const doSubmit = async (requestData: FormData) => {
    const { payload } = await (dispatch as AppDispatch)(
      forgotPasswordData(requestData)
    );
    if (payload.status === OK) {
      showSuccess(payload.data.message);
      reset();
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen relative bg-light-gray-200  gap-5 md:gap-10 py-0 md:py-3 lg:py-4 px-0 md:px-3 lg:px-6 w-full h-full">
      <form className="w-full lg:w-1/2 xl:w-[55%] pl-0 xl:pl-16  h-full md:h-auto" onSubmit={handleSubmit(doSubmit)}>
        <div className="flex flex-col justify-between max-w-full lg:max-w-[400px] xl:max-w-[500px] w-full h-full px-6 md:px-40 lg:px-0">
          <div className="flex flex-col w-full">
          <div className="w-full  flex justify-center items-center">
              <Logo width={110} height={110} className={"w-[68px] h-[68px] md:w-[110px] md:h-[110px] "} />
            </div>
            <div className="w-full flex flex-col gap-[30px] mt-5 lg:mt-[100px] items-start h-full justify-center">
              <div className="w-full flex flex-col">
                <Label htmlFor="email" text="Email" />
                <Input
                  type="text"
                  placeholder="Enter Your Email"
                  id="email"
                  className="mt-3"
                  {...register("email")}
                  onChange={(e) => {
                    setValue("email", e.target.value);
                    clearErrors("email");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("email", {
                        type: "manual",
                        message: "Email is required",
                      });
                    } else {
                      clearErrors("email");
                    }
                  }}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>
              <div className="flex flex-row items-center w-full justify-between mt-10 md:mt-16 lg:mt-20 mb-20 lg:mb-0">
                <CustomButton
                  type="submit"
                  className="button__contained w-full"
                >
                  Submit
                </CustomButton>
              </div>
          </div>
        </div>
      </form>
      <div className="relative w-full lg:w-1/2 xl:w-[45%] h-auto bg-black md:rounded-t-[20px]  md:rounded-br-[20px] rounded-none md:rounded-bl-[96px] py-5 sm:py-10 md:py-16">
        <Slider>
          <SliderContentCard
            title="Earn Money"
            description={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut"
            }
            imageSrc={slideImage}
          />
          <SliderContentCard
            title="Earn Money"
            description={
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut"
            }
            imageSrc={slideImage}
          />
        </Slider>
      </div>
    </div>
  );
}
