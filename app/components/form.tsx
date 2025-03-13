import { useForm } from "react-hook-form";
import { EventFormData } from "@/utils/types";
import FormField from "./form-field";

const Form = ({ close }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<EventFormData>();

  const submitForm = async (data: EventFormData) => {
    const form_w_default = { ...data, event_date: "June 7, 2025", slug: "new" };
    console.log("SUCCESS", form_w_default);

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form_w_default),
      });

      const responseData = response.json();
      console.log(responseData);
    } catch (err) {
      console.error("Failed to submit form with the following error: ", err);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid col-auto space-y-4">
        <h1 className="text-lg font-medium">What's your event about?</h1>
        <FormField
          type="text"
          placeholder="Add an engaging event title."
          name="title"
          register={register}
          error={errors.title}
        />
        <FormField
          type="textbox"
          placeholder="Add a description to encourage your guests to attend your event. Links, emojis, and new lines are supported."
          name="description"
          register={register}
          error={errors.description}
        />

        <FormField
          type="text"
          placeholder="Add the location of your event."
          name="location"
          register={register}
          error={errors.location}
        />

        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={close}
            className="text-sm font-medium border border-slate-200 px-4 py-2 rounded-sm shadow-xs hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(submitForm)}
            className="text-sm font-medium text-white bg-indigo-500 px-4 py-2 rounded-sm shadow-xs hover:cursor-pointer"
          >
            Create event
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
