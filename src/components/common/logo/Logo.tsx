import React from 'react';
import meetImage from "../../../assets/images/MEET_PEOPLES-removebg-preview 1.png";
import { NavLink } from 'react-router-dom';

interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  src = meetImage,
  alt = "logo",
  width = 144,
  height = 144,
  className
}) => {
  return (
    <NavLink to={"/"} className="w-full h-max flex justify-center items-center">
      <img src={src} alt={alt} width={width} height={height} className={className} />
    </NavLink>
  );
};

export default Logo;
