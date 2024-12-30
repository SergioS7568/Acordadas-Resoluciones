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

export const validation = (
  props: Props
): { message: string; isValid: boolean } => {
  const { dataSniffed } = props;

  const regex =
    /^$|^\d{1}(\/|-)\d{2,4}$|^\d{1,255}$|^\d{1,255}(\/|-)\d{1,4}$|^\d{1,255}(\/|-)\d{2,4}$|^\d{1,255}(\/|-)$/;

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
    return {
      message: " Número debe contener  entre 1 y 255 caracteres",
      isValid: false,
    };
  }

  if (
    dataSniffed.number &&
    (!dataSniffed.number?.trim() || dataSniffed.number?.trim().length > 255)
  ) {
    return {
      message: "Número debe contener  entre 1 y 255 caracteres",
      isValid: false,
    };
  }

  if (dataSniffed.number?.trim() && !regex.test(dataSniffed.number.trim())) {
    return {
      message: "El formato del número de acordada no es el correcto",
      isValid: false,
    };
  }

  if (
    dataSniffed.text &&
    (!dataSniffed.text?.trim() || dataSniffed.text?.trim().length < 1)
  ) {
    return {
      message: " Texto debe contener entre 3 y 255 caracteres",
      isValid: false,
    };
  }

  if (
    dataSniffed.text &&
    (!dataSniffed.text?.trim() || dataSniffed.text?.trim().length > 255)
  ) {
    return {
      message: "Texto debe contener entre 3 y 255 caracteres",
      isValid: false,
    };
  }

  if (dataSniffed["final-day"] && dataSniffed["init-date"]) {
    if (dataSniffed["final-day"] < dataSniffed["init-date"]) {
      return {
        message: "Rango de Fecha es invalido",
        isValid: false,
      };
    }
  }

  if (dataSniffed["final-day"] && !dataSniffed["init-date"]) {
    return {
      message: `Para buscar por fecha, debe ingresar también "Fecha desde"`,
      isValid: false,
    };
  }

  if (!dataSniffed["final-day"] && dataSniffed["init-date"]) {
    return {
      message: `Para buscar por fecha, debe ingresar también "Fecha hasta"`,
      isValid: false,
    };
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
    return {
      message: "Para buscar por tipo, debe ingresar también otro campo",
      isValid: false,
    };
  }

  if (!result.success) {
    return {
      message: `Algo salio mal: ${result.error.format()}`,
      isValid: false,
    };
  }
  return { message: "", isValid: true };
};
export default validation;
