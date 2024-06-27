"use client";

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { ImSpinner8 } from "react-icons/im";

export default function LoadingButton({ children, ...rest }) {
  const { pending } = useFormStatus();
  const { className } = { ...rest };

  return (
    <Button type="submit" className={`${className}`} disabled={pending}>
      {pending ? (
        <div className="flex items-center justify-center py-1">
          <ImSpinner8 className="spin" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
