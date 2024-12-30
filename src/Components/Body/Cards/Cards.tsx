import { AgreementWantedFormat } from "../../../Lib/agreementsFormatConversion";
import Grid from "../../../Lib/Grid";
import CustomButton from "../../Buttons/CustomButton";

interface Props {
  ApiUser: AgreementWantedFormat | undefined | null;
  HandleButtonPress: (id: number, index: number) => void;
}

const Cards = (props: Props) => {
  const { ApiUser, HandleButtonPress } = props;
  return (
    <div className="block md:hidden lg:hidden m-2">
      {ApiUser?.agreementsFormat.map((ApiResult, index: number) => {
        return (
          <div
            key={ApiResult.id}
            className="flex flex-col bg-gray-100 dark:bg-darkGrayOption-0 pt-3 pb-3 pr-6 pl-6 rounded-2xl text-lg gap-4 m-4"
            onClick={() => HandleButtonPress(ApiResult.id, index)}
          >
            <Grid container>
              <Grid item xs={12} className="flex flex-row justify-between">
                <p className="text-start    font-normal pt-2">
                  {ApiResult.agreement_number}/{ApiResult.agreement_year}
                </p>
                <p className="text-end  font-normal pt-2">
                  {ApiResult.agreement_date.toString()}
                </p>
              </Grid>
              <Grid item xs={12}>
                <p className="text-start pt-2 pb-1 font-bold truncate overflow-hidden whitespace-nowrap ">
                  {ApiResult.type_agreement.description}
                </p>
              </Grid>
              <Grid item xs={12}>
                <div
                  className=" bg-gradient-to-r from-gray-400 to-gray-300 "
                  style={{ height: "1px" }}
                ></div>
              </Grid>
              <Grid item xs={12}>
                <p className="text-start  pt-2 font-normal pb-2 ">
                  {ApiResult.agreement_description}
                </p>
              </Grid>
              <Grid item xs={12} className="flex justify-end">
                <button
                  className="btn btn-circle   "
                  onClick={() => HandleButtonPress(ApiResult.id, index)}
                >
                  <CustomButton imageName="buttons3left"></CustomButton>
                </button>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
};
export default Cards;
