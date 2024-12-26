import { useForm } from "react-hook-form";

import CustomButton from "../../Buttons/CustomButton";
import validation from "../../../Lib/validation";
import { useDataType } from "../../../store";

export interface DataType {
  number: string | null;
  "init-date": Date | null;
  "final-day": Date | null;
  text: string | null;
  type: string | null;
}

const Filters = () => {
  const { register, handleSubmit, reset } = useForm<DataType>({
    defaultValues: {
      number: null,
      "init-date": null,
      "final-day": null,
      text: null,
      type: null,
    },
  });

  const UpdateDataStored = useDataType((state) => state.updateData);

  const handleOnSubmit = (data: DataType) => {
    const isValid = validation({ dataSniffed: data });
    if (!isValid) {
      return;
    }

    UpdateDataStored(data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className=" flex flex-col md:flex-row justify-center items-center gap-4 ">
        <div className="flex flex-col    text-sm font-medium  ">
          <label>numero</label>
          <input
            className="input outline w-96 md:w-60 "
            id="Numero"
            {...register("number")}
            placeholder="Número"
          />
        </div>
        <div className=" flex flex-row gap-4">
          <div className="flex flex-col    text-sm font-medium  ">
            <label>Fecha Inicial</label>
            <input
              className="input outline   w-60"
              type="date"
              id="init-date"
              {...register("init-date", { valueAsDate: true })}
              placeholder="dd/mm/yyyy”"
            />
          </div>
          <div className="flex flex-col    text-sm font-medium  ">
            <label>Fecha Final</label>
            <input
              className="input outline   w-60 "
              type="date"
              id="final-day"
              {...register("final-day", { valueAsDate: true })}
              placeholder="dd/mm/yyyy”"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-center gap-4">
        <div className="flex flex-col    text-sm font-medium  ">
          <label>Texto</label>
          <input
            className="input outline  w-60 "
            id="Texto"
            type="text"
            {...register("text")}
            placeholder="Texto"
          />
        </div>
        <div className="flex flex-col    text-sm font-medium  ">
          <label>Tipo</label>
          <input
            list="type-select-options"
            className="select outline w-60"
            id="Tipo"
            typeof="string"
            placeholder="Tipo"
            {...register("type")}
          />
          <datalist id="type-select-options">
            <option value="ACORDADA" />
            <option value="RESOLUCION" />
            <option value="RESOLUCION DE FERIA" />
          </datalist>
        </div>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <CustomButton action={"submit"} reset={null} register={register} />
        <CustomButton action={"reset"} reset={reset} register={null} />
      </div>
    </form>
  );
};
export default Filters;
