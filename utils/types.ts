import { FieldError, UseFormRegister } from "react-hook-form";
import { ZodType, z } from "zod";

export type EventFormData = {
  title: string;
  description: string;
  location: string;
  event_date?: string;
  slug?: string;
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
  | "event_date"
  | "slug";

export const EventSchema: ZodType<EventFormData> = z.object({
  title: z.string().min(1, { message: "Title cannot be empty." }),
  description: z.string().min(1, { message: "Description cannot be empty." }),
  location: z.string().min(1, { message: "Location cannot be empty." }),
  event_date: z.string().min(1, { message: "Event date cannot be empty." }),
  slug: z.string().min(1, { message: "Slug cannot be empty." }),
});
