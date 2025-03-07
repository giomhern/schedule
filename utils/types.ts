import { FieldError, UseFormRegister } from "react-hook-form";

export type EventFormData = {
  title: string;
  description: string;
  location: string;
  event_date: string;
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