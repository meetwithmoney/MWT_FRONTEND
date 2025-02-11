import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Label from "../../common/form/Label";
import Input from "../../common/form/Input";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { fetchUserProfileData, userPicture } from "../../../features/user/userProfileSlice";
import { OK } from "../../../config/httpStatusCodes";
import { setLocalStorageItem } from "../../../config/localStorage";
import profile from "../../../assets/images/profile.png";
import { MdEdit } from "react-icons/md";

const signUpValidationSchema = yup
  .object({
    firstname: yup
      .string()
      .required("Full name is required")
      .min(3, "Full name must be minimum 3 character's.")
      .max(32, "Full name must be maximum 32 character's.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Full name cannot have numbers & special characters."
      ),
    lastname: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name must be minimum 3 character's.")
      .max(32, "Last name must be maximum 32 character's.")
      .matches(
        /^[aA-zZ\s]+$/,
        "Full name cannot have numbers & special characters."
      ),
    phoneNumber: yup.string().required("Phone Number is required"),
    age: yup.string().required("Age Number is required"),
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
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[^\s]{8,15}$/,
        "Password should contains 8-15 characters. At least 1 digit, 1 special character, 1 uppercase letter & 1 lowercase letter."
      ),
    type: yup.string().required("Please select user type"),
    referralCode: yup.string().optional(),
  })
  .required();
const PersonalDetails = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const { payload } = await dispatch(fetchUserProfileData());
    if (payload?.data.responseCode === OK) {
      setValue("firstname", payload.data.responseData.profileData.first_name);
      setValue("lastname", payload.data.responseData.profileData.last_name);
      setValue("phoneNumber", payload.data.responseData.profileData.mobile_number);
      setValue("email", payload.data.responseData.profileData.email);
      setValue("gender", payload.data.responseData.profileData.gender ?? "-");
      setValue("age", payload.data.responseData.profileData.age ?? "-");
      setValue("collage", payload.data.responseData.profileData.collage_name ?? "-");
      setValue("area", payload.data.responseData.profileData.area ?? "-");
      if (payload.data.responseData.profileData.profile_image) {
        setProfileImg(payload.data.responseData.profileData.profile_image);
      }
      setLocalStorageItem(
        "userData",
        JSON.stringify(payload.data.responseData.profileData)
      );
    }
  };

  const {
    register,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
  });

  const values = watch();
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store uploaded image
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("image", file);
      const res = await dispatch(userPicture(formData));
      // setProfileImg(res?.payload?.data?.responseData?.profileImageUrl ?? "");
      // const res = await dispatch(userPicture(formData)) as any;
      // setProfileImg(res.payload?.data?.responseData?.profileImageUrl);
      console.log('res', res);
    }
  };
  return (
    <form className="w-full">
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col w-full justify-start items-start">
          <div className="w-full flex flex-col gap-4  items-start">
            <div className="relative">
              <img
                src={selectedImage || profileImg || profile}
                alt="Profile"
                className="rounded-full border border-gray-300"
                height={80}
                width={80}
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-black text-white p-1 rounded-full "
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <MdEdit size={14} />
              </button>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5 lg:gap-4">
              <div className="flex flex-col">
                <Label htmlFor="firstname" text="First name" />
                <Input
                  disabled
                  type="text"
                  placeholder="Enter Your First Name"
                  id="firstname"
                  className="mt-2.5"
                  {...register("firstname")}
                  onChange={(e) => {
                    setValue("firstname", e.target.value);
                    clearErrors("firstname");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("firstname", {
                        type: "manual",
                        message: "First Name is required!",
                      });
                    } else {
                      clearErrors("firstname");
                    }
                  }}
                  value={values.firstname}
                />
                {errors.firstname && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.firstname.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="lastname" text="Last name" />
                <Input
                  disabled
                  type="text"
                  placeholder="Enter Your Last name"
                  id="lastname"
                  className="mt-2.5"
                  {...register("lastname")}
                  onChange={(e) => {
                    setValue("lastname", e.target.value);
                    clearErrors("lastname");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("lastname", {
                        type: "manual",
                        message: "Last Name is required",
                      });
                    } else {
                      clearErrors("lastname");
                    }
                  }}
                  value={values.lastname}
                />
                {errors.lastname && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.lastname.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="phoneNumber" text="Phone Number" />
                <Input
                  disabled
                  type="number"
                  placeholder="Enter Your Number"
                  id="phoneNumber"
                  className="mt-2.5"
                  {...register("phoneNumber")}
                  onChange={(e) => {
                    setValue("phoneNumber", e.target.value);
                    clearErrors("phoneNumber");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("phoneNumber", {
                        type: "manual",
                        message: "Phone Number is required!",
                      });
                    } else {
                      clearErrors("phoneNumber");
                    }
                  }}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="email" text="Email Address" />
                <Input
                  disabled
                  type="email"
                  placeholder="Enter Your Email Address"
                  id="email"
                  className="mt-2.5"
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
                  value={values.email}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="gender" text="Gender" />
                <Input
                  disabled
                  type="text"
                  placeholder="Enter Your Last name"
                  id="gender"
                  className="mt-2.5"
                  {...register("gender")}
                  onChange={(e) => {
                    setValue("gender", e.target.value);
                    clearErrors("gender");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("gender", {
                        type: "manual",
                        message: "Last Name is required",
                      });
                    } else {
                      clearErrors("gender");
                    }
                  }}
                  value={values.gender}
                />
                {errors.gender && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.gender.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="age" text="Age" />
                <Input
                  disabled
                  type="text"
                  placeholder="Enter Your Last name"
                  id="age"
                  className="mt-2.5"
                  {...register("age")}
                  onChange={(e) => {
                    setValue("age", e.target.value);
                    clearErrors("age");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("age", {
                        type: "manual",
                        message: "Last Name is required",
                      });
                    } else {
                      clearErrors("age");
                    }
                  }}
                  value={values.age}
                />
                {errors.age && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.age.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="collage" text="Collage" />
                <Input
                  disabled
                  type="text"
                  placeholder="Enter Your Last name"
                  id="collage"
                  className="mt-2.5"
                  {...register("collage")}
                  onChange={(e) => {
                    setValue("collage", e.target.value);
                    clearErrors("collage");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("collage", {
                        type: "manual",
                        message: "Last Name is required",
                      });
                    } else {
                      clearErrors("collage");
                    }
                  }}
                  value={values.collage}
                />
                {errors.collage && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.collage.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="area" text="Area" />
                <Input
                  disabled
                  type="text"
                  placeholder="Enter Your Last name"
                  id="area"
                  className="mt-2.5"
                  {...register("area")}
                  onChange={(e) => {
                    setValue("area", e.target.value);
                    clearErrors("area");
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setError("area", {
                        type: "manual",
                        message: "Last Name is required",
                      });
                    } else {
                      clearErrors("area");
                    }
                  }}
                  value={values.area}
                />
                {errors.area && (
                  <span className="text-red-500 text-sm leading-5 font-normal mt-2">
                    {errors.area.message}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full">
              <Label htmlFor="referralCode" text="Referral Code" />
              <Input
                disabled
                type="text"
                placeholder="Enter Referral a Code"
                id="referralCode"
                className="mt-2.5"
                {...register("referralCode")}
                onChange={(e) => {
                  setValue("referralCode", e.target.value);
                }}
              />
            </div>
          </div>

          {/* <div className="flex flex-row items-center w-full justify-between mt-8">
                  <CustomButton
                    type="submit"
                    className="button__contained w-full"
                  >
                    Save Profile
                  </CustomButton>
                </div> */}
        </div>
      </div>
    </form>
  );
};

export default PersonalDetails;
