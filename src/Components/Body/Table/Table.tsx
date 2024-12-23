import { useQuery } from "@tanstack/react-query";
import { useDataType } from "../../../store";
import { DataType } from "../Filters/Filters";

import getUsersInfoFilter from "../../../Lib/getAgreements";

const Table = () => {
  const storedData = useDataType((state) => state.data);

  const {
    data: ApiUser,
    isError,
    isLoading,
  } = useQuery({
    queryKey: [storedData],
    queryFn: (context) => {
      const queryKey = context.queryKey as [DataType];
      return getUsersInfoFilter(queryKey);
    },
  });

  return (
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
        <tr>
          <td>1</td>
          <td>2</td>
          <td>
            {storedData.text} {ApiUser}
          </td>
          <td>4</td>
          <td>5</td>
        </tr>
      </tbody>
    </table>
  );
};
export default Table;
