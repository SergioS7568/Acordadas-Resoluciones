import { useDataType } from "../../store";
import CustomButton from "../Buttons/CustomButton";

interface Props {
  lastPageNumber: number | undefined;
}

const PageNavigationButtonsBottom = (props: Props) => {
  const { lastPageNumber } = props;

  const newPageIndex = useDataType((state) => state.updatePageIndex);
  const currentIndex = useDataType((state) => state.pageIndex);

  const handleUpdateIndex = (index: number) => {
    newPageIndex(index);
  };

  return (
    <div className="flex flex-row justify-between mt-4 mb-2">
      <div className="flex flex-row gap-2">
        {!(currentIndex == 0) ? (
          <button
            className="btn btn-circle outline  btn-ghost"
            onClick={() => handleUpdateIndex(0)}
          >
            <CustomButton imageName="doubleArrowLeft" />
          </button>
        ) : (
          <button className="btn btn-circle  disabled btn-ghost   ">
            <CustomButton imageName="doubleArrowLeft" />
          </button>
        )}
        {currentIndex == 0 ? (
          <button className="btn btn-circle  min-w-28 md:min-w-52 btn-ghost disabled ">
            <span>Anterior</span>
            <CustomButton imageName="arrowLeft" />
          </button>
        ) : (
          <button
            className="btn btn-circle min-w-28  md:min-w-52 btn-ghost outline"
            onClick={() => handleUpdateIndex(currentIndex - 1)}
          >
            <span>Anterior</span>
            <CustomButton imageName="arrowLeft" />
          </button>
        )}
      </div>
      <div className="flex flex-row gap-2">
        {!lastPageNumber || currentIndex == lastPageNumber - 1 ? (
          <button className="btn btn-circle btn-ghost min-w-28   disabled md:min-w-52 ">
            <span>Siguiente</span>
            <CustomButton imageName="arrowRight" />
          </button>
        ) : (
          <button
            className="btn btn-circle min-w-28  md:min-w-52  btn-ghost outline "
            onClick={() => handleUpdateIndex(currentIndex + 1)}
          >
            {" "}
            <span>Siguiente</span>
            <CustomButton imageName="arrowRight" />
          </button>
        )}

        {!lastPageNumber || currentIndex == lastPageNumber - 1 ? (
          <button className="btn btn-circle   disabled btn-ghost  ">
            <CustomButton imageName="doubleArrowRight" />
          </button>
        ) : (
          <button
            className="btn btn-circle   btn-ghost outline "
            onClick={() => handleUpdateIndex(lastPageNumber - 1)}
          >
            {" "}
            <CustomButton imageName="doubleArrowRight" />
          </button>
        )}
      </div>
    </div>
  );
};
export default PageNavigationButtonsBottom;
