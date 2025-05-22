import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useDashboardAdmin } from "@/contexts/dashboard-admin-provider";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MultipleSelector, { type Option } from "./multi-select";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { hasPermission } from "@/utils/permissions";
import { createSimulation } from "@/services/simulations";

const schema = yup
  .object({
    team1: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .min(1, "Please select at least one user for Team 1")
      .required("Team 1 is required"),
    team2: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .min(1, "Please select at least one user for Team 2")
      .required("Team 2 is required"),
  })
  .test("unique-users", "Users cannot be in multiple teams", function (value) {
    if (!value.team1 || !value.team2) return true;
    return !value.team1.some((user) =>
      value.team2.some((t2) => t2.value === user.value)
    );
  });

type FormData = yup.InferType<typeof schema>;

export default function CreateSimulationsButton() {
  const [open, setOpen] = useState(false);
  const { users } = useDashboardAdmin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      team1: [],
      team2: [],
    },
  });

  const onSubmit = async (data: FormData) => {
    toast.loading("Starting new simulation...");
    const result = await createSimulation({
      userIdsTeam1: data.team1.map((user) => user.value),
      userIdsTeam2: data.team2.map((user) => user.value),
    });
    if (typeof result === "boolean") {
      toast.dismiss();
      toast.success("Simulation created successfully");
    } else {
      toast.dismiss();
      toast.error("Failed to start simulation");
    }
    setOpen(false);
  };

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error.type === "unique-users") {
        toast.error(error.message);
      }
    });
  }, [errors]);

  const normalizedUsers = useMemo(
    () =>
      users.map(
        (user) =>
          ({
            label:
              user.email +
              " - " +
              (hasPermission(user.permissions || "", "dashboard:create")
                ? "Creator"
                : "Viewer"),
            value: user.id,
          } as Option)
      ),
    [users]
  );

  const hasErrorsUniqueUsers = useMemo(() => {
    return Object.values(errors).some((error) => error.type === "unique-users");
  }, [errors]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-zinc-800 hover:bg-zinc-700 cursor-pointer text-zinc-50">
          Start New Simulation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[30vw] sm:max-h-[50vh]">
        <DialogHeader>
          <DialogTitle>Start New Simulation</DialogTitle>
          <DialogDescription>
            Select users for each team to start the simulation.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} name="create-simulation">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="team1">Team 1</Label>
              <Controller
                name="team1"
                control={control}
                render={({ field }) => (
                  <MultipleSelector
                    defaultOptions={normalizedUsers}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    className={cn(
                      (errors.team1 || hasErrorsUniqueUsers) && "border-red-500"
                    )}
                  />
                )}
              />
              <p className="text-sm text-red-500 h-4">
                {errors.team1 && errors.team1.message}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team2">Team 2</Label>
              <Controller
                name="team2"
                control={control}
                render={({ field }) => (
                  <MultipleSelector
                    defaultOptions={normalizedUsers}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    className={cn(
                      (errors.team2 || hasErrorsUniqueUsers) && "border-red-500"
                    )}
                  />
                )}
              />
              <p className="text-sm text-red-500 h-4">
                {errors.team2 && errors.team2.message}
              </p>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-center w-full">
              <Button type="submit">Start Simulation</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
