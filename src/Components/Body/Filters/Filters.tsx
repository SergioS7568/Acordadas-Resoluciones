import { useForm } from "react-hook-form";

import validation from "../../../Lib/Validation";
import { useDataType } from "../../../store";
import "./Filters.css";
import { useState } from "react";
import CustomButtonAction from "../../Buttons/CustomButtonAction";
import CustomButton from "../../Buttons/CustomButton";
import Grid from "../../../Lib/Grid";
import ModalAlert from "../Modal/ModalAlert";

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

  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleOnSubmit = (data: DataType) => {
    const validationResult = validation({ dataSniffed: data });

    if (validationResult && !validationResult.isValid) {
      setErrorMessage(validationResult.message);
      setModalOpen(true);

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
            <input
              className="input outline  md:w-[20rem] bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit "
              id="Numero"
              {...register("number")}
              placeholder="Número"
            />
          </div>
          <div className=" flex  flex-row   gap-4">
            <div className=" text-sm font-medium  ">
              <input
                className="input outline   w-[20rem] bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit"
                type="date"
                id="init-date"
                {...register("init-date", { valueAsDate: true })}
                placeholder="dd/mm/yyyy”"
              />
            </div>
            <div className="    text-sm font-medium  ">
              <input
                className="input outline   w-[20rem] bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit "
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
              className="input outline  w-[41rem] bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit "
              id="Texto"
              type="text"
              {...register("text")}
              placeholder="Texto"
            />
          </div>
          <div className="flex flex-col  mt-5  text-sm font-medium relative  ">
            <div className="relative ">
              <input
                list="type-select-options"
                className=" input outline w-[20rem]  bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit"
                id="Tipo"
                typeof="string"
                placeholder="Tipos"
                {...register("type")}
              />{" "}
              {getValues("type") && getValues("type")?.trim() ? (
                <button
                  type="button"
                  className=" absolute right-10 top-4  "
                  onClick={handleClearType}
                >
                  <CustomButton imageName="xcircle" />
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
        <Grid container className="p-4 ">
          <Grid item xs={5} className="  flex justify-end">
            <CustomButtonAction
              action={"reset"}
              reset={reset}
              register={null}
            />
          </Grid>
          <Grid item xs={2} className=" flex justify-center "></Grid>
          <Grid item xs={5} className=" flex justify-start ">
            <CustomButtonAction
              action={"submit"}
              reset={null}
              register={register}
            />
          </Grid>
        </Grid>
      </form>

      <div className="block md:hidden  ">
        <div className="flex  justify-center">
          <button
            type="button"
            className="btn btn-ghost   min-w-80  input m-2    "
            onClick={() => setFormVisible(!isFormVisible)}
          >
            <span>Filtros de búsqueda</span>
            {isFormVisible ? (
              <CustomButton imageName="arrowUp" />
            ) : (
              <CustomButton imageName="arrowDown" />
            )}
          </button>
        </div>
        {isFormVisible && (
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className=" flex flex-col m-2 p-4  rounded shadow-md gap-4"
          >
            <input
              className="input outline w-full bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit"
              id="Numero"
              {...register("number")}
              placeholder="Número"
            />

            <input
              className="input outline w-full bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit"
              id="Texto"
              type="text"
              {...register("text")}
              placeholder="Texto"
            />

            <input
              className="input outline w-full bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit"
              type="date"
              id="init-date"
              {...register("init-date", { valueAsDate: true })}
              placeholder="dd/mm/yyyy"
            />

            <input
              className="input outline w-full bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit"
              type="date"
              id="final-day"
              {...register("final-day", { valueAsDate: true })}
              placeholder="dd/mm/yyyy"
            />
            <div className="relative">
              <input
                list="type-select-options"
                className="input outline w-full bg-transparent focus:bg-transparent   outline-darkgrayOption-0 outline-1    hover:text-inherit"
                id="Tipo"
                typeof="string"
                placeholder="Tipos"
                {...register("type")}
              />
              {getValues("type") && getValues("type")?.trim() ? (
                <button
                  type="button"
                  className="absolute right-10 top-4 text-gray-500"
                  onClick={handleClearType}
                >
                  <CustomButton imageName="xcircle" />
                </button>
              ) : null}
            </div>

            <datalist id="type-select-options">
              <option value="ACORDADA" />
              <option value="RESOLUCION" />
              <option value="RESOLUCION DE FERIA" />
            </datalist>

            <div className="flex flex-row  gap-4  ">
              <CustomButtonAction
                action={"reset"}
                reset={reset}
                register={null}
              />
              <CustomButtonAction
                action={"submit"}
                reset={null}
                register={register}
              />
            </div>
          </form>
        )}
      </div>
      {isModalOpen && (
        <ModalAlert error={errorMessage} toggleModal={toggleModal} />
      )}
    </>
  );
};

export default Filters;
