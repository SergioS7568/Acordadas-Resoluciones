import { useEffect } from "react";
import CustomButton from "../../Buttons/CustomButton";

interface Props {
  error: string;
  toggleModal: () => void;
}

const ModalAlert = (props: Props) => {
  const { error, toggleModal } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      toggleModal();
    }, 10000);

    return () => clearTimeout(timer);
  }, [error, toggleModal]);
  console.log("error,  ", error);
  console.log("toggleModal,  ", toggleModal);
  return (
    <div className="fixed top-4 right-4 z-50 bg-red-300 p-4 w-56  shadow-lg flex items-center rounded-xl gap-2">
      <button
        onClick={toggleModal}
        className="text-red-600   outline btn-outline rounded-full outline-offset-2 outline-red-600"
      >
        <CustomButton imageName="xcircle" />
      </button>
      <span> {error}</span>
    </div>
  );
};
export default ModalAlert;
