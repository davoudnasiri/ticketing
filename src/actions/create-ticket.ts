"use server";

// import { auth } from "@/auth";
import { Ticket } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { createTicketSchema } from "@/lib/tickets-schema";

interface CreateTicketFormState {
  errors: {
    title?: string[];
    description?: string[];
    status?: string[];
    priority?: string[];
    _form?: string[];
  };
}

export async function createTicket(
  fromState: CreateTicketFormState,
  formData: FormData
): Promise<CreateTicketFormState> {
  ////////////// Delay //////////////
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const result = createTicketSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    priority: formData.get("priority"),
  });

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

  let ticket: Ticket;
  try {
    ticket = await db.ticket.create({
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
