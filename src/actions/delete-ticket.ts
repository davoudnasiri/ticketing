"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";

interface DeleteTicketFormState {
  errors: {
    _form?: string[];
  };
}

export async function deleteTicket(
  fromState: DeleteTicketFormState,
  formData: FormData
): Promise<DeleteTicketFormState> {
  ////////////// Delay //////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const id = Number(formData.get("id"));

  try {
    await db.ticket.delete({
      where: { id },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong"],
        },
      };
    }
  }

  revalidatePath("/tickets");
  redirect("/tickets");
}

//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////
//////////////////////////////////////////

// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { db } from "@/db";

// interface deleteTicketFormState {
//   errors: {
//     _form?: string[];
//   };
// }

// export async function deleteTicket(id: number) {
//   try {
//     await db.ticket.delete({
//       where: { id },
//     });
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return {
//         errors: {
//           _form: [err.message],
//         },
//       };
//     } else {
//       return {
//         errors: {
//           _form: ["Something went wrong"],
//         },
//       };
//     }
//   }

//   revalidatePath("/tickets");
//   redirect("/tickets");
// }
