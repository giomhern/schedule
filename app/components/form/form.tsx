"use client";
import { useForm } from "react-hook-form";
import { EventFormData, EventSchema } from "@/utils/types";
import FormField from "./form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const Form = ({ close }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<EventFormData>({
    // resolver: zodResolver(EventSchema),
    shouldUnregister: false,
  });
  const [formPage, setFormPage] = useState<number>(0);
  const formSteps = [
    {
      title: "What's your event about?",
      fields: [
        {
          type: "text",
          placeholder: "Add an engaging event title.",
          name: "title",
        },
        {
          type: "textbox",
          placeholder:
            "Add a description to encourage your guests to attend your event. Links, emojis, and new lines are supported.",
          name: "description",
        },
        {
          type: "text",
          placeholder: "Add the location of your event.",
          name: "location",
        },
      ],
    },
    {
      title: "When is your event?",
      fields: [
        {
          type: "date",
          placeholder: "Add the date of your event.",
          name: "date",
        },
        {
          type: "time",
          placeholder: "Add the time of your event.",
          name: "time",
        },
        {
          type: "textbox",
          placeholder:
            "Any any additional comments you may have on this event. Don't worry, these will only be visible to you.",
          name: "comments",
        },
      ],
    },
  ];

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent form submission
    setFormPage((prev) => prev + 1);
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormPage((prev) => prev - 1);
  };

  const submitForm = async (data: EventFormData) => {
    console.log("Attempting to submit form with the following data: ", data)
    try {
      await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Failed to submit form with the following error: ", err);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <h1 className="text-lg font-medium">{formSteps[formPage].title}</h1>

      {formSteps[formPage].fields.map((field) => (
        <FormField
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          name={field.name as keyof EventFormData}
          register={register}
          error={errors[field.name as keyof EventFormData]}
        />
      ))}

      <div className="flex items-center gap-2 justify-end">
        {formPage > 0 && (
          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-medium border border-slate-200 px-4 py-2 rounded-sm shadow-xs hover:cursor-pointer"
          >
            Back
          </button>
        )}
        {formPage < formSteps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="text-sm font-medium text-white bg-indigo-500 px-4 py-2 rounded-sm shadow-xs hover:cursor-pointer"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="text-sm font-medium text-white bg-indigo-500 px-4 py-2 rounded-sm shadow-xs hover:cursor-pointer"
          >
            Create Event
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
