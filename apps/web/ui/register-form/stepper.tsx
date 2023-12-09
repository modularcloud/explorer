import { Check, ArrowRight } from "~/ui/icons";
import { range } from "~/lib/shared-utils";
import { Button } from "~/ui/button";
import { cn } from "~/ui/shadcn/utils";

type StepperProps = {
  current: number;
  noOfSteps: number;
  onJumpToStep: (step: number) => void;
};

export function Stepper({ current, noOfSteps, onJumpToStep }: StepperProps) {
  return (
    <ol className="flex gap-3">
      {range(0, noOfSteps - 1).map((step) => (
        <li className="flex items-center gap-2" key={step}>
          <Button
            type="button"
            onClick={() => onJumpToStep(step)}
            className={cn(
              "px-3 py-1 gap-2 border  border-muted/20 items-center transition duration-150",
              current === step && "bg-muted-100 border-primary",
            )}
          >
            {step === current && <span className="sr-only">Current : </span>}
            {step < current && (
              <>
                <span className="sr-only">Completed : </span>
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              </>
            )}
            <span
              className={cn("md:not-sr-only", {
                "sr-only": step !== current,
              })}
            >
              Step
            </span>
            <span>{step + 1}</span>
          </Button>
          {step < noOfSteps - 1 && (
            <ArrowRight className="h-3 w-3 text-muted/40" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
