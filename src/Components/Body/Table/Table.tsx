import { useQuery } from "@tanstack/react-query";
import { useDataType } from "../../../store";
import { DataType } from "../Filters/Filters";

import getUsersInfoFilter, { getTextInfo } from "../../../Lib/getAgreements";
import { useState } from "react";
import Modal from "../Modal/Modal";
import { number } from "zod";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [idAgreement, setIdAgreement] = useState<number>();
  const storedData = useDataType((state) => state.data);

  const newPageSize = useDataType((state) => state.pageSize);
  const UpdatePageSize = useDataType((state) => state.updatePageSize);

  const {
    data: ApiUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [storedData, newPageSize],
    queryFn: (context) => {
      const queryKey = context.queryKey as [DataType, number];
      return getUsersInfoFilter(queryKey);
    },
  });

  const handleUpdatePageSize = (text: string) => {
    UpdatePageSize(parseInt(text));
  };

  const HandleButtonPress = (id: number, index: number) => {
    console.log(" el id es ", id);
    console.log("el index es ", index);
    setIdAgreement(id);
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex flex-col ">
          <span className="loading loading-dots w-32 self-center text-lightBlueShift-0 "></span>
        </div>
      ) : isError ? (
        <p className="pl-3 rounded-lg  bg-red-100 text-darkGrayOption-0 min-h-16 text-start items-center flex flex-row gap-1 text-lg font-semibold ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          No se encontraron resultados para la búsqueda ingresada. Por favor,
          intente con otros valores.
        </p>
      ) : ApiUser?.contentFormat.max_size == 0 ? (
        <p
          className="pl-3 rounded-lg  bg-orange-100 
         min-h-16 text-start items-center flex flex-row gap-1 text-lg font-semibold text-darkGrayOption-0  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-16 md:size-8  text-orange-600 sm:self-center  "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          No se encontraron resultados para la búsqueda ingresada. Por favor,
          intente con otros valores.
        </p>
      ) : (
        <div>
          <p>
            Acordada(s)/Resolucion(es) encontrada(s):
            {ApiUser?.contentFormat.max_size}
          </p>

          <select
            className="select outline"
            id="Select-PageSize"
            onChange={(e) => {
              handleUpdatePageSize(e.currentTarget.value);
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <p>{newPageSize}</p>
          <table>
            <thead>
              <tr>
                <td>Número</td>
                <td>Fecha</td>
                <td>Descripción</td>
                <td>Tipo</td>
                <td>Acciones</td>
              </tr>
            </thead>
            <tbody>
              {ApiUser?.agreementsFormat.map((ApiResult, index: number) => {
                return (
                  <tr key={ApiResult.id}>
                    <td>{ApiResult.agreement_number}</td>
                    <td>{ApiResult.agreement_date.toString()}</td>
                    <td>{ApiResult.agreement_description}</td>

                    <td>{ApiResult.agreement_year}</td>
                    <td>
                      <button
                        className="btn btn-circle"
                        onClick={() => HandleButtonPress(ApiResult.id, index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isOpen} toggleModal={toggleModal} id={idAgreement}></Modal>
    </div>
  );
};
export default Table;
