import { UseFormRegister, UseFormReset } from "react-hook-form";
import { DataType } from "../../Lib/getAgreements";

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
            <button type="submit" className="btn btn-circle bg-blue-600  ">
              BUSCAR
            </button>
          </div>
        );
      }

      break;
    case "reset": {
      return (
        <div>
          <button className="btn btn-circle bg-red-600" onClick={handelReset}>
            LIMPIAR
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
