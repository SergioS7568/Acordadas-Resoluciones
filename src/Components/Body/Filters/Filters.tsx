import { useForm } from "react-hook-form";

import CustomButton from "../../Buttons/CustomButton";
import validation from "../../../Lib/Validation";

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
    const isValid = validation({ dataSniffed: data });
    if (!isValid) {
      return;
    }
    console.log("data submitted :", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div className=" flex flex-col md:flex-row justify-center items-center gap-4 ">
          <div className="flex flex-col    text-sm font-medium  ">
            <span>numero</span>
            <input
              className="input outline w-96 md:w-60 "
              id="Numero"
              {...register("number")}
              placeholder="Número"
            ></input>
          </div>
          <div className=" flex flex-row gap-4">
            <div className="flex flex-col    text-sm font-medium  ">
              <span>Fecha Inicial</span>
              <input
                className="input outline   w-60"
                type="date"
                id="init-date"
                {...register("init-date", { valueAsDate: true })}
                placeholder="dd/mm/yyyy”"
              ></input>
            </div>
            <div className="flex flex-col    text-sm font-medium  ">
              <span>Fecha Final</span>
              <input
                className="input outline   w-60 "
                type="date"
                id="final-day"
                {...register("final-day", { valueAsDate: true })}
                placeholder="dd/mm/yyyy”"
              ></input>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center gap-4">
          <div className="flex flex-col    text-sm font-medium  ">
            <span>Texto</span>
            <input
              className="input outline  w-60 "
              id="Texto"
              type="text"
              {...register("text")}
              placeholder="Texto"
            ></input>
          </div>
          <div className="flex flex-col    text-sm font-medium  ">
            <span>Tipo</span>
            <select
              className="select outline  w-60"
              id="Tipo"
              typeof="string"
              {...register("type")}
            >
              <option disabled hidden value={""}>
                Tipo
              </option>
              <option value={"ACORDADA"}>ACORDADA</option>
              <option value={"RESOLUCION"}>RESOLUCION</option>
              <option value={"RESOLUCION DE FERIA"}>RESOLUCION DE FERIA</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <CustomButton action={"submit"} reset={null} register={register} />
          <CustomButton action={"reset"} reset={reset} register={null} />
        </div>
      </form>
    </div>
  );
};
export default Filters;
