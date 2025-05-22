import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type Resolver, FormProvider } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ValuationPieChart } from "@/components/stages/valuation-pie-chart";

import { useSimulation } from "@/contexts/simulation-provider";
import type { Fields } from "@/type/database";
import {
  FirstPartFieldsAnalysisRenderSetting,
  PieChartConfig,
  SecondPartFieldsAnalysisRenderSetting,
  TemplateDataSimulation,
} from "@/constants/simulations";
import FieldInputRealtime from "./field-input-real-time";
import { useEffect, useMemo } from "react";
import { schemaAnalysis } from "@/schemas/stage";
import { checkShouldFinishAnalysis, getValuation } from "@/lib/utils";

const FormAnalysis = () => {
  const { simulation, team } = useSimulation();
  const methods = useForm<Omit<Fields, "companies">>({
    resolver: yupResolver(schemaAnalysis) as Resolver<
      Omit<Fields, "companies">
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

  const isTeam2Agree = useMemo(() => {
    if (!simulation) return false;
    return checkShouldFinishAnalysis(simulation.data.fields);
  }, [simulation]);

  const valuation = useMemo(() => {
    if (!simulation) return 0;
    return getValuation(simulation.data.fields);
  }, [simulation]);

  const chartData = useMemo(() => {
    if (!simulation) return [];
    return [
      {
        browser: "interestRate",
        value: +simulation.data.fields.interestRate.value,
        fill: "var(--color-interestRate)",
      },
      {
        browser: "remain",
        value: 100 - +simulation.data.fields.interestRate.value,
        fill: "var(--color-remain)",
      },
    ];
  }, [simulation]);

  return (
    <FormProvider {...methods}>
      <form>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4 md:space-y-6 pt-2 md:pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {FirstPartFieldsAnalysisRenderSetting.map((setting) => (
                <FieldInputRealtime
                  key={setting.name}
                  setting={setting}
                  isTeam1={isTeam1}
                  isTeam2={isTeam2}
                />
              ))}
            </div>
            <div className="space-y-4 md:space-y-6">
              {SecondPartFieldsAnalysisRenderSetting.map((setting) => (
                <FieldInputRealtime
                  key={setting.name}
                  setting={setting}
                  isTeam1={isTeam1}
                  isTeam2={isTeam2}
                />
              ))}
            </div>
          </div>
          <div className="pt-2 md:pt-4 flex justify-center lg:col-span-1">
            <Card className="bg-transparent border-border w-full h-full">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-card-foreground text-center border-b border-border pb-2">
                  Valuation: ${valuation.toLocaleString()} million
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4 h-full">
                <ValuationPieChart
                  chartData={chartData}
                  chartConfig={PieChartConfig}
                />
              </CardContent>
              <CardFooter>
                <div className="flex flex-col items-center justify-center space-y-2 w-full">
                  {!isTeam2Agree && (
                    <p className="text-xs md:text-sm text-muted-foreground text-center font-bold">
                      Not yet agreed by Team 2
                    </p>
                  )}
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default FormAnalysis;
