export interface Welcome {
  success: boolean;
  data: Data;
  message: string;
}

export interface Data {
  index: number;
  max_size: number;
  max_page: number;
  agreements: Agreement[];
}

export interface Agreement {
  id: number;
  agreement_number: number;
  agreement_year: number;
  agreement_date: Date;
  agreement_description: string;
  file_number: string;
  type_agreement: TypeAgreement;
  agreement_plane_text: null;
}

export interface TypeAgreement {
  code: string;
  description: string;
}

export type Code = "A";

export type Description = "ACORDADAS";

export interface AgreementWantedFormat {
  contentFormat: {
    index: number;
    max_size: number;
    max_page: number;
  };

  agreementsFormat: {
    id: number;
    agreement_number: number;
    agreement_year: number;
    agreement_date: Date;
    agreement_description: string;
    file_number: string;
    type_agreement: { code: string; description: string };
  }[];
}

export const agreementsFormatConversion = (
  data: Data
): AgreementWantedFormat => {
  return {
    agreementsFormat: data.agreements.map((result) => ({
      id: result.id,
      agreement_number: result.agreement_number,
      agreement_year: result.agreement_year,
      agreement_date: result.agreement_date,
      agreement_description: result.agreement_description,
      file_number: result.file_number,
      type_agreement: {
        code: result.type_agreement.code,
        description: result.type_agreement.description,
      },
    })),
    contentFormat: {
      index: data.index,
      max_page: data.max_page,
      max_size: data.max_size,
    },
  };
};
