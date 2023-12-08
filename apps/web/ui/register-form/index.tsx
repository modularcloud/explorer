/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { range } from "~/lib/shared-utils";
import { Button } from "~/ui/button";
import { cn } from "~/ui/shadcn/utils";
import {
  ArrowRight,
  Building,
  Check,
  Enveloppe,
  GithubLogo,
  GlobeWeb,
} from "~/ui/icons";
import { Input } from "~/ui/input";
import { Card } from "~/ui/card";
import Image from "next/image";

export type RegisterFormProps = {};

const STEPS = [
  "DETAILS",
  "ENVIRONMENT",
  "TOOLKIT",
  "LAYER_1",
  "SUMMARY",
  "SUCCESS",
] as const;
type Step = (typeof STEPS)[number];

export function RegisterForm({}: RegisterFormProps) {
  const [currentStep, setCurrentStep] = React.useState<Step>(STEPS[0]);

  let title = "Register your chain";
  let subTitle = "Tell us more about yourself.";

  if (currentStep === "ENVIRONMENT") {
    title = "Execution Environment";
    subTitle = "Choose one or more options";
  }
  if (currentStep === "TOOLKIT") {
    title = "Toolkit";
    subTitle = "Choose an option";
  }
  if (currentStep === "LAYER_1") {
    title = "Layer 1";
    subTitle = "Choose one or more options";
  }
  if (currentStep === "SUMMARY") {
    title = "Summary";
    subTitle = "Your chain summary";
  }

  const currentStepIdx = STEPS.findIndex((step) => step === currentStep);
  function jumpToStep(index: number) {
    if (index < STEPS.length && index >= 0) {
      setCurrentStep(STEPS[index]);
    }
  }
  async function formAction(formData: FormData) {
    console.log({ formData });
    jumpToStep(currentStepIdx + 1);
  }

  return (
    <form
      className="flex flex-col justify-between h-full items-center w-full"
      action={formAction}
    >
      <header className="p-4 border-b bg-white z-10  w-full flex flex-col items-center sticky top-0">
        <Stepper
          current={currentStepIdx}
          noOfSteps={STEPS.length - 1}
          onJumpToStep={jumpToStep}
        />
      </header>

      <div className="flex-1 flex flex-col gap-8 pt-32 py-20 justify-stretch w-full px-10 mx-auto tab:max-w-[30rem]">
        <div className="flex flex-col items-center gap-3">
          <img
            src="/images/mc-logo.svg"
            alt="Modular Cloud logo"
            className="h-6 w-6 mb-3"
          />
          <h1 className="font-medium text-2xl">{title}</h1>
          <p>{subTitle}</p>
        </div>

        <div className="flex flex-col gap-4">
          {currentStep === "DETAILS" && (
            <>
              <Input
                size="small"
                label="Email"
                type="email"
                placeholder="Ex: contact@celestia.org"
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
                placeholder="Ex: Celestia"
                name="projectName"
                required
                renderLeadingIcon={(cls) => (
                  <Building className={cls} aria-hidden="true" />
                )}
              />
              <Input
                size="small"
                label="Github Repo (optional)"
                type="url"
                name="githubRepo"
                placeholder="Ex: https://github.com/celestiaorg/celestia-app"
                renderLeadingIcon={(cls) => (
                  <GithubLogo className={cls} aria-hidden="true" />
                )}
              />
            </>
          )}
          {currentStep === "ENVIRONMENT" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <ImageCheckbox
                  label="Ethereum"
                  name="env"
                  value="EVM"
                  image="/images/ethereum.png"
                />
                <ImageCheckbox
                  label="Sealevel"
                  name="env"
                  value="SVM"
                  image="/images/sealevel.png"
                />
                <ImageCheckbox
                  label="Move"
                  name="env"
                  value="MOVE"
                  image="/images/move.svg"
                />
                <ImageCheckbox
                  label="Cosmos SDK"
                  name="env"
                  value="COSMOS"
                  image="/images/cosmos.svg"
                />
              </div>

              <Input
                size="small"
                label="Not listed here ?"
                placeholder="Enter the name here..."
              />
            </>
          )}
          {currentStep === "TOOLKIT" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <ImageCheckbox
                  label="Blobstream"
                  name="toolkit"
                  value="BLOBSTREAM"
                  type="radio"
                  image="/images/celestia-logo.svg"
                />
                <ImageCheckbox
                  label="Rollkit"
                  name="toolkit"
                  value="ROLLKIT"
                  type="radio"
                  image="/images/Rollkit.svg"
                />
                <ImageCheckbox
                  label="Dymint"
                  name="toolkit"
                  value="DYMINT"
                  type="radio"
                  image="/images/Dymint.svg"
                />
              </div>
              <p>Other</p>
              <div className="grid grid-cols-2 gap-3">
                <ImageCheckbox
                  label="OP Stack"
                  name="toolkit"
                  value="OP_STACK"
                  type="radio"
                />
                <ImageCheckbox
                  label="Arbitrum Nitro"
                  name="toolkit"
                  value="ARBITRUM_NITRO"
                  type="radio"
                />
              </div>

              <Input
                size="small"
                label="Not listed here ?"
                placeholder="Enter the name here..."
              />
            </>
          )}
          {currentStep === "LAYER_1" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <ImageCheckbox
                  label="Ethereum"
                  name="layer_1"
                  value="ETHEREUM"
                  image="/images/ethereum.png"
                />
                <ImageCheckbox
                  label="Celestia"
                  name="layer_1"
                  value="CELESTIA"
                  image="/images/celestia-logo.svg"
                />
              </div>
            </>
          )}
          {currentStep === "SUMMARY" && (
            <div className="flex flex-col gap-8">
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">Details</h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("DETAILS")}
                  >
                    Edit
                  </Button>
                </div>
                <dl className="flex flex-col gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Enveloppe
                      className="h-4 w-4 flex-none"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-0.5 flex-wrap">
                      <dt>Email:</dt>
                      <dd>
                        <strong className="font-medium">
                          hi@modularcloud.com
                        </strong>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <Building
                      className="h-4 w-4 flex-none"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-0.5 flex-wrap">
                      <dt>Project Name:</dt>
                      <dd>
                        <strong className="font-medium">CelestiaScan</strong>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <GithubLogo
                      className="h-4 w-4 flex-none"
                      aria-hidden="true"
                    />
                    <div className="flex items-center gap-0.5 flex-wrap">
                      <dt>GitHub Repo:</dt>
                      <dd>
                        <a
                          href="https://github.com/celestiaorg/celestia-app"
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline"
                        >
                          https://github.com/celestiaorg/celestia-app
                        </a>
                      </dd>
                    </div>
                  </div>
                </dl>
              </section>

              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">
                    Execution Environment
                  </h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("ENVIRONMENT")}
                  >
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ImageCheckbox
                    label="Ethereum"
                    image="/images/ethereum.png"
                    disabled
                  />
                  <ImageCheckbox
                    label="Celestia"
                    image="/images/celestia-logo.svg"
                    disabled
                  />
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">Toolkit</h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("TOOLKIT")}
                  >
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ImageCheckbox
                    label="Ethereum"
                    image="/images/ethereum.png"
                    disabled
                  />
                  <ImageCheckbox
                    label="Celestia"
                    image="/images/celestia-logo.svg"
                    disabled
                  />
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <h2 className="font-medium text-xl leading-6">Layer 1</h2>
                  <Button
                    type="button"
                    variant="bordered"
                    className="px-2 py-1 text-muted font-normal text-xs"
                    onClick={() => setCurrentStep("LAYER_1")}
                  >
                    Edit
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <ImageCheckbox
                    label="Ethereum"
                    image="/images/ethereum.png"
                    disabled
                  />
                  <ImageCheckbox
                    label="Celestia"
                    image="/images/celestia-logo.svg"
                    disabled
                  />
                </div>
              </section>
            </div>
          )}
        </div>
      </div>

      <footer className="p-4 border-t bg-white z-10 w-full sticky bottom-0">
        <div className="flex items-center justify-stretch gap-4 md:justify-between">
          <Button
            type="button"
            variant="bordered"
            aria-disabled={currentStep === "DETAILS"}
            className="px-3 py-1 w-full md:w-auto text-center items-center justify-between md:gap-12"
            onClick={() => {
              jumpToStep(currentStepIdx - 1);
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
      {range(0, noOfSteps - 1).map((step) => (
        <li className="flex items-center gap-2">
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

type ImageCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  image?: string;
  label: string;
  type?: "checkbox" | "radio";
};

function ImageCheckbox({
  image,
  label,
  value,
  type = "checkbox",
  ...checkboxProps
}: ImageCheckboxProps) {
  const checkboxId = React.useId();
  return (
    <div>
      <input
        type={type}
        id={checkboxId}
        defaultValue={value}
        className="peer sr-only"
        {...checkboxProps}
      />
      <Card
        as="label"
        htmlFor={checkboxId}
        className={cn(
          "flex flex-col text-xs items-center cursor-pointer",
          "peer-checked:border-primary peer-checked:border-2",
          "peer-disabled:cursor-default",
          {
            "py-2": !!image,
            "py-3": !image,
          },
        )}
      >
        {image && (
          <div className="h-8 w-8 p-1">
            <Image
              src={image}
              alt={label}
              width={32}
              height={32}
              className="object-center object-contain aspect-square"
            />
          </div>
        )}
        {label}
      </Card>
    </div>
  );
}
