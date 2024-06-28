import React from "react";
import { ImSpinner8 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center gap-2 mx-auto">
      <span>loading... </span>
      <ImSpinner8 className="spin" />
    </div>
  );
}
