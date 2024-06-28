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
    <div className="rounded-md border w-full p-4 bg-gray-50 dark:bg-transparent">
      <form action={action}>
        <input
          type="text"
          name="title"
          placeholder="title"
          className="w-full bg-gray-100 dark:bg-gray-200 rounded p-2 mb-2"
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
          className="w-full bg-gray-100 dark:bg-gray-200 rounded p-2"
        />
        {(formState.errors.description?.length ?? 0) > 0 ? (
          <div className="p-2 mb-5 bg-red-200 border border-red-400 rounded text-red-700">
            {formState.errors.description?.join(", ")}
          </div>
        ) : null}
        <div className="flex items-end justify-center gap-5 mb-5 text-gray-500">
          <label className="flex flex-col items-start justify-center gap-2">
            <span className="text-gray-400 dark:text-gray-300">status</span>
            <select
              name="status"
              className="bg-gray-100 dark:bg-gray-200 rounded p-2 cursor-pointer"
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
              className="w-full bg-gray-100 dark:bg-gray-200 rounded p-2 cursor-pointer"
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
            <LoadingButton className="w-full opacity-80" variant="default">
              Submit
            </LoadingButton>
          </div>
        </div>
      </form>
    </div>
  );
}
