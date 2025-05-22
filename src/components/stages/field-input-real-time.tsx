/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { get, set } from "lodash";
import { RadioGroup } from "../ui/radio-group";
import {
  checkShouldFinishAnalysis,
  checkShouldFinishStructuring,
  cn,
} from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { FieldRenderType, type FieldRenderSetting } from "@/type/app";
import { STAGE_NAMES, type DataSimulation } from "@/type/database";
import { Textarea } from "../ui/textarea";
import { Slider } from "../ui/slider";
import { useSimulation } from "@/contexts/simulation-provider";
type FieldInputRealtimeProps = {
  setting: FieldRenderSetting;
  isTeam1: boolean;
  isTeam2: boolean;
};

const mapFieldName = {
  ebitda: "EBITDA",
  multiple: "Multiple",
  companyName: "Company Name",
  description: "Description",
  factorScore: "Factor Score",
  interestRate: "Interest Rate",
  "companies.company1.price": "Price",
  "companies.company1.shares": "Shares",
  "companies.company2.price": "Price",
  "companies.company2.shares": "Shares",
  "companies.company3.price": "Price",
  "companies.company3.shares": "Shares",
  "companies.company1.investor1": "Investor 1",
  "companies.company2.investor1": "Investor 1",
  "companies.company3.investor1": "Investor 1",
  "companies.company1.investor2": "Investor 2",
  "companies.company2.investor2": "Investor 2",
  "companies.company3.investor2": "Investor 2",
  "companies.company1.investor3": "Investor 3",
  "companies.company2.investor3": "Investor 3",
  "companies.company3.investor3": "Investor 3",
};

const FieldInputRealtime = ({
  setting,
  isTeam1,
  isTeam2,
}: FieldInputRealtimeProps) => {
  const {
    simulation,
    stage,
    finished,
    updateDataSimulation,
    handleFinishStage,
  } = useSimulation();
  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<DataSimulation["fields"]>();
  const [inputName, switchName] = useMemo(
    () => [`${setting.name}.value`, `${setting.name}.status`] as [any, any],
    [setting]
  );
  const handleSubmit = useCallback(
    async (field: any) => {
      const isValid = await trigger(field.name);
      if (
        isValid &&
        simulation &&
        field.value !== get(simulation, `data.fields.${field.name}`, "")
      ) {
        set(simulation, `data.fields.${field.name}`, field.value);
        set(simulation, `data.fields.${switchName}`, "TBD");
        console.log("simulation", simulation.data);

        updateDataSimulation(simulation.data);
      }
    },
    [trigger, simulation, switchName, updateDataSimulation]
  );

  const onToggle = useCallback(
    (field: any) => {
      const newData = field.value === "TBD" ? "OK" : "TBD";
      field.onChange(newData);
      if (!simulation || !stage) return;
      set(simulation, `data.fields.${switchName}`, newData);
      if (
        (stage.name === STAGE_NAMES.analysis &&
          checkShouldFinishAnalysis(simulation.data.fields)) ||
        (stage.name === STAGE_NAMES.structuring &&
          checkShouldFinishStructuring(simulation.data.fields))
      ) {
        console.log("simulation", simulation);
        return handleFinishStage(simulation);
      }
      updateDataSimulation(simulation.data);
    },
    [simulation, switchName, handleFinishStage, stage, updateDataSimulation]
  );

  const formatInputValue = useCallback(
    (setting: FieldRenderSetting, value: number) => {
      if (
        setting.unit === "%" ||
        setting.unit === "$" ||
        setting.unit === "$ million"
      ) {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
          .format(value ?? 0)
          .replace("$", "");
      }
      return value ?? "";
    },
    []
  );

  const onChangeInput = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setting: FieldRenderSetting,
      onChange: (value: string) => void
    ) => {
      const value = e.target.value;
      if (
        setting.unit === "%" ||
        setting.unit === "$" ||
        setting.unit === "$ million"
      ) {
        // Remove currency formatting and non-numeric characters
        const numericValue = value.replace(/[^0-9.]/g, "");
        onChange(numericValue);
      } else {
        onChange(value);
      }
    },
    []
  );

  const renderInput = useCallback(
    (field: any) => {
      switch (setting.type) {
        case FieldRenderType.inputText:
          return (
            <Input
              id={inputName}
              type="text"
              {...field}
              value={formatInputValue(setting, field.value)}
              className="bg-background/30 border-border placeholder:text-muted-foreground pr-18"
              disabled={isTeam2 || finished}
              onChange={(e) => onChangeInput(e, setting, field.onChange)}
              onBlur={() => handleSubmit(field)}
            />
          );
        case FieldRenderType.slider:
          return (
            <Slider
              id={inputName}
              max={5}
              min={1}
              step={1}
              onValueChange={(val) =>
                handleSubmit({ name: inputName, value: val[0] })
              }
              className="my-2 cursor-pointer"
              disabled={isTeam2 || finished}
              value={[field.value]}
            />
          );
        case FieldRenderType.textarea:
          return (
            <Textarea
              id={inputName}
              value={field.value ?? ""}
              {...field}
              className="bg-input border-border placeholder:text-muted-foreground min-h-[80px] resize-y max-h-[200px]"
              disabled={isTeam2 || finished}
              onBlur={() => handleSubmit(field)}
            />
          );

        default: {
          return <></>;
        }
      }
    },
    [
      setting,
      inputName,
      formatInputValue,
      isTeam2,
      finished,
      onChangeInput,
      handleSubmit,
    ]
  );

  return (
    <div>
      <Label htmlFor={inputName} className="mb-2 block w-fit">
        {mapFieldName[setting.name as keyof typeof mapFieldName]}
        {setting.type === FieldRenderType.slider && (
          <span className="text-muted-foreground">
            : {getValues(inputName)}
          </span>
        )}
      </Label>
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center w-full">
          <Controller
            name={inputName}
            control={control}
            render={({ field }) => renderInput(field)}
          />
          <span className="absolute right-2 text-muted-foreground">
            {setting.unit}
          </span>
        </div>
        <div className="flex flex-row space-x-2">
          <Controller
            name={switchName}
            control={control}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex gap-1"
                disabled={isTeam1 || finished}>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="tbd"
                    className={cn(
                      "text-sm font-medium",
                      (isTeam1 || finished) && "cursor-not-allowed"
                    )}>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "cursor-pointer",
                        field.value === "TBD" && "!bg-primary/50"
                      )}
                      disabled={isTeam1 || finished}
                      onClick={() => onToggle(field)}>
                      TBD
                    </Button>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="ok"
                    className={cn(
                      "text-sm font-medium",
                      (isTeam1 || finished) && "cursor-not-allowed"
                    )}>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className={cn(
                        "cursor-pointer",
                        field.value === "OK" && "!bg-primary/50"
                      )}
                      disabled={isTeam1 || finished}
                      onClick={() => onToggle(field)}>
                      OK
                    </Button>
                  </Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      </div>
      {isTeam1 && !finished && (
        <p className="text-destructive text-xs mt-1 h-2">
          {String(get(errors, `${inputName}.message`, ""))}
        </p>
      )}
    </div>
  );
};

export default FieldInputRealtime;
