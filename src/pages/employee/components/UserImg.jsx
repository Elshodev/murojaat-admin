import React from "react";

function UserImg({ userData, currentUserId }) {
  return (
    <div
      className={`w-[35px] text-sm uppercase font-semibold h-[35px] rounded-full flex items-center justify-center  ${
        userData.id == currentUserId
          ? "bg-main-blue text-white"
          : "bg-[#DDDDDD] text-black"
      }`}
    >
      {userData.user_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)}{" "}
    </div>
  );
}

export default UserImg;
