import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import "./Modal.css";

import { getTextInfo } from "../../../Lib/getAgreements";
import highlight from "../../../Lib/highlight";
import rtfToDiv from "../../../Lib/rtfToDiv";
import { useDataType } from "../../../store";
import PageNavigationButtonsModal from "../../PageNavigationButtons/PageNavigationButtonsModal";
import CustomButton from "../../Buttons/CustomButton";

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
}

const Modal = (props: Props) => {
  const handleClickExit = () => {
    props.toggleModal();
  };

  const currentID = useDataType((state) => state.agreementID);

  const storedData = useDataType((state) => state.data);

  const [parsedText, setParsedText] = useState<string>("");

  useEffect(() => {}, [currentID]);

  const { data: agreementInformation } = useQuery({
    queryKey: [currentID],
    queryFn: (context) => {
      const queryKey = context.queryKey as [number];
      return getTextInfo(queryKey);
    },
    enabled: !!currentID,
  });

  useEffect(() => {
    const rtfToDivHandler = async () => {
      if (agreementInformation?.agreement_text && storedData.text) {
        try {
          const htmlContent = await rtfToDiv(
            agreementInformation.agreement_text,
            storedData.text
          );

          const highlightedText = highlight(htmlContent, storedData.text);

          setParsedText(highlightedText);
        } catch (error) {
          alert(error);
        }
      }
    };
    rtfToDivHandler();
  }, [agreementInformation]);

  return (
    <>
      {props.isOpen && (
        <div
          onClick={handleClickExit}
          className=" modal-overlay backdrop-blur-sm transition-opacity duration-100 ease-in-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-box  transition-transform duration-1000 ease-in-out transform "
          >
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-bold pl-1 pr-1 md:pl-6 md:pr-6  pt-1 pb-4 md:pt-4 md:pb-4">
                {" "}
                Acordada/Resolución seleccionada
              </h1>
              <button className="btn btn-circle " onClick={handleClickExit}>
                <CustomButton imageName="xcircle" />
              </button>
            </div>
            <div className="flex flex-col  mr-1 ml-1 mb-8 mt-4 pb-2 pt-2 font-medium outline rounded-lg outline-darkCyanShift-0 dark:bg-inherit bg-darkCyanShift-0  text-lightBlueShift-0">
              <p>
                • Número: {agreementInformation?.agreement_number}/
                {agreementInformation?.agreement_year}
              </p>
              <p>• Fecha: {agreementInformation?.agreement_date.toString()}</p>
            </div>

            {parsedText && (
              <div dangerouslySetInnerHTML={{ __html: parsedText }} />
            )}
            {agreementInformation?.signature_list &&
            agreementInformation?.signature_list.length > 0 ? (
              <p className=" pt-1 pb-1 font-medium">
                ACORDADA SUSCRIPTA Y REGISTRADA POR EL/LA ACTUARIO/A FIRMANTE EN
                LA PROVINCIA DE TUCUMAN, EN LA FECHA INDICADA EN LA CONSTANCIA
                DE LA REFERIDA FIRMA DIGITAL DE QUIEN SUSCRIBE.- SA
              </p>
            ) : (
              <></>
            )}

            <p className=" pt-6 md:pt-1 pb-1 font-medium">
              Firmado en fecha:{" "}
              {agreementInformation?.agreement_date.toString()}{" "}
            </p>
            {agreementInformation?.signature_list &&
            agreementInformation.signature_list.length > 0 ? (
              agreementInformation.signature_list.map(
                (firms, index: number) => (
                  <div
                    key={index}
                    className=" bg-lightGreenShift-0 dark:bg-darkGreenShift-0 text-green-950 dark:text-green-300 pt-2 pb-2 mb-2 mt-2 rounded-lg pl-2 "
                  >
                    <p>CERTIFICADO DIGITAL:</p>
                    <p> {firms.description} 1</p>
                  </div>
                )
              )
            ) : (
              <></>
            )}

            <PageNavigationButtonsModal />
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
