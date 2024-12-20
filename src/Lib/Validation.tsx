import { z } from "zod";

export interface DataType {
  number: string | null;
  "init-date": Date | null;
  "final-day": Date | null;
  text: string | null;
  type: string | null;
}

interface Props {
  dataSniffed: DataType;
}

export const Validation = (props: Props): boolean => {
  const { dataSniffed } = props;

  const regex =
    /^$|^\d{1}(\/|-)\d{2,4}$|^\d{3,25}$|^\d{2,25}(\/|-)\d{1,4}$|^\d{1,25}(\/|-)\d{2,4}$|^\d{3,25}(\/|-)$/;

  const schema: z.ZodType<DataType> = z.object({
    number: z
      .string()
      .regex(regex)

      .nullable(),

    "init-date": z.date().nullable(),
    "final-day": z.date().nullable(),
    text: z.string().nullable(),
    type: z.string().nullable(),
  });

  console.log("Number field value:", dataSniffed.number);
  console.log("Number field value:", dataSniffed.text);

  const result = schema.safeParse(dataSniffed);

  // Log the result (you can also display it if needed)

  if (dataSniffed.number?.trim() && !regex.test(dataSniffed.number)) {
    alert("wrong numbers! please try again");
    return false;
  }
  if (dataSniffed.number?.trim() && dataSniffed.number.trim.length < 3) {
    alert("Too short! increase numbers");
    return false; // return false indicating failure
  }

  if (dataSniffed.text?.trim() && dataSniffed.text.trim().length < 3) {
    alert(". Text is too short");
    return false; // return false indicating failure
  }

  if (dataSniffed.text?.trim() && dataSniffed.text.trim().length < 3) {
    alert(". Text is too short");
    return false; // return false indicating failure
  }

  if (!result.success) {
    console.log("Validation failed:", result.error.format());
    return false;
  }

  return true;
};
export default Validation;
