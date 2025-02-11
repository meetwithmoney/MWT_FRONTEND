import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { OK } from "../../config/httpStatusCodes";
import { AppDispatch } from "../../app/store";
import { verifyResetPasswordTokenData } from "../../features/auth/verifyResetPasswordToken";
import Logo from "../common/logo/Logo";
import Label from "../common/form/Label";
import Input from "../common/form/Input";
import SliderContentCard from "../common/sliderContentCard/SliderContentCard";
import Slider from "../common/slider/Slider";
import CustomButton from "../common/form/Button";
import slideImage from "./../../assets/images/photorealistic-money-concept 1.png";

type FormData = {
  new_password: string;
  confirm_password: string;
};

type TogglePassword = {
  new_password: boolean;
  confirm_password: boolean;
};

const resetPasswordValidationSchema = yup.object().shape({
  new_password: yup
    .string()
    .required("New password is required")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[^\s]{8,15}$/,
      "Password should contains 8-15 characters. At least 1 digit, 1 special character, 1 uppercase letter & 1 lowercase letter."
    ),
  confirm_password: yup
    .string()
    .oneOf(
      [yup.ref("new_password")],
      "New password & confirm password must be same."
    )
    .required("Confirm password is required"),
});

export default function ResetPasswordComponent() {
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [togglePassword, setTogglePassword] = useState<TogglePassword>({
    new_password: false,
    confirm_password: false,
  });
  const [message, setMessage] = useState<string>("");
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    verifyResetPasswordToken();
  }, []);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(resetPasswordValidationSchema),
  });

  const verifyResetPasswordToken = async () => {
    if (token) {
      const { payload } = await (dispatch as AppDispatch)(
        verifyResetPasswordTokenData(token)
      );
      if (payload.status !== OK) {
        setIsTokenExpired(true);
        setMessage(payload.data.message);
      }
    }
  };

  const doSubmit = async (values: FormData) => {
    console.log('values', values)
    // const formData = {
    //   token,
    //   password: values.new_password
    // }
    // const { payload } = await (dispatch as AppDispatch)(resetPasswordData(formData));
    // if (payload.status === OK) {
    //   reset();
    //   navigate("/");
    // }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen relative bg-light-gray-200  gap-5 md:gap-10 py-0 md:py-3 lg:py-4 px-0 md:px-3 lg:px-6 w-full h-full">
      <form className="w-full lg:w-1/2 xl:w-[55%] pl-0 xl:pl-16  h-full md:h-auto" onSubmit={handleSubmit(doSubmit)}>
        <div className="flex flex-col justify-between  max-w-full lg:max-w-[400px] xl:max-w-[500px] w-full h-full px-6 md:px-40 lg:px-0">
          <div className="flex flex-col w-full">
          <div className="w-full  flex justify-center items-center">
              <Logo width={110} height={110} className={"w-[68px] h-[68px] md:w-[110px] md:h-[110px] "} />
            </div>
            <div className="w-full flex flex-col gap-[30px] mt-6 md:mt-[50px] items-start h-full justify-center">
              <div className="w-full flex flex-col">
                <Label htmlFor="new_password" text="New Password" />
                <Input
                  type="password"
                  placeholder="Enter New Password"
                  id="new_password"
                  className="mt-3"
                  {...register("new_password")}
                  onChange={(e) => {
                    setValue("new_password", e.target.value);
                    clearErrors("new_password");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("new_password", {
                        type: "manual",
                        message: "New password is required",
                      });
                    } else {
                      clearErrors("new_password");
                    }
                  }}
                />
                {errors.new_password && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.new_password.message}
                  </span>
                )}
              </div>
              <div className="w-full flex flex-col">
                <Label htmlFor="confirm_password" text="Confirm Password" />
                <Input
                  type="password"
                  placeholder="Enter Confirm Password"
                  id="confirm_password"
                  className="mt-3"
                  {...register("confirm_password")}
                  onChange={(e) => {
                    setValue("confirm_password", e.target.value);
                    clearErrors("confirm_password");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("confirm_password", {
                        type: "manual",
                        message: "Confirm Password is required",
                      });
                    } else {
                      clearErrors("confirm_password");
                    }
                  }}
                />
                {errors.confirm_password && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.confirm_password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-row items-center w-full justify-between mt-10 mb-10 lg:mb-0">
                <CustomButton
                  type="submit"
                  className="button__contained w-full"
                >
                  Submit
                </CustomButton>
              </div>
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
