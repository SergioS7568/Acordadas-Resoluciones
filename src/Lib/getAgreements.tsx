const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_ACORDADAS;

export interface DataType {
  number: string | null;
  "init-date": Date | null;
  "final-day": Date | null;
  text: string | null;
  type: string | null;
}

export const getUsersInfoFilter = async (queryKey: [dataForms: DataType]) => {
  const [dataUnfiltered] = queryKey;
  console.log("values   ", dataUnfiltered);
  console.log("url   ", BACKEND_URL);

  // const urlAcordadas = `${BACKEND_URL}`;

  // console.log("urlAcordadas    ", urlAcordadas);

  // const resultado = await fetch(urlAcordadas);

  // if (!resultado.ok) {
  //   throw new Error("An error happened when fetching new data ");
  // }

  // const data = await resultado.json();

  const data = "something Happened";

  return data;
};

export default getUsersInfoFilter;
