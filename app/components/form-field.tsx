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
    <>
      {error && <motion.span>{error.message}</motion.span>}
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { valueAsNumber })}
      ></input>
    </>
  );
};

export default FormField;
