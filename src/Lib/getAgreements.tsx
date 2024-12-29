import dayjs from "dayjs";
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
  queryKey: [dataForms: DataType, pageSize: number, pageIndex: number]
) => {
  const [dataUnfiltered, pageSize, pageIndex] = queryKey;

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
  };

  // const changeNumberFormatDayjs = (text: string | null) => {
  //   console.log("text    ", text);
  //   const fowardSlash = text?.split("/");
  //   if (fowardSlash) {
  //     const year1 = parseInt(fowardSlash[0]);

  //     const year2 = dayjs(year1, "YY").format("YYYY");
  //     console.log("year  1  ----", year1);
  //     console.log("year  2  ----", year2);
  //   }

  //   if (fowardSlash && fowardSlash[0].trim().length == 2) {
  //     const fullyear = dayjs(fowardSlash[0], "YY").format("YYYY");
  //     console.log("fowardSlash    ", fowardSlash[0]);
  //     console.log("fullyear", fullyear);
  //     return fullyear;
  //   }

  //   if (fowardSlash && fowardSlash[0].trim().length == 4) {
  //     const fullyear = dayjs(fowardSlash[0], "YYYY").format("YYYY");
  //     console.log("fowardSlash    ", fowardSlash[0]);
  //     console.log("fullyear", fullyear);
  //     return fullyear;
  //   }
  // };

  const changeNumberFormatDayjs = (text: string | null) => {
    console.log("text    ", text);
    if (!text) return null;

    const fowardSlash = text.split("/");

    if (fowardSlash && fowardSlash[0]) {
      const yearPart = fowardSlash[0].trim();

      if (yearPart.length === 2) {
        const currentYear = dayjs().year();
        const currentYearLastTwoDigits = currentYear.toString().slice(2);

        const yearPrefix =
          parseInt(yearPart) <= parseInt(currentYearLastTwoDigits)
            ? "20"
            : "19";

        const fullYear = yearPrefix + yearPart;

        return fullYear;
      }

      if (yearPart.length === 4) {
        console.log("fullYear (already 4 digits):", yearPart);
        return yearPart;
      }
    }

    return null;
  };
  const changeDateFormatDayjs = (
    innitDate: Date | null,
    finalDate: Date | null
  ) => {
    if (innitDate && innitDate.toString().trim()) {
      if (finalDate && finalDate.toString().trim()) {
        const formattedInnitDate = dayjs(innitDate).format("YYYY-MM-DD");
        const formattdFinalDate = dayjs(finalDate).format("YYYY-MM-DD");
        return { formattedInnitDate, formattdFinalDate };
      }
    }
  };

  let filterSearch = "";
  if (pageSize && pageSize > 0) {
    filterSearch += `size=${pageSize}&index=${pageIndex}`;

    if (
      dataUnfiltered["init-date"] &&
      dataUnfiltered["init-date"].toString().trim()
    ) {
      if (
        dataUnfiltered["final-day"] &&
        dataUnfiltered["final-day"].toString().trim()
      ) {
        const dayFormmated = changeDateFormatDayjs(
          dataUnfiltered["init-date"],
          dataUnfiltered["final-day"]
        );

        filterSearch += `&init-date=greaterOrEquals>${dayFormmated?.formattedInnitDate}&final-day=lessOrEquals>${dayFormmated?.formattdFinalDate}`;
      }
    }

    if (dataUnfiltered.number && dataUnfiltered.number?.trim()) {
      // &number=equals>1&year=equals>2020
      const numberValuePage = dataUnfiltered.number.split("/");

      filterSearch += `&number=equals>${numberValuePage[0]}`;

      if (numberValuePage[1] && numberValuePage[1].toString().trim()) {
        // const formattedYear = changeNumberFormat(numberValuePage[1]);
        const formattedYear = changeNumberFormatDayjs(numberValuePage[1]);
        console.log("formattedYear    ", formattedYear);
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

    const resultado = await fetch(urlAcordadas);

    if (!resultado.ok) {
      throw new Error("An error happened when fetching new data ");
    }

    const data = await resultado.json();

    const newData = agreementsFormatConversion(data.data);

    return newData;
  }
};
export default getUsersInfoFilter;

export const getTextInfo = async (queryKey: [id: number]) => {
  const [id] = queryKey;

  const urlAcordadas = `${BACKEND_URL_ID}${id}`;

  const resultado = await fetch(urlAcordadas);

  if (!resultado.ok) {
    throw new Error("An error happened when fetching new data ");
  }

  const data = await resultado.json();

  const newData = agreementDetailFormatConversion(data.data);

  return newData;
};
