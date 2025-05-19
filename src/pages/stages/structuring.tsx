import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ValuationPieChart } from "@/components/valuation-pie-chart";
import { LogOut, PlayIcon, FileTextIcon } from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import { yupResolver } from "@hookform/resolvers/yup";
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

export default function Structuring() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control, // Get control from useForm
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

  const handleTimeUp = () => {
    // Handle what happens when the timer reaches zero
    console.log("Time's up!");
  };

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <div className="bg-gradient-to-br from-background to-background/80 text-foreground min-h-screen p-8">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-border bg-background/50 backdrop-blur-sm rounded-lg p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-[90px]">
              <CountdownTimer
                initialTimeInSeconds={6840} // 1 hour, 54 minutes in seconds
                onTimeUp={handleTimeUp}
              />
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex items-center space-x-2">
              <p className="text-xl font-bold">Stage: ANALYSIS</p>
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary hover:bg-primary/30"
              >
                CURRENT
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <FileTextIcon className="h-4 w-4" />
            <p className="text-sm">Next Stage: STRUCTURING - 1 hour</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p>John Doe</p>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            Logout <LogOut className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>
      <div className="flex space-x-6">
        <nav className="flex flex-col space-y-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Play"
                className="cursor-pointer hover:bg-primary/10"
              >
                <PlayIcon className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background/95 backdrop-blur-sm border-border">
              <DialogHeader>
                <DialogTitle>Play Simulation</DialogTitle>
                <DialogDescription>
                  Start the simulation process for this stage.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground">
                  Are you sure you want to start the simulation?
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {}}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button onClick={() => {}} className="cursor-pointer">
                  Start Simulation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Document"
                className="cursor-pointer hover:bg-primary/10"
              >
                <FileTextIcon className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background/95 backdrop-blur-sm border-border">
              <DialogHeader>
                <DialogTitle>Document Details</DialogTitle>
                <DialogDescription>
                  View and manage document information.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground">
                  Document content and details will be displayed here.
                </p>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {}}
                  className="cursor-pointer"
                >
                  Close
                </Button>
                <Button onClick={() => {}} className="cursor-pointer">
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </nav>
        <div className="flex flex-col flex-grow border border-border rounded-lg p-4 bg-background/50 backdrop-blur-sm">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-1"
            className="w-full border border-border rounded-lg px-4 bg-background/30"
          >
            <AccordionItem value="item-1" className="border-border">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline cursor-pointer">
                First Time Guidance
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Sed ut perspiciatis unde omnis
                  iste natus error sit voluptatem accusantium doloremque
                  laudantium.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
                            value={[field.value]} // Slider expects value as array
                            max={5}
                            step={1}
                            onValueChange={(val) => field.onChange(val[0])} // Update form state with single number
                            className="my-2 cursor-pointer"
                          />
                        )}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
                        TBD
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
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
                          className="bg-input border-border placeholder:text-muted-foreground"
                        />
                      )}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
                      TBD
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
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
                          className="bg-input border-border placeholder:text-muted-foreground min-h-[80px] resize-y max-h-[200px]"
                        />
                      )}
                    />
                    <div className="flex flex-row space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
                        TBD
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                      >
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
        </div>
      </div>
    </div>
  );
}
