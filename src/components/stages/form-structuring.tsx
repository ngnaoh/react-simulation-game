import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver, FormProvider } from "react-hook-form";
import { useSimulation } from "@/contexts/simulation-provider";
import type { DataSimulation } from "@/type/database";
import {
  FirstPartFieldsStructuringRenderSetting,
  SecondPartFieldsStructuringRenderSetting,
  TemplateDataSimulation,
} from "@/constants/simulations";
import FieldInputRealtime from "./field-input-real-time";
import { useEffect, useMemo } from "react";
import { schemaStructuring } from "@/schemas/stage";
import OutputStructuring from "./output-structuring";
import { checkShouldFinishStructuring } from "@/lib/utils";

const FormStructuring = () => {
  const { simulation, team } = useSimulation();
  const methods = useForm<Pick<DataSimulation["fields"], "companies">>({
    resolver: yupResolver(schemaStructuring) as Resolver<
      Pick<DataSimulation["fields"], "companies">
    >,
    defaultValues: simulation?.data.fields ?? TemplateDataSimulation.fields,
  });
  const { reset } = methods;

  useEffect(() => {
    reset(simulation?.data.fields, {
      keepDirty: true,
      keepErrors: true,
      keepTouched: true,
      keepIsSubmitted: true,
      keepIsSubmitSuccessful: true,
      keepIsValidating: true,
      keepIsValid: true,
    });
  }, [simulation?.data.fields, reset]);

  const [isTeam1, isTeam2] = useMemo(
    () => [Boolean(team?.name === "Team 1"), Boolean(team?.name === "Team 2")],
    [team]
  );

  return (
    <FormProvider {...methods}>
      <form>
        <div className="flex-grow grid grid-cols-1 gap-6">
          <div className="md:col-span-2 space-y-6 pt-4">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <h2 className="text-md font-bold">Company 1</h2>
              </div>
              <div className="col-span-1">
                <h2 className="text-md font-bold">Company 2</h2>
              </div>
              <div className="col-span-1">
                <h2 className="text-md font-bold">Company 3</h2>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xs font-semibold text-primary">
                  Team 1 can modify values, while Team 2 can review and approve
                  changes
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {FirstPartFieldsStructuringRenderSetting.map((setting) => (
                <FieldInputRealtime
                  key={setting.name}
                  setting={setting}
                  isTeam1={isTeam1}
                  isTeam2={isTeam2}
                />
              ))}
            </div>
            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <h3 className="text-xs font-semibold text-primary">
                  Team 2 can modify values, while Team 1 can review and approve
                  changes
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {SecondPartFieldsStructuringRenderSetting.map((setting) => (
                <FieldInputRealtime
                  key={setting.name}
                  setting={setting}
                  isTeam1={isTeam2}
                  isTeam2={isTeam1}
                />
              ))}
            </div>
          </div>
          <div className="pt-4 flex justify-center md:col-span-1">
            {simulation &&
              checkShouldFinishStructuring(simulation.data.fields) && (
                <OutputStructuring />
              )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormStructuring;
