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

  const currentIndex = useDataType((state) => state.queryIndex);
  const setQueryIndex = useDataType((state) => state.updateQueryIndex);

  const currentID = useDataType((state) => state.agreementID);
  const setIDSearch = useDataType((state) => state.updateAgreementID);

  const currentIdList = useDataType((state) => state.agreementIDList);

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

  const handleIdSelection = (position: number) => {
    console.log("position,   ", position);
    console.log("currentIdList,   ", currentIdList);
    console.log("currentID,   ", currentID);
    console.log("currentIndex,   ", currentIndex);
    console.log("currentIdList + position   ", currentIdList[position]);
    setQueryIndex(position);
    setIDSearch(currentIdList[position]);
  };

  useEffect(() => {
    const rtfToDivHandler = async () => {
      if (agreementInformation?.agreement_text) {
        try {
          const htmlContent = await rtfToDiv(
            agreementInformation.agreement_text,
            "Poder"
          );
          // If rtfToDiv isn't working as expected, you could try rtf.js instead:
          // const htmlContent = parseRtf(agreementInformation.agreement_text);
          const highlightedText = highlight(htmlContent, "Poder");
          // console.log("Parsed Text:", highlightedText);
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
            <h1> MODAL</h1>
            <button className="btn btn-circle">Exit</button>
            <button
              className="btn btn-square bg-blue-300"
              onClick={handleClickExit}
            >
              click me
            </button>
            <p>{agreementInformation?.agreement_date.toString()}</p>
            <p>{agreementInformation?.agreement_description}</p>
            <p>{agreementInformation?.agreement_number}</p>

            <div></div>
            <p>{agreementInformation?.agreement_year}</p>
            <p>{agreementInformation?.file_number}</p>
            <p>{agreementInformation?.id}</p>
            {agreementInformation?.signature_list.map(
              (firms, index: number) => {
                return (
                  <div key={index}>
                    <p>{firms.description}</p>
                  </div>
                );
              }
            )}

            {parsedText && (
              <div dangerouslySetInnerHTML={{ __html: parsedText }} />
            )}

            <PageNavigationButtonsModal />
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
