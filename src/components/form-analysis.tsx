import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ValuationPieChart } from "@/components/valuation-pie-chart";
import * as yup from "yup";

const schema = yup
  .object({
    ebitda: yup
      .number()
      .typeError("Interest rate must be a number")
      .required("Interest rate is required")
      .positive("Interest rate must be positive"),
    interestRate: yup
      .number()
      .typeError("Interest rate must be a number")
      .required("Interest rate is required")
      .positive("Interest rate must be positive"),
    multiple: yup
      .number()
      .typeError("Multiple must be a number")
      .required("Multiple is required")
      .positive("Multiple must be positive"),
    factorScore: yup
      .number()
      .min(1, "Factor score must be at least 1")
      .max(5, "Factor score must be at most 5")
      .required("Factor score is required"),
    companyName: yup.string().required("Company name is required"),
    description: yup.string().required("Description is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const FormAnalysis = () => {
  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      ebitda: 10,
      interestRate: 20,
      multiple: 10,
      factorScore: 3,
      companyName: "ABC Corp.",
      description: "This is the company's description. This company is #1.",
    },
  });

  // Watch factorScore to display its current value
  const watchedFactorScore = watch("factorScore");

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="ebitda" className="mb-2 block">
                EBITDA
              </Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex items-center w-full">
                  <Controller
                    name="ebitda"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="ebitda"
                        type="text"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background/30 border-border placeholder:text-muted-foreground pr-18"
                      />
                    )}
                  />
                  <span className="absolute right-2 text-muted-foreground">
                    $ million
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hover:bg-primary/10"
                >
                  TBD
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hover:bg-primary/10"
                >
                  OK
                </Button>
              </div>
              {errors.ebitda && (
                <p className="text-destructive text-sm mt-1">
                  {errors.ebitda.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="interestRate" className="mb-2 block">
                Interest Rate
              </Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex items-center w-full">
                  <Controller
                    name="interestRate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="interestRate"
                        type="text"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background/30 border-border placeholder:text-muted-foreground pr-6"
                      />
                    )}
                  />
                  <span className="absolute right-2 text-muted-foreground">
                    %
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hover:bg-primary/10"
                >
                  TBD
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hover:bg-primary/10"
                >
                  OK
                </Button>
              </div>
              {errors.interestRate && (
                <p className="text-destructive text-sm mt-1">
                  {errors.interestRate.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="multiple" className="mb-2 block">
                Multiple
              </Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex items-center w-full">
                  <Controller
                    name="multiple"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="multiple"
                        type="text"
                        {...field}
                        value={field.value ?? ""}
                        className="bg-background/30 border-border placeholder:text-muted-foreground pr-6"
                      />
                    )}
                  />
                  <span className="absolute right-2 text-muted-foreground">
                    x
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hover:bg-primary/10"
                >
                  TBD
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer hover:bg-primary/10"
                >
                  OK
                </Button>
              </div>
              {errors.multiple && (
                <p className="text-destructive text-sm mt-1">
                  {errors.multiple.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="factorScore" className="mb-2 block">
                Factor Score:{" "}
                <span className="font-bold">{watchedFactorScore}</span>{" "}
              </Label>
              <div className="flex items-center space-x-2">
                <Controller
                  name="factorScore"
                  control={control}
                  render={({ field }) => (
                    <Slider
                      id="factorScore"
                      max={5}
                      step={1}
                      value={[field.value]}
                      onValueChange={(val) => field.onChange(val[0])}
                      className="my-2 cursor-pointer"
                    />
                  )}
                />
                <Button variant="outline" size="sm" className="cursor-pointer">
                  TBD
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  OK
                </Button>
              </div>
            </div>
          </div>

          {/* Company Name - Using Controller */}
          <div>
            <Label htmlFor="companyName" className="mb-2 block">
              Company Name
            </Label>
            <div className="flex items-center space-x-2">
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    id="companyName"
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="bg-input border-border placeholder:text-muted-foreground"
                  />
                )}
              />
              <Button variant="outline" size="sm" className="cursor-pointer">
                TBD
              </Button>
              <Button variant="outline" size="sm" className="cursor-pointer">
                OK
              </Button>
            </div>
          </div>

          {/* Description - Using Controller */}
          <div>
            <Label htmlFor="description" className="mb-2 block">
              Description
            </Label>
            <div className="flex items-start space-x-2">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    {...field}
                    value={field.value || ""}
                    className="bg-input border-border placeholder:text-muted-foreground min-h-[80px] resize-y max-h-[200px]"
                  />
                )}
              />
              <div className="flex flex-row space-x-2">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  TBD
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer">
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-center md:col-span-1">
          <Card className="bg-transparent border-border h-full">
            <CardHeader>
              <CardTitle className="text-2xl text-card-foreground text-center border-b border-border pb-2">
                Valuation: $200 million
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 h-full">
              <ValuationPieChart />
            </CardContent>
          </Card>
        </div>
      </div>
      <footer className="mt-8 pt-4 border-t border-border flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
        >
          SUBMIT
        </Button>
      </footer>
    </form>
  );
};

export default FormAnalysis;
