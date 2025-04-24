import React from "react";

const BackGround = ({ imageUrl, children, className = "" }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={`min-h-screen w-full flex flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default BackGround;
