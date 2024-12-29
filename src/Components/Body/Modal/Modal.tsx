import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import "./Modal.css";

import { getTextInfo } from "../../../Lib/getAgreements";
import highlight from "../../../Lib/highlight";
import rtfToDiv from "../../../Lib/rtfToDiv";
import { useDataType } from "../../../store";
import PageNavigationButtonsModal from "../../PageNavigationButtons/PageNavigationButtonsModal";

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

  useEffect(() => {
    console.log("currentID-- ", currentID);
  }, [currentID]);

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
        <div className=" modal-overlay backdrop-blur-sm transition-opacity duration-100 ease-in-out">
          <div className="modal-box  transition-transform duration-1000 ease-in-out transform">
            <div>
              <h1> Acordada/Resolución seleccionada</h1>
              <button
                className="btn btn-square bg-blue-300"
                onClick={handleClickExit}
              >
                exit X
              </button>
            </div>
            <div>
              <p>
                Número:
                {agreementInformation?.agreement_number}/
                {agreementInformation?.agreement_year}
              </p>
              <p>Fecha: {agreementInformation?.agreement_date.toString()}</p>
            </div>

            {parsedText && (
              <div dangerouslySetInnerHTML={{ __html: parsedText }} />
            )}
            <p>
              ACORDADA SUSCRIPTA Y REGISTRADA POR EL/LA ACTUARIO/A FIRMANTE EN
              LA PROVINCIA DE TUCUMAN, EN LA FECHA INDICADA EN LA CONSTANCIA DE
              LA REFERIDA FIRMA DIGITAL DE QUIEN SUSCRIBE.- SA
            </p>
            <p>
              Firmado en fecha:{" "}
              {agreementInformation?.agreement_date.toString()}{" "}
            </p>
            {agreementInformation?.signature_list &&
            agreementInformation.signature_list.length > 0 ? (
              agreementInformation.signature_list.map(
                (firms, index: number) => (
                  <div key={index} className="signature-item">
                    <p>1 {firms.description} 1</p>
                  </div>
                )
              )
            ) : (
              <p>No signatures available.</p>
            )}

            <PageNavigationButtonsModal />
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
