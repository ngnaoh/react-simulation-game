import AppHeader from "../app-header";
import FormStructuring from "./form-structuring";
import StageInformation from "./stage-information";
import StageHelperButtons from "./stage-helper-buttons";

export default function Structuring() {
  return (
    <>
      <AppHeader
        leftSection={
          <StageInformation
            stageName="Structuring"
            nextStageName="Summary"
            nextStageDuration="30 minutes"
          />
        }
      />
      <StageHelperButtons>
        <FormStructuring />
      </StageHelperButtons>
    </>
  );
}
