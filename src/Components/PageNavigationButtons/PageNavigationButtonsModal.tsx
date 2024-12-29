import { useDataType } from "../../store";
import CustomButton from "../Buttons/CustomButton";

const PageNavigationButtonsModal = () => {
  const currentIndex = useDataType((state) => state.queryIndex);
  const setQueryIndex = useDataType((state) => state.updateQueryIndex);

  const currentID = useDataType((state) => state.agreementID);
  const setIDSearch = useDataType((state) => state.updateAgreementID);

  const currentIdList = useDataType((state) => state.agreementIDList);

  const handleIdSelection = (position: number) => {
    setQueryIndex(position);
    setIDSearch(currentIdList[position]);
  };

  return (
    <div className="flex flex-row justify-between">
      <div>
        <div className="max-sm:hidden max-md:hidden">
          <button className="btn btn-square outline">Imprimir</button>{" "}
          <button className="btn btn-square outline"> Compartir</button>{" "}
        </div>

        <div className="dropdown dropdown-top block md:hidden lg:hidden m-2">
          <div tabIndex={0} role="button" className="btn m-1">
            ---
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <a>Imprimir</a>
            </li>
            <li>
              <a>Compartir</a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        {currentIdList.length < currentIdList[currentIndex] &&
        !(currentIndex == 0) &&
        currentID ? (
          <button
            className="btn btn-circle"
            onClick={() => handleIdSelection(currentIndex - 1)}
          >
            <CustomButton imageName="arrowLeft" />
          </button>
        ) : (
          <button className="btn btn-circle disabled bg-red-400">
            <CustomButton imageName="arrowLeft" />
          </button>
        )}
        {currentIndex >= 0 &&
        !(currentIndex + 1 == currentIdList.length) &&
        currentID ? (
          <button
            className="btn btn-circle"
            onClick={() => handleIdSelection(currentIndex + 1)}
          >
            <CustomButton imageName="arrowRight" />
          </button>
        ) : (
          <button className="btn btn-circle disabled bg-red-400">
            <CustomButton imageName="arrowRight" />
          </button>
        )}
      </div>
    </div>
  );
};
export default PageNavigationButtonsModal;
