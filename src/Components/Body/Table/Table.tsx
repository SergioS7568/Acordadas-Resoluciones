import { useQuery } from "@tanstack/react-query";
import { useDataType } from "../../../store";
import { DataType } from "../Filters/Filters";

import getUsersInfoFilter from "../../../Lib/getAgreements";

const Table = () => {
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
    // console.log("text  ", text);
    UpdatePageSize(parseInt(text));
  };

  const HandleButtonPress = (id: number, index: number) => {
    console.log(" el id es ", id);
    console.log("el index es ", index);
  };

  return (
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
  );
};
export default Table;
