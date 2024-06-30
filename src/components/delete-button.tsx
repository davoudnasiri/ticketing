"use client";

import React, { useEffect, useState } from "react";
import * as actions from "@/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "./ui/button";
import LoadingButton from "./loading-button";
import { useFormState } from "react-dom";

export default function DeleteButton({ ticketId }: { ticketId: number }) {
  const [formStateDelete, actionDelete] = useFormState(actions.deleteTicket, {
    errors: {
      _form: [],
    },
  });
  const [showErr, setShowErr] = useState(true);

  useEffect(() => {
    (formStateDelete.errors._form?.length ?? 0) > 0 && setShowErr(true);
  }, [formStateDelete]);

  const handleClose = () => {
    setShowErr(false);
  };

  return (
    <div className="w-full h-full">
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({ variant: "destructive" })}
        >
          Delete Ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-transparent hover:bg-transparent p-0">
              <form action={actionDelete} className="w-full">
                <input type="hidden" name="id" value={ticketId} />
                <LoadingButton
                  type="submit"
                  variant="destructive"
                  className="w-full"
                >
                  Delete
                </LoadingButton>
              </form>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {(formStateDelete.errors._form?.length ?? 0) > 0 && showErr ? (
        <div>
          <div className="absolute inset-0 bg-zinc-800 bg-opacity-75"></div>
          <div className="flex flex-col justify-center items-center text-center gap-2 absolute inset-10 max-h-min my-auto p-2 bg-red-200 border border-red-400 rounded text-red-700">
            {formStateDelete.errors._form?.join(", ")}
            <Button
              onClick={handleClose}
              variant={"outline"}
              className="text-white sm:w-min w-full"
            >
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

// "use client";

// import React, { useState } from "react";
// import * as actions from "@/actions";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { buttonVariants } from "./ui/button";
// import LoadingButton from "./loading-button";

// export default function DeleteButton({ ticketId }: { ticketId: number }) {
//   const [formState, setFormState] = useState<{ errors?: { _form?: string[] } }>(
//     {}
//   );
//   const actionDelete = actions.deleteTicket.bind(null, formState, ticketId);

//   const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const response = await actionDelete();

//     if (response?.errors?._form) {
//       // Update form state with errors to display to the user
//       setFormState(response);
//     } else {
//       // Handle successful deletion (optional)
//       console.log("Ticket deleted successfully");
//     }
//   };

//   return (
//     <>
//       <AlertDialog>
//         <AlertDialogTrigger
//           className={buttonVariants({ variant: "destructive" })}
//         >
//           Delete Ticket
//         </AlertDialogTrigger>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete your
//               ticket.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction className="bg-transparent hover:bg-transparent p-0">
//               <form onSubmit={handleDelete} className=" w-full">
//                 <LoadingButton
//                   type="submit"
//                   variant="destructive"
//                   className="w-full"
//                 >
//                   Delete
//                 </LoadingButton>
//               </form>
//             </AlertDialogAction>
//             {/* Display errors if any */}
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//       {formState.errors?._form && (
//         <div className="text-red-500">
//           {formState.errors._form.map((error, index) => (
//             <p key={index}>{error}</p>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
