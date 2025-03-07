import { FormFieldProps } from "@/utils/types";

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
      <input type={type}></input>
    </>
  );
};
