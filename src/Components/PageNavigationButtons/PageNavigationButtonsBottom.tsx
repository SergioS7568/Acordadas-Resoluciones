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
    console.log(currentIndex);
  };

  return (
    <div>
      {!(currentIndex == 0) ? (
        <button
          className="btn btn-circle "
          onClick={() => handleUpdateIndex(0)}
        >
          <CustomButton imageName="doubleArrowLeft" />
        </button>
      ) : (
        <button className="btn btn-circle disabled bg-red-300 ">
          <CustomButton imageName="doubleArrowLeft" />
        </button>
      )}
      {currentIndex == 0 ? (
        <button className="btn btn-circle">
          {" "}
          <CustomButton imageName="arrowLeft" />
        </button>
      ) : (
        <button
          className="btn btn-circle"
          onClick={() => handleUpdateIndex(currentIndex - 1)}
        >
          {" "}
          <CustomButton imageName="arrowLeft" />
        </button>
      )}
      {!lastPageNumber || currentIndex == lastPageNumber - 1 ? (
        <button className="btn btn-circle disabled">
          {" "}
          <CustomButton imageName="arrowRight" />
        </button>
      ) : (
        <button
          className="btn btn-circle"
          onClick={() => handleUpdateIndex(currentIndex + 1)}
        >
          {" "}
          <CustomButton imageName="arrowRight" />
        </button>
      )}

      {!lastPageNumber || currentIndex == lastPageNumber - 1 ? (
        <button className="btn btn-circle disabled  bg-red-300">
          <CustomButton imageName="doubleArrowRight" />
        </button>
      ) : (
        <button
          className="btn btn-circle "
          onClick={() => handleUpdateIndex(lastPageNumber - 1)}
        >
          {" "}
          <CustomButton imageName="doubleArrowRight" />
        </button>
      )}
    </div>
  );
};
export default PageNavigationButtonsBottom;
