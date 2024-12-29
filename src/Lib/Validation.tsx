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

export const validation = (props: Props): boolean => {
  const { dataSniffed } = props;

  const regex =
    /^$|^\d{1}(\/|-)\d{2,4}$|^\d{3,255}$|^\d{2,255}(\/|-)\d{1,4}$|^\d{1,255}(\/|-)\d{2,4}$|^\d{3,255}(\/|-)$/;

  const schema: z.ZodType<DataType> = z.object({
    number: z.string().trim().regex(regex).nullable(),
    "init-date": z.date().nullable(),
    "final-day": z.date().nullable(),
    text: z.string().trim().nullable(),
    type: z.string().nullable(),
  });

  const result = schema.safeParse(dataSniffed);

  if (
    dataSniffed.number &&
    (!dataSniffed.number?.trim() || dataSniffed.number?.trim().length < 1)
  ) {
    alert("number too short ");
    return false;
  }

  if (
    dataSniffed.number &&
    (!dataSniffed.number?.trim() || dataSniffed.number?.trim().length > 255)
  ) {
    alert("number is too big ");
    return false;
  }

  if (dataSniffed.number?.trim() && !regex.test(dataSniffed.number.trim())) {
    alert(" number format is not valid please try again");

    console.log(dataSniffed.number?.trim());
    return false;
  }

  if (dataSniffed.number?.trim() && dataSniffed.number?.trim().length > 255) {
    alert("number is too big");
    return false;
  }

  if (
    dataSniffed.text &&
    (!dataSniffed.text?.trim() || dataSniffed.text?.trim().length < 1)
  ) {
    alert("text is too short ");
    return false;
  }

  if (
    dataSniffed.text &&
    (!dataSniffed.text?.trim() || dataSniffed.text?.trim().length > 255)
  ) {
    alert("text is too big ");
    return false;
  }

  if (dataSniffed["final-day"] && dataSniffed["init-date"]) {
    if (dataSniffed["final-day"] < dataSniffed["init-date"]) {
      alert(". end date cannot be shorter than starting date");
      return false;
    }
  }

  if (dataSniffed["final-day"] && !dataSniffed["init-date"]) {
    alert("start date is required ");
    return false;
  }

  if (!dataSniffed["final-day"] && dataSniffed["init-date"]) {
    alert("end date is required ");
    return false;
  }

  if (
    dataSniffed.type &&
    dataSniffed.type.trim() &&
    !(
      dataSniffed.text ||
      dataSniffed.number ||
      (dataSniffed["final-day"] && dataSniffed["init-date"])
    )
  ) {
    alert("please fill another input");
    return false;
  }

  if (!result.success) {
    console.log("Validation failed:", result.error.format());
    return false;
  }
  return true;
};
export default validation;
