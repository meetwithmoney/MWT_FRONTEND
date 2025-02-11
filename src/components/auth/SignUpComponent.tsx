import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SliderContentCard from "../common/sliderContentCard/SliderContentCard";
import Slider from "../common/slider/Slider";
import slideImage from "./../../assets/images/photorealistic-money-concept 1.png";
import Logo from "../common/logo/Logo";
import Label from "../common/form/Label";
import Input from "../common/form/Input";
import CustomButton from "../common/form/Button";
import SelectBox from "../common/form/SelectBox";
import { signUpData } from "../../features/auth/signUpSlice";
import { useAppDispatch } from "../../app/hooks";
import { OK } from "../../config/httpStatusCodes";
import { showSuccess } from "../../helpers/messageHelper";
import { areaOptions, colleageOptions, genderOptions } from "../../helpers/constants";
import { fetchPaymentPhotoData } from "../../features/auth/paymenetPhotoSlice";
import { useEffect, useState } from "react";

export type PhoneObject = {
  name: string;
  dialCode: string;
  countryCode: string;
  format: string;
};

type FormData = {
  first_name: string;
  last_name: string;
  phone: string;
  dob: string;
  gender: string;
  area: string;
  collage: string;
  email: string;
  terms: boolean; // Ensure this is a boolean
  paymentImage: FileList; // Change to remove null
};


const signUpValidationSchema: yup.ObjectSchema<FormData> = yup
  .object({
    first_name: yup
      .string()
      .required("Full name is required")
      .min(3, "Full name must be minimum 3 character's.")
      .max(32, "Full name must be maximum 32 character's.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Full name cannot have numbers & special characters."
      ),
    last_name: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name must be minimum 3 character's.")
      .max(32, "Last name must be maximum 32 character's.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Full name cannot have numbers & special characters."
      ),
    phone: yup.string().required("Phone Number is required"),
    dob: yup
      .string()
      .required("Date of birth is required")
      .test("age", "You must be at least 18 years old", (value) => {
        if (!value) return false;
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }),
    gender: yup.string().required("Gender is required"),
    area: yup.string().required("Area is required"),
    collage: yup.string().required("Collage is required"),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/,
        "Please enter a valid email address."
      )
      .email("Please enter a valid email address"),
    terms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
    paymentImage: yup
      .mixed<FileList>()
      .required("Profile image is required")
      .test("fileSize", "File size is too large", (value: FileList | null) => {
        if (!value) return false;
        return value[0]?.size <= 5000000; // 5MB limit
      })
      .test("fileType", "Unsupported file format", (value: FileList | null) => {
        if (!value || value.length === 0) return false;
        return ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type);
      }),
  })
  .required();

export default function SignUpComponent() {

  const [paymentImage, setPaymentImage] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpValidationSchema),
  });

  const doSubmit = async (requestData: FormData) => {
    const formData = new FormData();
    formData.append("first_name", requestData.first_name);
    formData.append("last_name", requestData.last_name);
    formData.append("phone", `+91${requestData.phone}`);
    formData.append("gender", requestData.gender);
    formData.append("email", requestData.email);
    formData.append("dob", requestData.dob);
    formData.append("collage", requestData.collage);
    formData.append("area", requestData.area);
    if (requestData.paymentImage?.[0]) {
      formData.append("paymentImage", requestData.paymentImage[0]);
    }

    // const formData = {
    //   first_name: requestData.first_name,
    //   last_name: requestData.last_name,
    //   phone: `+91${requestData.phone}`,
    //   gender: requestData.gender,
    //   email: requestData.email,
    //   dob: requestData.dob,
    //   collage: requestData.collage,
    //   area: requestData.area,
    // };

    const { payload } = await dispatch(signUpData(formData));
    if (payload.data.responseCode === OK) {
      showSuccess(payload.data.responseMessage);
      navigate("/");
      reset();
    }
  };

  const handleSelectChange = (field: any, value: string) => {
    setValue(field, value);
    if (!value) {
      setError(field, { type: "manual", message: `${field} is required!` });
    } else {
      clearErrors(field);
    }
  };

  const fetchPaymentPhoto = async () => {
    const { payload } = await dispatch(fetchPaymentPhotoData());
    if (payload.data.responseCode === OK) {
      console.log(payload.data.responseData.qr_code_image);
      setPaymentImage(payload.data.responseData.qr_code_image);
    }
  }

  useEffect(() => {
    fetchPaymentPhoto();
  }, []);


  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen relative bg-light-gray-200  gap-5 md:gap-10 py-0 md:py-3 lg:py-4 px-0 md:px-3 lg:px-6 w-full h-full">
      <form className="w-full lg:w-1/2 xl:w-[55%] pl-0 xl:pl-16  h-full md:h-auto" onSubmit={handleSubmit(doSubmit)}>
        <div className="flex flex-col justify-between max-w-full lg:max-w-[592px] w-full h-full px-6 md:px-16 lg:px-0">
          <div className="flex flex-col w-full justify-between items-start">
            <div className="w-full  flex justify-center items-center">
              <Logo width={110} height={110} className={"w-[68px] h-[68px] md:w-[110px] md:h-[110px] "} />
            </div>
            <div className="w-full flex flex-col gap-5 md:gap-[30px] mt-6 md:mt-[50px] items-start">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                <div className="flex flex-col">
                  <Label htmlFor="first_name" text="First name" />
                  <Input
                    type="text"
                    placeholder="Enter Your First Name"
                    id="first_name"
                    className="mt-2 md:mt-3"
                    {...register("first_name")}
                    onChange={(e) => {
                      setValue("first_name", e.target.value);
                      clearErrors("first_name");
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setError("first_name", {
                          type: "manual",
                          message: "First Name is required!",
                        });
                      } else {
                        clearErrors("first_name");
                      }
                    }}
                  />
                  {errors.first_name && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.first_name.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="last_name" text="Last name" />
                  <Input
                    type="text"
                    placeholder="Enter Your Last name"
                    id="last_name"
                    className="mt-2 md:mt-3"
                    {...register("last_name")}
                    onChange={(e) => {
                      setValue("last_name", e.target.value);
                      clearErrors("last_name");
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setError("last_name", {
                          type: "manual",
                          message: "Last Name is required",
                        });
                      } else {
                        clearErrors("last_name");
                      }
                    }}
                  />
                  {errors.last_name && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.last_name.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" text="Phone Number" />
                  <Input
                    type="number"
                    placeholder="Enter Your Number"
                    id="phone"
                    className="mt-2 md:mt-3"
                    {...register("phone")}
                    onChange={(e) => {
                      setValue("phone", e.target.value);
                      clearErrors("phone");
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setError("phone", {
                          type: "manual",
                          message: "Phone Number is required!",
                        });
                      } else {
                        clearErrors("phone");
                      }
                    }}
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" text="Email Address" />
                  <Input
                    type="email"
                    placeholder="Enter Your Email Address"
                    id="email"
                    className="mt-2 md:mt-3"
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
                          message: "Email Address is required",
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
                <div>
                  <Label htmlFor="gender" text="Gender" />
                  <SelectBox
                    options={genderOptions}
                    onChange={(value) => handleSelectChange("gender", value)}
                    onBlur={() => {
                      const value = watch("gender");
                      if (!value) {
                        setError("gender", {
                          type: "manual",
                          message: "Gender is required!",
                        });
                      }
                    }}
                    placeholder="Please select gender"
                    className="mt-2 md:mt-3"
                  />
                  {errors.gender && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.gender.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="dob" text="Date of Birth" />
                  <Input
                    type="date"
                    id="dob"
                    max={new Date().toISOString().split('T')[0]} // Prevents future dates
                    className="mt-2 md:mt-3"
                    {...register("dob")}
                    onChange={(e) => {
                      setValue("dob", e.target.value);
                      clearErrors("dob");
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (!value) {
                        setError("dob", {
                          type: "manual",
                          message: "Date of birth is required!",
                        });
                      }
                    }}
                  />
                  {errors.dob && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.dob.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="collage" text="Collage" />
                  <SelectBox
                    options={colleageOptions}
                    onChange={(value) => handleSelectChange("collage", value)}
                    onBlur={() => {
                      const value = watch("collage");
                      if (!value) {
                        setError("collage", {
                          type: "manual",
                          message: "Collage is required!",
                        });
                      }
                    }}
                    placeholder="collage"
                    className="mt-2 md:mt-3"
                  />
                  {errors.collage && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.collage.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="area" text="Area" />
                  <SelectBox
                    options={areaOptions}
                    onChange={(value) => handleSelectChange("area", value)}
                    placeholder="area"
                    className="mt-2 md:mt-3"
                    onBlur={() => {
                      const value = watch("area");
                      if (!value) {
                        setError("area", {
                          type: "manual",
                          message: "Area is required!",
                        });
                      }
                    }}
                  />
                  {errors.area && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.area.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="payment" text="Payment QR Code" />
                  <img id="payment" src={paymentImage} alt="payment" />
                </div>
                <div>
                  <Label htmlFor="paymentImage" text="Payment Image Proof" />
                  <input
                    type="file"
                    id="paymentImage"
                    accept="image/*"
                    className="mt-2 md:mt-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setValue("paymentImage", e.target.files);
                      } else {
                        setValue("paymentImage", new DataTransfer().files);
                      }
                      clearErrors("paymentImage");
                    }}
                  />
                  {errors.paymentImage && (
                    <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                      {errors.paymentImage.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row items-center pt-6 w-full gap-1.5 ml-0.5 mt-10 md:mt-5 lg:mt-0">
                <input
                  type="checkbox"
                  id="terms"
                  className="!w-max cursor-pointer"
                  {...register("terms")}
                />
                <label
                  htmlFor="terms"
                  className="text-gray-300 cursor-pointer font-medium text-sm md:text-base leading-5 md:leading-6"
                >
                  I agree the terms and Conditions
                </label>
              </div>
              {errors.terms && (
                <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                  {errors.terms.message}
                </span>
              )}
            </div>
            <div className="flex flex-row items-center w-full justify-between mb-5 mt-6 gap-6 lg:gap-0">
              <CustomButton
                type="submit"
                className="button__contained w-1/2 lg:w-[200px]"
              >
                Sign Up
              </CustomButton>
              <CustomButton
                type="button"
                onClick={() => navigate("/")}
                className="button__outline w-1/2 lg:w-[200px]"
              >
                Sign in
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
