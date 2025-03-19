import { FieldError, UseFormRegister } from "react-hook-form";
import { ZodType, z } from "zod";

export type EventFormData = {
  title: string;
  description: string;
  location: string;
  date: string; // Format: YYYY-MM-DD
  time: string; // Format: HH:MM
  comments?: string; // Optional
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<EventFormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | "title"
  | "description"
  | "location"
  | "date"
  | "time"
  | "comments";

export const EventSchema: ZodType<EventFormData> = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  location: z.string().min(1, { message: "Location cannot be empty." }),
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format." }),
  time: z.string()
    .regex(/^\d{2}:\d{2}$/, { message: "Time must be in HH:MM format." }),
  comments: z.string().optional(),
});