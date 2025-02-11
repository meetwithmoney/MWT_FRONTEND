import React from "react";

type HeaderProps = {
  title: string;
  sort?: string;
  onClick: () => void;
};

const TableHeader: React.FC<HeaderProps> = ({
  title,
  sort,
  onClick,
}) => {
  return (
    <div className="cursor-pointer arrow-head" onClick={onClick}>
      {title}
      {sort === "ASC" && <i className="table-arrow-up table-arrow-down ml-2"></i>}
      {sort === "DESC" && <i className="table-arrow-down"></i>}
    </div>
  );
};

export default TableHeader;
