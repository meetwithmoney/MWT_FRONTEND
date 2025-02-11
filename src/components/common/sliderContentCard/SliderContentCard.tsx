import React from "react";

interface ContentCardProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageHeight?: number;
  imageWidth?: number;
}
const SliderContentCard:React.FC<ContentCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt = "slideImage",
  imageHeight = 578,
  imageWidth = 518,
}) => {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-6 md:gap-10 !font-syne">
      <h2 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-[32px] leading-5 sm:leading-7 md:leading-9 text-light-gray-100 px-24">{title}</h2>
      <p className="font-medium text-sm md:text-base leading-5 md:leading-6 text-light-gray-100 text-center px-4 sm:px-12 md:px-14 lg:px-20 xl:px-24  ">{description}</p>
      <div className="2xl:max-h-[578px] h-full max-h-[315px] max-w-[280px] md:max-w-[450px] 2xl:max-w-[518px] w-full ">
        <img
          src={imageSrc}
          alt={imageAlt}
          height={imageHeight}
                  width={imageWidth}
                  className="2xl:max-h-[400px] h-full max-h-[315px] md:max-h-[350px] max-w-[280px] md:max-w-[450px] 2xl:max-w-[518px] w-full object-contain"
        />
      </div>
    </div>
  );
};

export default SliderContentCard;
