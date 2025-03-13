import { FormFieldProps } from "@/utils/types";
import { motion } from "motion/react";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="mb-2 capitalize font-medium text-sm">{name}</h3>
      {type === "textbox" ? (
        <textarea
          className="py-3 px-3 shadow-xs border border-slate-200 rounded-md text-sm h-32 placeholder:text-sm focus:border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
          placeholder={placeholder}
          {...register(name, { valueAsNumber: valueAsNumber })}
        ></textarea>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className="py-3 px-3 shadow-xs border border-slate-200 rounded-md text-sm placeholder:text-sm focus:border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
          {...register(name, { valueAsNumber })}
        />
      )}
      {error && <motion.span>{error.message}</motion.span>}
    </div>
  );
};

export default FormField;
