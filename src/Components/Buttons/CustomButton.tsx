import { UseFormRegister, UseFormReset } from "react-hook-form";
import { DataType } from "../../Lib/getAgreements";

interface Props {
  action: string;
  reset: UseFormReset<DataType> | null;
  register: UseFormRegister<DataType> | null;
}

export const CustomButton = (props: Props) => {
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
            <button type="submit" className="btn btn-circle bg-blue-600">
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
    default:
      return <button>nothing inside</button>;
      break;
  }
};
export default CustomButton;
