"use client";

import React from "react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import "easymde/dist/easymde.min.css";
import LoadingButton from "@/components/loading-button";
import { Ticket } from "@prisma/client";

interface TicketFormProps {
  ticket?: Ticket;
}

export default function TicketForm({ ticket }: TicketFormProps) {
  const [formStateCreate, actionCreate] = useFormState(actions.createTicket, {
    errors: {
      title: [],
      description: [],
      status: [],
      priority: [],
      _form: [],
    },
  });

  const [formStateEdit, actionEdit] = useFormState(actions.editTicket, {
    errors: {
      title: [],
      description: [],
      status: [],
      priority: [],
      _form: [],
      id: [],
    },
  });

  return (
    <div className="rounded-md border w-full p-4 bg-gray-50 dark:bg-transparent text-secondary-foreground dark:text-background">
      <form action={ticket ? actionEdit : actionCreate}>
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={ticket?.title}
          className="w-full bg-gray-200 rounded p-2 mb-2"
        />
        {(formStateCreate.errors.title?.length ?? 0) > 0 ? (
          <div className="p-2 mb-5 bg-red-200 border border-red-400 rounded text-red-700">
            {formStateCreate.errors.title?.join(", ")}
          </div>
        ) : null}
        {(formStateEdit.errors.title?.length ?? 0) > 0 ? (
          <div className="p-2 mb-5 bg-red-200 border border-red-400 rounded text-red-700">
            {formStateEdit.errors.title?.join(", ")}
          </div>
        ) : null}
        <textarea
          name="description"
          rows={8}
          placeholder="description"
          defaultValue={ticket?.description}
          className="w-full bg-gray-200 rounded p-2"
        />
        {(formStateCreate.errors.description?.length ?? 0) > 0 ? (
          <div className="p-2 mb-5 bg-red-200 border border-red-400 rounded text-red-700">
            {formStateCreate.errors.description?.join(", ")}
          </div>
        ) : null}
        {(formStateEdit.errors.description?.length ?? 0) > 0 ? (
          <div className="p-2 mb-5 bg-red-200 border border-red-400 rounded text-red-700">
            {formStateEdit.errors.description?.join(", ")}
          </div>
        ) : null}
        <div className="flex items-end justify-center gap-5 mb-5 text-gray-700">
          <label className="flex flex-col items-start justify-center gap-2">
            <span className="text-gray-400 dark:text-gray-300">status</span>
            <select
              name="status"
              defaultValue={ticket?.status}
              className="bg-gray-200 rounded p-2 cursor-pointer"
            >
              <option value="OPEN">Open</option>
              <option value="PROGRESSING">Progressing</option>
              <option value="CLOSED">Closed</option>
            </select>
          </label>
          <label className="flex flex-col items-start justify-center gap-2">
            <span className="text-gray-400 dark:text-gray-300">priority</span>
            <select
              name="priority"
              defaultValue={ticket?.priority}
              className="w-full bg-gray-200 rounded p-2 cursor-pointer"
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </label>
          <div className="flex flex-col items-center justify-center flex-grow">
            {(formStateCreate.errors._form?.length ?? 0) > 0 ? (
              <div className="w-full p-2 mb-2 bg-red-200 border border-red-400 rounded text-red-700">
                {formStateCreate.errors._form?.join(", ")}
              </div>
            ) : null}
            {(formStateEdit.errors._form?.length ?? 0) > 0 ? (
              <div className="w-full p-2 mb-2 bg-red-200 border border-red-400 rounded text-red-700">
                {formStateEdit.errors._form?.join(", ")}
              </div>
            ) : null}

            {ticket && <input type="hidden" name="id" value={ticket?.id} />}
            <LoadingButton
              type="submit"
              className="w-full font-bold"
              variant="default"
            >
              {ticket ? "Update" : "Submit"}
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
}
