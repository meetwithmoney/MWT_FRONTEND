import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OK } from "../../config/httpStatusCodes";
import { loginData } from "../../features/auth/loginSlice";
import Slider from "../common/slider/Slider";
import SliderContentCard from "../common/sliderContentCard/SliderContentCard";
import slideImage from "./../../assets/images/photorealistic-money-concept 1.png";
import Input from "../common/form/Input";
import Label from "../common/form/Label";
import CustomButton from "../common/form/Button";
import Logo from "../common/logo/Logo";
import { useAppDispatch } from "../../app/hooks";
import { setSession } from "../../config/localStorage";
import { showError, showSuccess } from "../../helpers/messageHelper";

const loginValidationSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/,
        "Please enter a valid email address."
      )
      .email("Please enter a valid email address")
      .required("Email cannot be blank!"),
    password: yup.string().required("Password is required!"),
  })
  .required();

type FormData = yup.InferType<typeof loginValidationSchema>;

export default function LoginComponent() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginValidationSchema),
  });

  const doSubmit = async (requestData: FormData) => {
    const { payload } = await dispatch(loginData(requestData));
    const { responseData, responseMessage } = payload.data;
    if (payload.data.responseCode === OK) {
      setSession(responseData.authorization_token);
      reset();
      showSuccess(responseMessage);
      navigate("/chat");
    } else {
      showError(responseMessage);
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen relative bg-light-gray-200 gap-5 md:gap-10 py-0 md:py-3 lg:py-4 px-0 md:px-3 lg:px-6 w-full h-full">
      <form
        className="w-full lg:w-1/2 xl:w-[55%] pl-0 xl:pl-16   h-full md:h-auto"
        onSubmit={handleSubmit(doSubmit)}
      >
        <div className="flex flex-col justify-between max-w-full   lg:max-w-[450px] xl:max-w-[512px] w-full h-full px-6 md:px-14 lg:px-0">
          <div className="flex flex-col w-full items-center md:items-start justify-center">
            <div className="w-full  flex justify-center items-center">
              <Logo width={110} height={110} className={"w-[68px] h-[68px] md:w-[110px] md:h-[110px] "} />
            </div>

            <div className="w-full flex flex-col gap-5 md:gap-[30px] mt-6 md:mt-[50px] items-start">
              <div className="w-full flex flex-col">
                <Label htmlFor="email" text="User Name" />
                <Input
                  type="text"
                  placeholder="Enter Your Email"
                  id="email"
                  className="mt-2 md:mt-3"
                  {...register("email")}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                  onChange={(e) => {
                    setValue("email", e.target.value);
                    clearErrors("email");
                  }}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col">
                <Label htmlFor="password" text="Password" />
                <Input
                  type="password"
                  placeholder="Enter Your Password"
                  id="password"
                  className="mt-2 md:mt-3"
                  {...register("password")}
                  onChange={(e) => {
                    setValue("password", e.target.value);
                    clearErrors("password");
                  }}
                  onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("password", {
                        type: "manual",
                        message: "Password is required",
                      });
                    } else {
                      clearErrors("password");
                    }
                  }}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.password.message}
                  </span>
                )}
                <NavLink
                  to="/forgot-password"
                  className="text-gray-300 w-full text-end text-sm md:text-base leading-6 font-normal mt-4 font-poppins"
                >
                  Forgot Password?
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center w-full mt-16 md:mt-20 lg:mt-0 justify-between gap-6 lg:gap-0 mb-5 md:mb-10">
            <CustomButton
              type="submit"
              className="button__outline w-1/2 lg:w-[200px]"
            >
              Sign in
            </CustomButton>
            <CustomButton
              type="button"
              onClick={() => navigate("/sign-up")}
              className="button__contained w-1/2 lg:w-[200px]"
            >
              Sign Up
            </CustomButton>
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
