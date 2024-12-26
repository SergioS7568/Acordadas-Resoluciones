import { agreementsFormatConversion } from "./agreementsFormatConversion";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_ACORDADAS;

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

  const formattedDateFinal = `${dataUnfiltered["final-day"]?.getFullYear()}-${(
    dataUnfiltered["final-day"]?.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dataUnfiltered["final-day"]
    ?.getDate()
    .toString()
    .padStart(2, "0")}`;

  const formattedDateInit = `${dataUnfiltered["init-date"]?.getFullYear()}-${(
    dataUnfiltered["init-date"]?.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dataUnfiltered["init-date"]
    ?.getDate()
    .toString()
    .padStart(2, "0")}`;

  let filterSearch = "";
  if (pageSize && pageSize > 0) {
    filterSearch += `?size=${pageSize}&index=0`;
    if (
      dataUnfiltered["final-day"] &&
      dataUnfiltered["final-day"].toString().trim()
    )
      filterSearch += `&final-day=lessOrEquals>${formattedDateFinal}`;
  }
  if (
    dataUnfiltered["init-date"] &&
    dataUnfiltered["init-date"].toString().trim()
  ) {
    filterSearch += `&init-date=greaterOrEquals>${formattedDateInit}`;
  }

  if (dataUnfiltered.number && dataUnfiltered.number?.trim()) {
    filterSearch += `&number=equals>${dataUnfiltered.number}`;
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
  console.log("filterSearch    ", filterSearch.toString());

  const urlAcordadas = `${BACKEND_URL}`;

  const resultado = await fetch(urlAcordadas);

  if (!resultado.ok) {
    throw new Error("An error happened when fetching new data ");
  }

  const data = await resultado.json();

  const newData = agreementsFormatConversion(data.data);

  return newData;
};

export default getUsersInfoFilter;
