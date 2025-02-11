import React from 'react';

interface StatusButtonProps {
  status: boolean;
  onClick?: () => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({ status, onClick }) => {

  return (
    <div
      className={`${status ? "bg-green" : "bg-red"}  text-xs md:text-base font-normal py-1.5 md:py-2.5 px-2.5 md:px-6 text-center text-white rounded-full cursor-pointer`}
      onClick={onClick}
    >
      {status ? "Online" : "Offline"}
    </div>
  );
};

export default StatusButton;
