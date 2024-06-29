import { Button, ButtonProps } from "./ui/button";
import { useFormStatus } from "react-dom";
import { ImSpinner8 } from "react-icons/im";

// Extend the ButtonProps type to include the "variant" and "className" and "type" props
interface LoadingButtonProps extends ButtonProps {
  children: string;
}

export default function LoadingButton({
  children,
  ...rest
}: LoadingButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} {...rest}>
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
