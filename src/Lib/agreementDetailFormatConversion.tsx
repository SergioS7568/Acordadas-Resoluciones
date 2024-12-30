export interface Welcome {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  id: number;
  agreement_number: number;
  agreement_year: number;
  agreement_date: Date;
  agreement_description: string;
  agreement_text: string;
  file_number: string;
  record_list: [];
  signature_list: SignatureList[];
  attach_list: [];
  type_agreement: TypeAgreement;
}

export interface SignatureList {
  description: string;
}

export interface TypeAgreement {
  code: string;
  description: string;
}

export interface DetailsWantedFormat {
  id: number;
  agreement_number: number;
  agreement_year: number;
  agreement_date: Date;
  agreement_description: string;
  agreement_text: string;
  file_number: string;

  signature_list: { description: string }[];
}

export const agreementDetailFormatConversion = (
  data: Data
): DetailsWantedFormat => {
  return {
    id: data.id,
    agreement_number: data.agreement_number,
    agreement_year: data.agreement_year,
    agreement_date: data.agreement_date,
    agreement_description: data.agreement_description,
    agreement_text: data.agreement_text,
    file_number: data.file_number,

    signature_list: data.signature_list.map((result) => ({
      description: result.description,
    })),
  };
};
