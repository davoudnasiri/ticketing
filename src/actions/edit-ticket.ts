"use server";

// import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { editTicketSchema } from "@/validation-schema/tickets-schema";

interface editTicketFormState {
  errors: {
    title?: string[];
    description?: string[];
    status?: string[];
    priority?: string[];
    _form?: string[];
    id?: string[];
  };
}

export async function editTicket(
  fromState: editTicketFormState,
  formData: FormData
): Promise<editTicketFormState> {
  ////////////// Delay //////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = editTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
    id: formData.get("id"),
  });

  const id = Number(formData.get("id"));

  // Check Sign In
  // const session = await auth();
  // if (!session || !session.user) {
  //   return {
  //     errors: {
  //       _form: ["You must be signed in"],
  //     },
  //   };
  // }

  // Check Validation
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // let ticket: Ticket;
  try {
    await db.ticket.update({
      where: { id },
      data: {
        title: result.data.title,
        description: result.data.description,
        status: result.data.status,
        priority: result.data.priority,
      },
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
