import { useQuery } from "@tanstack/react-query";
import { useDataType } from "../../../store";
import { DataType } from "../Filters/Filters";

import getUsersInfoFilter from "../../../Lib/getAgreements";
import { useState } from "react";
import Modal from "../Modal/Modal";

import PageNavigationButtonsBottom from "../../PageNavigationButtons/PageNavigationButtonsBottom";
import Cards from "../Cards/Cards";
import CustomButton from "../../Buttons/CustomButton";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const storedData = useDataType((state) => state.data);

  const newPageSize = useDataType((state) => state.pageSize);
  const UpdatePageSize = useDataType((state) => state.updatePageSize);

  const setQueryIndex = useDataType((state) => state.updateQueryIndex);

  const setPageIndex = useDataType((state) => state.updatePageIndex);
  const indexPage = useDataType((state) => state.pageIndex);

  const setIDSearch = useDataType((state) => state.updateAgreementID);

  const setIdList = useDataType((state) => state.updateIdList);

  const {
    data: ApiUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [storedData, newPageSize, indexPage],
    queryFn: (context) => {
      const queryKey = context.queryKey as [DataType, number, number];
      if (
        !storedData ||
        (!storedData.number &&
          !storedData.text &&
          !storedData["final-day"] &&
          !storedData["init-date"]) ||
        (!storedData["final-day"] && storedData["init-date"]) ||
        (storedData["final-day"] && !storedData["init-date"])
      ) {
        return Promise.resolve(null);
      }
      return getUsersInfoFilter(queryKey);
    },
  });

  const handleUpdatePageSize = (text: string) => {
    UpdatePageSize(parseInt(text));
    setPageIndex(0);
  };

  const HandleButtonPress = (id: number, index: number) => {
    setQueryIndex(index);

    setIDSearch(id);

    const selectID = ApiUser?.agreementsFormat.map(({ id }) => id);
    if (selectID) {
      setIdList(selectID);
    }

    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4">
      {!ApiUser || isLoading || isError ? (
        <div>
          {" "}
          <div className=" flex flex-row bg-lightCyanShift-0 dark:bg-inherit dark:outline dark:outline-cyan-700 mt-2 mb-2 rounded-lg p-2 ">
            <span className="mr-1">
              <CustomButton imageName="info" />
            </span>
            <p>
              Bienvenido a la consulta de resoluciones y acordadas. Para buscar,
              por favor ingrese datos en, al menos, un filtro de búsqueda arriba
              de este mensaje. Paso siguiente, dé click al botón BUSCAR.
            </p>
          </div>
          <div className="flex flex-row bg-lightCyanShift-0 dark:bg-inherit dark:outline dark:outline-cyan-700 mt-2 mb-2 rounded-lg p-2 ">
            <span className="mr-1">
              <CustomButton imageName="info" />
            </span>
            <div className="flex flex-col ">
              <span>
                {" "}
                Para realizar búsquedas por texto, tiene dos opciones:
              </span>
              <span>
                {" "}
                1. Utiliza comillas (" ") para buscar una coincidencia exacta de
                una cadena literal.
              </span>
              <span>
                {" "}
                2. Escriba palabras por separado (sin comillas) para buscar
                todas esas palabras en cualquier orden.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex flex-col ">
              <span className="loading loading-dots w-32 self-center text-lightBlueShift-0 "></span>
            </div>
          ) : isError ? (
            <p className="pl-3 rounded-lg  bg-red-100 text-darkGrayOption-0 min-h-16 text-start items-center flex flex-row gap-1 text-lg font-semibold ">
              <CustomButton imageName="error" />
              No se encontraron resultados para la búsqueda ingresada. Por
              favor, intente con otros valores.
            </p>
          ) : ApiUser?.contentFormat.max_size == 0 ? (
            <p
              className="pl-3 rounded-lg  bg-orange-100 
         min-h-16 text-start items-center flex flex-row gap-1 text-lg font-semibold text-darkGrayOption-0  "
            >
              <CustomButton imageName="warning" />
              No se encontraron resultados para la búsqueda ingresada. Por
              favor, intente con otros valores.
            </p>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row items-center md:justify-between mt-4">
                <p className="text-2xl">
                  Acordada(s)/Resolucion(es) encontrada(s):
                  {ApiUser?.contentFormat.max_size}
                </p>
                <div className="flex flex-row gap-4  items-center ml-auto   mt-4  md:mt-0 ">
                  <p className="text-lg">Mostrar</p>
                  <select
                    className="select outline bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit hover:bg-inherit overflow-scroll font-semibold"
                    id="Select-PageSize"
                    value={newPageSize}
                    onChange={(e) => {
                      handleUpdatePageSize(e.currentTarget.value);
                    }}
                  >
                    <option value="10" className="bg-inherit">
                      10
                    </option>
                    <option value="20" className="bg-inherit">
                      20
                    </option>
                    <option value="30" className="bg-inherit">
                      30
                    </option>
                  </select>
                </div>
              </div>
              <table className="max-sm:hidden max-md:hidden mt-4 pt-4  block...  table-fixed table w-full  rounded-md overflow-hidden pb-4">
                <thead>
                  <tr className="font-bold text-lg bg-darkgrayOption-0 dark:text-gray-50  ">
                    <td className="w-1/6 ">Número</td>
                    <td className="w-1/6">Fecha</td>
                    <td className="w-3/4 truncate overflow-hidden ">
                      Descripción
                    </td>
                    <td className="w-1/6">Tipo</td>
                    <td className="w-1/6">Acciones</td>
                  </tr>
                </thead>
                <tbody>
                  {ApiUser?.agreementsFormat.map((ApiResult, index: number) => {
                    return (
                      <tr
                        key={ApiResult.id}
                        onClick={() => HandleButtonPress(ApiResult.id, index)}
                        className="bg-white dark:bg-darkGrayOption-0 dark:text-gray-50 text-black"
                      >
                        <td className="w-1/6 ">
                          {ApiResult.agreement_number}/
                          {ApiResult.agreement_year}
                        </td>

                        <td className="w-1/6 ">
                          {ApiResult.agreement_date.toString()}
                        </td>
                        <td className="w-3/4 truncate overflow-hidden ">
                          {ApiResult.agreement_description}
                        </td>
                        <td className="w-1/6 ">
                          {ApiResult.type_agreement.description}
                        </td>

                        <td className="w-1/6 ">
                          <button
                            className="btn btn-circle btn-ghost"
                            onClick={() =>
                              HandleButtonPress(ApiResult.id, index)
                            }
                          >
                            <CustomButton imageName="eye" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Cards ApiUser={ApiUser} HandleButtonPress={HandleButtonPress} />
              <Modal isOpen={isOpen} toggleModal={toggleModal}></Modal>

              <PageNavigationButtonsBottom
                lastPageNumber={ApiUser?.contentFormat.max_page}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Table;
