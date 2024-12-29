import { useForm } from "react-hook-form";

import validation from "../../../Lib/Validation";
import { useDataType } from "../../../store";
import "./Filters.css";
import { useState } from "react";
import CustomButtonAction from "../../Buttons/CustomButtonAction";

export interface DataType {
  number: string | null;
  "init-date": Date | null;
  "final-day": Date | null;
  text: string | null;
  type: string | null;
}

const Filters = () => {
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm<DataType>({
      defaultValues: {
        number: null,
        "init-date": null,
        "final-day": null,
        text: null,
        type: null,
      },
    });

  const UpdateDataStored = useDataType((state) => state.updateData);
  const setPageIndex = useDataType((state) => state.updatePageIndex);
  const [isFormVisible, setFormVisible] = useState(false);

  const handleOnSubmit = (data: DataType) => {
    const isValid = validation({ dataSniffed: data });
    if (!isValid) {
      return;
    }
    setPageIndex(0);
    UpdateDataStored(data);
  };

  const handleClearType = () => {
    watch("type");
    setValue("type", null);
  };
  watch("type");
  return (
    <>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="max-sm:hidden max-md:hidden block..."
      >
        <div className="  flex flex-col lg:flex-row justify-center items-center gap-4 ">
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
          <div className="flex flex-col    text-sm font-medium relative  ">
            <label>Tipo</label>
            <div className="relative ">
              <input
                list="type-select-options"
                className=" input outline w-60 "
                id="Tipo"
                typeof="string"
                placeholder="Tipos"
                {...register("type")}
              />{" "}
              {getValues("type") && getValues("type")?.trim() ? (
                <button
                  type="button"
                  className=" absolute right-10 top-3   text-gray-500"
                  onClick={handleClearType}
                >
                  ✕
                </button>
              ) : (
                <button
                  type="button"
                  className="  disabled absolute right-10 top-3  text-gray-500"
                ></button>
              )}
            </div>
            <datalist id="type-select-options">
              <option value="ACORDADA" />
              <option value="RESOLUCION" />
              <option value="RESOLUCION DE FERIA" />
            </datalist>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <CustomButtonAction
            action={"submit"}
            reset={null}
            register={register}
          />
          <CustomButtonAction action={"reset"} reset={reset} register={null} />
        </div>
      </form>

      <div className="block md:hidden  ">
        <div className="flex col justify-center">
          <button
            type="button"
            className="btn  outline input m-2  "
            onClick={() => setFormVisible(!isFormVisible)}
          >
            {isFormVisible ? " Filtros de búsqueda X" : "Filtros de búsqueda O"}
          </button>
        </div>
        {isFormVisible && (
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className=" flex flex-col m-2 p-4  rounded shadow-md gap-4"
          >
            <input
              className="input outline w-full"
              id="Numero"
              {...register("number")}
              placeholder="Número"
            />

            <input
              className="input outline w-full"
              id="Texto"
              type="text"
              {...register("text")}
              placeholder="Texto"
            />

            <input
              className="input outline w-full"
              type="date"
              id="init-date"
              {...register("init-date", { valueAsDate: true })}
              placeholder="dd/mm/yyyy"
            />

            <input
              className="input outline w-full"
              type="date"
              id="final-day"
              {...register("final-day", { valueAsDate: true })}
              placeholder="dd/mm/yyyy"
            />
            <div className="relative">
              <input
                list="type-select-options"
                className="input outline w-full"
                id="Tipo"
                typeof="string"
                placeholder="Tipos"
                {...register("type")}
              />
              {getValues("type") && getValues("type")?.trim() ? (
                <button
                  type="button"
                  className="absolute right-10 top-3 text-gray-500"
                  onClick={handleClearType}
                >
                  ✕
                </button>
              ) : null}
            </div>

            <datalist id="type-select-options">
              <option value="ACORDADA" />
              <option value="RESOLUCION" />
              <option value="RESOLUCION DE FERIA" />
            </datalist>

            <div className="flex flex-row justify-center gap-4">
              <CustomButtonAction
                action={"submit"}
                reset={null}
                register={register}
              />
              <CustomButtonAction
                action={"reset"}
                reset={reset}
                register={null}
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Filters;
