import FormAnalysis from "@/components/stages/form-analysis";
import AppHeader from "../app-header";
import StageInformation from "./stage-information";
import StageHelperButtons from "./stage-helper-buttons";

export default function Analysis() {
  return (
    <>
      <AppHeader
        leftSection={
          <StageInformation
            stageName="Analysis"
            nextStageName="Structuring"
            nextStageDuration="1 hour"
          />
        }
        confirmWhenLoggingOut
      />
      <div className="sm:hidden">
        <StageInformation
          stageName="Analysis"
          nextStageName="Structuring"
          nextStageDuration="1 hour"
        />
      </div>
      <StageHelperButtons>
        <FormAnalysis />
      </StageHelperButtons>
    </>
  );
}
