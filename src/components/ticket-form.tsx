"use client";

import React from "react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import "easymde/dist/easymde.min.css";
import LoadingButton from "@/components/loading-button";

export default function TicketForm() {
  const [formState, action] = useFormState(actions.createTicket, {
    errors: {
      title: [],
      description: [],
      status: [],
      priority: [],
      _form: [],
    },
  });

  return (
    <div className="rounded-md border w-full p-4 text-background bg-gray-50 dark:bg-transparent">
      <form action={action}>
        <input
          type="text"
          name="title"
          placeholder="title"
          className="w-full bg-gray-500 dark:bg-gray-200 rounded p-2 mb-2 placeholder:text-background"
        />
        {(formState.errors.title?.length ?? 0) > 0 ? (
          <div className="p-2 mb-5 bg-red-200 border border-red-400 rounded text-red-700">
            {formState.errors.title?.join(", ")}
          </div>
        ) : null}
        <textarea
          name="description"
          rows={5}
          placeholder="description"
          className="w-full bg-gray-500 dark:bg-gray-200 rounded p-2 placeholder:text-background"
        />
        {(formState.errors.description?.length ?? 0) > 0 ? (
          <div className="p-2 mb-5 bg-red-200 border border-red-400 rounded text-red-700">
            {formState.errors.description?.join(", ")}
          </div>
        ) : null}
        <div className="flex items-end justify-center gap-5 mb-5">
          <label className="flex flex-col items-start justify-center gap-2">
            <span className="text-gray-700 dark:text-gray-200">status</span>
            <select
              name="status"
              className="bg-gray-500 dark:bg-gray-200 rounded p-2 cursor-pointer"
            >
              <option value="OPEN">Open</option>
              <option value="PROGRESSING">Progressing</option>
              <option value="CLOSED">Closed</option>
            </select>
          </label>
          <label className="flex flex-col items-start justify-center gap-2">
            <span className="text-gray-700 dark:text-gray-200">priority</span>
            <select
              name="priority"
              className="w-full bg-gray-500 dark:bg-gray-200 rounded p-2 cursor-pointer"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
          <div className="flex flex-col items-center justify-center flex-grow">
            {(formState.errors._form?.length ?? 0) > 0 ? (
              <div className="w-full p-2 mb-2 bg-red-200 border border-red-400 rounded text-red-700">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <LoadingButton className="w-full">Submit</LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
}

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

// "use client";

// import { useFormState } from "react-dom";
// import React, { useRef } from "react";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
// import { createTicketSchema } from "@/validation-schema/tickets-schema";
// import { z } from "zod";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as actions from "@/actions";
// import { Input } from "./ui/input";
// import SimpleMDE from "react-simplemde-editor";
// import "easymde/dist/easymde.min.css";
// import { Button } from "./ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
//   SelectItem,
// } from "./ui/select";

// type TicketFormData = z.infer<typeof createTicketSchema>;

// export default function TicketForm() {
//   const [formState, action] = useFormState(actions.createTicket, {
//     errors: {
//       title: [],
//       description: [],
//       // status: [],
//       // priority: [],
//       _form: [],
//     },
//   });

//   const form = useForm<TicketFormData>({
//     resolver: zodResolver(createTicketSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       // status: "OPEN",
//       // priority: "LOW",
//     },
//   });

//   const inputRef = useRef<HTMLInputElement>(null);

//   async function onSubmit(values: z.infer<typeof createTicketSchema>) {
//     console.log(values);
//   }

//   return (
//     <div className="rounded-md border w-full p-4">
//       <Form {...form}>
//         <form action={action} className="space-y-8 w-full">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ticket Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Ticket Title " {...field} />
//                 </FormControl>
//               </FormItem>
//             )}
//           />
//           <Controller
//             name="description"
//             control={form.control}
//             render={({ field }) => (
//               <SimpleMDE placeholder="Description" {...field} />
//             )}
//           />
//           <div className="flex w-full space-x-4">
//             {/* <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Status</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Status" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="OPEN">Open</SelectItem>
//                       <SelectItem value="IN_PROGRESS">Progressing</SelectItem>
//                       <SelectItem value="CLOSED">Closed</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="priority"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Priority</FormLabel>
//                   <Select onValueChange={field.onChange} value={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Priority" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="LOW">Low</SelectItem>
//                       <SelectItem value="MEDIUM">Medium</SelectItem>
//                       <SelectItem value="HIGH">High</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             /> */}
//           </div>
//           {formState.errors._form ? (
//             <div className="p-2 bg-red-200 border border-red-400 rounded-xl">
//               {formState.errors._form?.join(", ")}
//             </div>
//           ) : null}
//           <input ref={inputRef} type="submit" className="hidden" />
//           <Button onClick={form.handleSubmit(() => inputRef.current?.click())}>
//             Submit
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
