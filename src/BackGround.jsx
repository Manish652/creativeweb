import React from "react";

const BackGround = ({ imageUrl, children, className = "" }) => {
  return (
    <div
      style={{
        background: `url(${imageUrl}) center / cover no-repeat`,
      }}
      className={`min-h-screen w-full flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default BackGround;
