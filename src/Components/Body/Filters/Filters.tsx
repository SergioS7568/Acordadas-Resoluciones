import { useForm } from "react-hook-form";

import CustomButton from "../../Buttons/CustomButton";
import Validation from "../../../Lib/Validation";

export interface DataType {
  number: string | null;
  "init-date": Date | null;
  "final-day": Date | null;
  text: string | null;
  type: string | null;
}

const Filters = () => {
  const today = new Date();

  const { register, handleSubmit, reset } = useForm<DataType>({
    defaultValues: {
      number: null,
      "init-date": null,
      "final-day": null,
      text: null,
      type: null,
    },
  });

  const handleOnSubmit = (data: DataType) => {
    const isValid = Validation({ dataSniffed: data });
    if (!isValid) {
      console.log("erronous data :", data);
      return;
    }
    console.log("data submitted :", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <input id="Numero" {...register("number")} placeholder="Número"></input>
        <input
          type="date"
          id="init-date"
          {...register("init-date", { valueAsDate: true })}
          placeholder="dd/mm/yyyy”"
        ></input>
        <input
          type="date"
          id="final-day"
          {...register("final-day", { valueAsDate: true })}
          placeholder="dd/mm/yyyy”"
        ></input>
        <input
          id="Texto"
          type="text"
          {...register("text")}
          placeholder="Texto"
        ></input>
        <select id="Tipo" typeof="string" {...register("type")}>
          <option disabled hidden value={""}>
            Tipo
          </option>
          <option value={"ACORDADA"}>ACORDADA</option>
          <option value={"RESOLUCION"}>RESOLUCION</option>
          <option value={"RESOLUCION DE FERIA"}>RESOLUCION DE FERIA</option>
        </select>
        <div>
          <CustomButton action={"submit"} reset={null} register={register} />
          <CustomButton action={"reset"} reset={reset} register={null} />
        </div>
      </form>
    </div>
  );
};
export default Filters;
