/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { range } from "~/lib/shared-utils";
import { Button } from "~/ui/button";
import { cn } from "~/ui/shadcn/utils";
import { ArrowRight, Check, Enveloppe, GithubLogo, GlobeWeb } from "~/ui/icons";
import { Input } from "~/ui/input";

export type RegisterFormProps = {};

export function RegisterForm({}: RegisterFormProps) {
  const [currentStep, setCurrentStep] = React.useState(4);

  async function formAction(formData: FormData) {
    console.log({ formData });
  }

  return (
    <form
      className="flex flex-col justify-between h-full items-center w-full"
      action={formAction}
    >
      <header className="p-4 border-b bg-white z-10 relative w-full flex flex-col items-center">
        <Stepper
          current={currentStep}
          noOfSteps={4}
          onJumpToStep={(step) => setCurrentStep(step)}
        />
      </header>

      <div className="flex-1 flex flex-col gap-8 pt-32 justify-stretch w-full px-10 mx-auto">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/images/mc-logo.svg"
            alt="Modular Cloud logo"
            className="h-6 w-6 mb-3"
          />
          <h1 className="font-medium text-2xl">Register your chain</h1>
          <p>Tell us more about yourself.</p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            size="small"
            label="Email"
            type="email"
            placeholder="Email"
            name="email"
            required
            renderLeadingIcon={(cls) => (
              <Enveloppe className={cls} aria-hidden="true" />
            )}
          />
          <Input
            size="small"
            label="Project Name"
            type="text"
            placeholder="Celestia"
            name="projectName"
            required
            renderLeadingIcon={(cls) => (
              <GlobeWeb className={cls} aria-hidden="true" />
            )}
          />
          <Input
            size="small"
            label="Github Repo (optional)"
            type="url"
            name="githubRepo"
            placeholder="https://github.com/celestiaorg/celestia-app"
            renderLeadingIcon={(cls) => (
              <GithubLogo className={cls} aria-hidden="true" />
            )}
          />
        </div>
      </div>

      <footer className="p-4 border-t bg-white z-10 relative w-full">
        <div className="flex items-center justify-stretch gap-4 md:justify-between">
          <Button
            type="button"
            variant="bordered"
            aria-disabled={currentStep === 1}
            className="px-3 py-1 w-full md:w-auto text-center items-center justify-between md:gap-12"
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              }
            }}
          >
            <ArrowRight
              className="h-3 w-3 text-muted -scale-x-100"
              aria-hidden="true"
            />
            <span>Previous</span>
            <span></span>
          </Button>

          <Button
            type="submit"
            className="bg-primary px-3 py-1 text-white w-full md:w-auto text-center items-center justify-between md:gap-12 hover:bg-primary/80"
          >
            <span></span>
            <span>Next</span>
            <ArrowRight className="h-3 w-3 text-white" aria-hidden="true" />
          </Button>
        </div>
      </footer>
    </form>
  );
}

type StepperProps = {
  current: number;
  noOfSteps: number;
  onJumpToStep: (step: number) => void;
};

function Stepper({ current, noOfSteps, onJumpToStep }: StepperProps) {
  return (
    <ol className="flex gap-3">
      {range(1, noOfSteps).map((step) => (
        <li className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => onJumpToStep(step)}
            className={cn(
              "px-3 py-1 gap-2 border  border-muted/20 items-center transition duration-150",
              current === step && "bg-muted-100",
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
            <span>{step}</span>
          </Button>
          {step !== noOfSteps && (
            <ArrowRight className="h-3 w-3 text-muted/40" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
