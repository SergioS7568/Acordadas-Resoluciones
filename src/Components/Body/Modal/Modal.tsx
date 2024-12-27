import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import rtf from "rtf.js";

import "./Modal.css";

import { getTextInfo } from "../../../Lib/getAgreements";
import highlight from "../../../Lib/highlight";
import rtfToDiv from "../../../Lib/rtfToDiv";

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
  id: number | undefined;
}

const Modal = (props: Props) => {
  const { id } = props;

  const handleClickExit = () => {
    props.toggleModal();
  };

  const { data: agreementInformation } = useQuery({
    queryKey: [id],
    queryFn: (context) => {
      const queryKey = context.queryKey as [number];
      return getTextInfo(queryKey);
    },
    enabled: !!id,
  });

  const [flagLoad, setFlagLoad] = useState<boolean>(false);
  const [parsedText, setParsedText] = useState<string>("");

  useEffect(() => {
    const rtfToDivHandler = async () => {
      if (agreementInformation?.agreement_text) {
        setFlagLoad(true);
        try {
          const htmlContent = await rtfToDiv(
            agreementInformation.agreement_text,
            "Poder"
          );
          // If rtfToDiv isn't working as expected, you could try rtf.js instead:
          // const htmlContent = parseRtf(agreementInformation.agreement_text);
          const highlightedText = highlight(htmlContent, "Poder");
          console.log("Parsed Text:", highlightedText);
          setParsedText(highlightedText);
        } catch (error) {
          alert(error);
        } finally {
          setFlagLoad(false);
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
            <p>{agreementInformation?.agreement_text}</p>
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
            <button className="btn btn-circle">list</button>
            <button className="btn btn-circle">left</button>
            <button className="btn btn-circle">right</button>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
