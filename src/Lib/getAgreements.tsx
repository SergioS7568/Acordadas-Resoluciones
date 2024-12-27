import { agreementDetailFormatConversion } from "./agreementDetailFormatConversion";
import { agreementsFormatConversion } from "./agreementsFormatConversion";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_ACORDADAS;

// const BACKEND_URL_ID = import.meta.env.VITE_BACKEND_URL_ACORDADAS_ID;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_REALDEAL_ACORDADAS;
const BACKEND_URL_ID = import.meta.env.VITE_BACKEND_URL_REALDEAL_ACORDADAS_ID;

export interface DataType {
  number: string | null;
  "init-date": Date | null;
  "final-day": Date | null;
  text: string | null;
  type: string | null;
}

export const getUsersInfoFilter = async (
  queryKey: [dataForms: DataType, pageSize: number]
) => {
  const [dataUnfiltered, pageSize] = queryKey;

  const dateAll = new Date();
  const year = dateAll.getFullYear();
  const yearwithoutTwoDigit = year.toString().substring(2);
  const yearwithoutThreeDigit = year.toString().substring(1);

  const changeNumberFormat = (text: string | null) => {
    let wantedNumber = "";
    const fowardSlash = text?.split("/");

    if (fowardSlash && fowardSlash[0].trim().length == 2) {
      if (
        parseFloat(fowardSlash[0]) &&
        parseFloat(fowardSlash[0]) <= parseFloat(yearwithoutTwoDigit)
      ) {
        wantedNumber += `20${fowardSlash[0]}`;
      } else {
        wantedNumber += `19${fowardSlash[0]}`;
      }

      return wantedNumber;
    }

    if (fowardSlash && fowardSlash[0].trim().length == 3) {
      if (
        parseFloat(fowardSlash[0]) &&
        parseFloat(fowardSlash[0]) <= parseFloat(yearwithoutThreeDigit)
      ) {
        wantedNumber += `2${fowardSlash[0]}`;
      } else {
        wantedNumber += `1${fowardSlash[0]}`;
      }
      return wantedNumber;
    }
    if (fowardSlash && fowardSlash[0].toString().trim().length == 4) {
      wantedNumber += `${fowardSlash[0]}`;
      return wantedNumber;
    }
  };

  let filterSearch = "";
  if (pageSize && pageSize > 0) {
    filterSearch += `size=${pageSize}&index=0`;
    if (
      dataUnfiltered["final-day"] &&
      dataUnfiltered["final-day"].toString().trim()
    ) {
      const formattedDateFinal = `${dataUnfiltered[
        "final-day"
      ]?.getFullYear()}-${(dataUnfiltered["final-day"]?.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dataUnfiltered["final-day"]
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;

      filterSearch += `&final-day=lessOrEquals>${formattedDateFinal}`;
    }
  }
  if (
    dataUnfiltered["init-date"] &&
    dataUnfiltered["init-date"].toString().trim()
  ) {
    {
      const formattedDateInit = `${dataUnfiltered[
        "init-date"
      ]?.getFullYear()}-${(dataUnfiltered["init-date"]?.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dataUnfiltered["init-date"]
        ?.getDate()
        .toString()
        .padStart(2, "0")}`;
      filterSearch += `&init-date=greaterOrEquals>${formattedDateInit}`;
    }
  }

  if (dataUnfiltered.number && dataUnfiltered.number?.trim()) {
    // &number=equals>1&year=equals>2020
    const numberValuePage = dataUnfiltered.number.split("/");

    filterSearch += `&number=equals>${numberValuePage[0]}`;

    if (numberValuePage[1] && numberValuePage[1].toString().trim()) {
      const formattedYear = changeNumberFormat(numberValuePage[1]);
      filterSearch += `&year=equals>${formattedYear}`;
    }
  }
  if (dataUnfiltered.text && dataUnfiltered.text?.trim()) {
    filterSearch += `&text=contains>${dataUnfiltered.text}`;
  }
  if (dataUnfiltered.type && dataUnfiltered.type?.trim()) {
    if (dataUnfiltered.type == "ACORDADA") {
      filterSearch += `&type=equals>A`;
    }
    if (dataUnfiltered.type == "RESOLUCION") {
      filterSearch += `&type=equals>R`;
    }
    if (dataUnfiltered.type == "RESOLUCION DE FERIA") {
      filterSearch += `&type=equals>RF`;
    }
  }

  const urlAcordadas = `${BACKEND_URL}${filterSearch.toString()}`;
  console.log("urlAcordadas   ", urlAcordadas);

  const resultado = await fetch(urlAcordadas);

  if (!resultado.ok) {
    throw new Error("An error happened when fetching new data ");
  }

  const data = await resultado.json();

  const newData = agreementsFormatConversion(data.data);

  return newData;
};

export default getUsersInfoFilter;

export const getTextInfo = async (queryKey: [id: number]) => {
  const [id] = queryKey;

  const urlAcordadas = `${BACKEND_URL_ID}${id}`;
  console.log("urlAcordadas   descripcion ", urlAcordadas);

  const resultado = await fetch(urlAcordadas);

  if (!resultado.ok) {
    throw new Error("An error happened when fetching new data ");
  }

  const data = await resultado.json();

  const newData = agreementDetailFormatConversion(data.data);

  return newData;
};
