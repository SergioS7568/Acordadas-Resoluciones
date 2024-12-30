import { UseFormRegister, UseFormReset } from "react-hook-form";
import { DataType } from "../../Lib/getAgreements";
import CustomButton from "./CustomButton";

interface Props {
  action: string;
  reset: UseFormReset<DataType> | null;
  register: UseFormRegister<DataType> | null;
}

export const CustomButtonAction = (props: Props) => {
  const { action, reset } = props;

  const handelReset = () => {
    if (reset) {
      reset();
    }
  };

  switch (action) {
    case "submit":
      {
        return (
          <div>
            <button
              type="submit"
              className="btn btn-circle bg-lightBlueShift-0 text-white  w-36  h-11 md:w-64 md:h-14"
            >
              BUSCAR
              <CustomButton imageName="glass"></CustomButton>
            </button>
          </div>
        );
      }

      break;
    case "reset": {
      return (
        <div>
          <button
            className="btn btn-circle bg-lightgrayOption-0 text-white w-36 h-11   md:w-64 md:h-14"
            onClick={handelReset}
          >
            <CustomButton imageName="trashCan"></CustomButton>LIMPIAR
          </button>
        </div>
      );
      break;
    }

    case "glass":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      );
  }
};
export default CustomButtonAction;
