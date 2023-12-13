/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { useFormState } from "react-dom";
import { Button } from "~/ui/button";
import {
  ArrowRight,
  Building,
  Enveloppe,
  GithubLogo,
  Warning,
} from "~/ui/icons";
import { Input } from "~/ui/input";
import { Stepper } from "./stepper";
import { ImageCheckbox } from "./image-checkbox";
import { cn } from "~/ui/shadcn/utils";
import {
  detailStepSchema,
  envStepSchema,
  toolkitStepSchema,
  layerStepSchema,
  type AllValues,
  type EnvStep,
  type LayerStep,
  allValuesSchema,
} from "~/app/(register)/register/register-schema";
import { sendEmail } from "~/app/(register)/register/send-email.action";
import { LoadingIndicator } from "../loading-indicator";

const STEPS = [
  "DETAILS",
  "ENVIRONMENT",
  "TOOLKIT",
  "LAYER",
  "SUMMARY",
  "SUCCESS",
] as const;
type Step = (typeof STEPS)[number];

const DEFAULT_ENVS = [
  { value: "ETHEREUM", name: "Ethereum", logo: "/images/ethereum.png" },
  { value: "SEALEVEL", name: "Sealevel", logo: "/images/sealevel.png" },
  { value: "COSMOS_SDK", name: "Cosmos SDK", logo: "/images/cosmos.svg" },
  { value: "MOVE", name: "Move", logo: "/images/move.svg" },
];

const DEFAULT_TOOLKITS = [
  {
    value: "BLOBSTREAM",
    name: "Blobstream",
    logo: "/images/celestia-logo.svg",
  },
  {
    value: "ROLLKIT",
    name: "Rollkit",
    logo: "/images/rollkit.svg",
  },
  {
    value: "DYMINT",
    name: "Dymint",
    logo: "/images/dymension-logo.svg",
  },
  {
    value: "ARBITRUM_NITRO",
    name: "Abitrum Nitro",
  },
  {
    value: "OP_STACK",
    name: "OP Stack",
  },
];

const DEFAULT_LAYERS = [
  {
    value: "ETHEREUM",
    name: "Ethereum",
    logo: "/images/ethereum.png",
  },
  {
    value: "CELESTIA",
    name: "Celestia",
    logo: "/images/celestia-logo.svg",
  },
];

export function RegisterForm() {
  const [isSendingEmail, startTransition] = React.useTransition();
  const [currentStep, setCurrentStep] = React.useState<Step>(STEPS[5]);
  const [valuesInputed, setValuesInputed] = React.useState<Partial<AllValues>>(
    {},
  );
  const [totalFilledSteps, setTotalFilledSteps] = React.useState(0);

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
  if (currentStep === "LAYER") {
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
      let canJumpToStep = false;
      const step = STEPS[index];
      switch (step) {
        case "DETAILS":
          canJumpToStep = true;
          break;
        case "ENVIRONMENT":
          canJumpToStep = detailStepSchema.safeParse(valuesInputed).success;
          break;
        case "TOOLKIT":
          canJumpToStep = envStepSchema.safeParse(valuesInputed).success;
          break;
        case "LAYER":
          canJumpToStep = toolkitStepSchema.safeParse(valuesInputed).success;
          break;
        case "SUMMARY":
          canJumpToStep = layerStepSchema.safeParse(valuesInputed).success;
          break;
        default:
          break;
      }
      if (canJumpToStep) {
        setCurrentStep(STEPS[index]);
      }
    }
  }

  async function formAction(_: any, formData: FormData) {
    if (currentStep === "DETAILS") {
      const result = detailStepSchema.safeParse(Object.fromEntries(formData));

      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            email: formData.get("email")?.toString() ?? null,
            projectName: formData.get("projectName")?.toString() ?? null,
            githubRepo: formData.get("githubRepo")?.toString() ?? null,
          },
        };
      }

      setValuesInputed({ ...valuesInputed, ...result.data });
      setCurrentStep("ENVIRONMENT");
      setTotalFilledSteps((total) => (total >= 1 ? total : 1));
    }
    if (currentStep === "ENVIRONMENT") {
      const result = envStepSchema.safeParse({
        env: formData.getAll("env"),
      });
      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            env: [...formData.getAll("env")].map(String),
          } as EnvStep,
        };
      }
      setValuesInputed({ ...valuesInputed, ...result.data });
      setCurrentStep("TOOLKIT");
      setTotalFilledSteps((total) => (total >= 2 ? total : 2));
    }
    if (currentStep === "TOOLKIT") {
      const result = toolkitStepSchema.safeParse(Object.fromEntries(formData));
      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            toolkit: formData.get("toolkit")?.toString() ?? null,
          },
        };
      }
      setValuesInputed({ ...valuesInputed, ...result.data });
      setCurrentStep("LAYER");
      setTotalFilledSteps((total) => (total >= 3 ? total : 3));
    }
    if (currentStep === "LAYER") {
      const result = layerStepSchema.safeParse({
        layer: formData.getAll("layer"),
      });
      if (!result.success) {
        return {
          type: "error" as const,
          fieldErrors: result.error.flatten().fieldErrors,
          formData: {
            layer: new Set([...formData.getAll("layer")].map(String)),
          } as LayerStep,
        };
      }
      setValuesInputed({ ...valuesInputed, ...result.data });
      setCurrentStep("SUMMARY");
      setTotalFilledSteps((total) => (total >= 4 ? total : 4));
    }
    if (currentStep === "SUMMARY") {
      startTransition(() =>
        sendEmail(allValuesSchema.parse(valuesInputed)).then(() => {
          setCurrentStep("SUCCESS");
          setTotalFilledSteps(5);
        }),
      );
    }

    // default values
    return {};
  }

  const [state, action] = useFormState(formAction, {});

  const defaultValues = {
    ...valuesInputed,
    ...state.formData,
  };
  const errors = state.type === "error" ? state.fieldErrors : null;

  return (
    <form
      className="flex flex-col justify-between h-full items-center w-full"
      action={action}
    >
      <header
        className={cn(
          "p-4 border-b bg-white z-10  w-full flex flex-col items-center sticky top-0",
          {
            "pointer-events-none": currentStep === "SUCCESS",
          },
        )}
      >
        <Stepper
          totalFilledSteps={totalFilledSteps}
          current={currentStepIdx}
          noOfSteps={STEPS.length - 2}
          onJumpToStep={jumpToStep}
        />
      </header>

      <div className="flex-1 flex flex-col gap-8 pt-32 py-20 justify-stretch w-full px-10 mx-auto tab:max-w-[30rem] relative">
        {currentStep !== "SUCCESS" && (
          <div className="flex flex-col items-center gap-3">
            <img
              src="/images/mc-logo.svg"
              alt="Modular Cloud logo"
              className="h-6 w-6 mb-3"
            />
            <h1 className="font-medium text-2xl">{title}</h1>
            <p>{subTitle}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {currentStep === "DETAILS" && (
            <DetailStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "ENVIRONMENT" && (
            <EnvStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "TOOLKIT" && (
            <ToolkitStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "LAYER" && (
            <LayerStepForm defaultValues={defaultValues} errors={errors} />
          )}
          {currentStep === "SUMMARY" && (
            <SummaryStep
              values={valuesInputed as AllValues}
              onJumpToStep={setCurrentStep}
            />
          )}
          {currentStep === "SUCCESS" && <SuccessStep />}
        </div>
      </div>

      {currentStep !== "SUCCESS" && (
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
              disabled={isSendingEmail}
              color="primary"
              className="px-3 py-1 w-full md:w-auto text-center items-center justify-between md:gap-12"
            >
              <span>
                {isSendingEmail && (
                  <LoadingIndicator className="text-white h-4 w-4" />
                )}
              </span>
              <span>Next</span>
              <ArrowRight className="h-3 w-3 text-white" aria-hidden="true" />
            </Button>
          </div>
        </footer>
      )}
    </form>
  );
}

type FormDefaultValues = Partial<{
  [K in keyof AllValues]?: AllValues[K] | null;
}>;
type FormStepProps = {
  defaultValues: FormDefaultValues;
  errors: Record<string, string[] | undefined> | null;
};

function DetailStepForm({ defaultValues, errors }: FormStepProps) {
  return (
    <>
      <Input
        size="small"
        label="Email"
        type="email"
        placeholder="Ex: contact@celestia.org"
        name="email"
        required
        defaultValue={defaultValues?.email}
        renderLeadingIcon={(cls) => (
          <Enveloppe className={cls} aria-hidden="true" />
        )}
        error={errors?.email}
      />
      <Input
        size="small"
        label="Project Name"
        type="text"
        placeholder="Ex: Celestia"
        name="projectName"
        defaultValue={defaultValues?.projectName}
        required
        renderLeadingIcon={(cls) => (
          <Building className={cls} aria-hidden="true" />
        )}
        error={errors?.projectName}
      />
      <Input
        size="small"
        label="Github Repo (optional)"
        type="url"
        name="githubRepo"
        defaultValue={defaultValues?.githubRepo}
        placeholder="Ex: https://github.com/celestiaorg/celestia-app"
        renderLeadingIcon={(cls) => (
          <GithubLogo className={cls} aria-hidden="true" />
        )}
        error={errors?.githubRepo}
      />
    </>
  );
}

function EnvStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalEnvs, setAdditionalEnvs] = React.useState(
    () =>
      defaultValues.env?.filter(
        (env) => !DEFAULT_ENVS.find((e) => e.value !== env),
      ) ?? [],
  );
  return (
    <>
      {errors?.env && (
        <div
          className={cn(
            "flex flex-wrap gap-1 text-sm p-1 text-red-400 text-center items-center justify-center",
            "bg-red-100 rounded-md border-red-500 border",
          )}
        >
          <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
          {errors.env.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {DEFAULT_ENVS.map((env) => (
          <ImageCheckbox
            key={env.value}
            label={env.name}
            name="env"
            value={env.value}
            defaultChecked={defaultValues.env?.includes(env.value)}
            image={env.logo}
          />
        ))}

        {additionalEnvs.map((currentEnv) => (
          <ImageCheckbox
            key={currentEnv}
            label={currentEnv}
            name="env"
            value={currentEnv}
            checked
            onChange={() =>
              setAdditionalEnvs(
                additionalEnvs.filter((env) => env !== currentEnv),
              )
            }
          />
        ))}
      </div>

      <Input
        size="small"
        label="Not listed here ?"
        placeholder="Enter the name here..."
        onKeyDown={(e) => {
          const currentValue = e.currentTarget.value.trim();
          if (e.key === "Enter" && currentValue) {
            e.preventDefault();
            setAdditionalEnvs([...additionalEnvs, currentValue]);
          }
        }}
      />
    </>
  );
}

function ToolkitStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalToolkit, setAdditionalToolkit] = React.useState(() => {
    if (
      defaultValues.toolkit &&
      !DEFAULT_TOOLKITS.find(
        (toolkit) => defaultValues.toolkit === toolkit.value,
      )
    ) {
      return defaultValues.toolkit;
    }
    return null;
  });
  return (
    <>
      {errors?.toolkit && (
        <div
          className={cn(
            "flex flex-wrap gap-1 text-sm p-1 text-red-400 text-center items-center justify-center",
            "bg-red-100 rounded-md border-red-500 border",
          )}
        >
          <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
          {errors.toolkit.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <ImageCheckbox
          label="Blobstream"
          name="toolkit"
          value="BLOBSTREAM"
          defaultChecked={defaultValues.toolkit === "BLOBSTREAM"}
          type="radio"
          image="/images/celestia-logo.svg"
        />
        <ImageCheckbox
          label="Rollkit"
          name="toolkit"
          value="ROLLKIT"
          defaultChecked={defaultValues.toolkit === "ROLLKIT"}
          type="radio"
          image="/images/Rollkit.svg"
        />
        <ImageCheckbox
          label="Dymint"
          name="toolkit"
          value="DYMINT"
          defaultChecked={defaultValues.toolkit === "DYMINT"}
          type="radio"
          image="/images/dymension-logo.svg"
        />
      </div>
      <p>Other</p>
      <div className="grid grid-cols-2 gap-3">
        <ImageCheckbox
          label="OP Stack"
          name="toolkit"
          value="OP_STACK"
          defaultChecked={defaultValues.toolkit === "OP_STACK"}
          type="radio"
        />
        <ImageCheckbox
          label="Arbitrum Nitro"
          name="toolkit"
          value="ARBITRUM_NITRO"
          defaultChecked={defaultValues.toolkit === "ARBITRUM_NITRO"}
          type="radio"
        />
        {additionalToolkit && (
          <ImageCheckbox
            label={additionalToolkit}
            name="toolkit"
            type="radio"
            value={additionalToolkit}
            defaultChecked
          />
        )}
      </div>

      <Input
        size="small"
        label="Not listed here ?"
        placeholder="Enter the name here..."
        onKeyDown={(e) => {
          const currentValue = e.currentTarget.value.trim();
          if (e.key === "Enter" && currentValue) {
            e.preventDefault();
            setAdditionalToolkit(currentValue);
          }
        }}
      />
    </>
  );
}

function LayerStepForm({ defaultValues, errors }: FormStepProps) {
  return (
    <>
      {errors?.layer && (
        <div
          className={cn(
            "flex flex-wrap gap-1 text-sm p-1 text-red-400 text-center items-center justify-center",
            "bg-red-100 rounded-md border-red-500 border",
          )}
        >
          <Warning className="h-4 w-4 flex-none" aria-hidden="true" />
          {errors.layer.map((err, index) => (
            <span key={index}>{err}</span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <ImageCheckbox
          label="Ethereum"
          name="layer"
          value="ETHEREUM"
          defaultChecked={defaultValues.layer?.has("ETHEREUM")}
          image="/images/ethereum.png"
        />
        <ImageCheckbox
          label="Celestia"
          name="layer"
          value="CELESTIA"
          defaultChecked={defaultValues.layer?.has("CELESTIA")}
          image="/images/celestia-logo.svg"
        />
      </div>
    </>
  );
}

function SummaryStep({
  values,
  onJumpToStep,
}: {
  values: AllValues;
  onJumpToStep: (step: Step) => void;
}) {
  const toolkitFound = DEFAULT_TOOLKITS.find(
    (toolkit) => toolkit.value === values.toolkit,
  );
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-xl leading-6">Details</h2>
          <Button
            type="button"
            variant="bordered"
            className="px-2 py-1 text-muted font-normal text-xs"
            onClick={() => onJumpToStep("DETAILS")}
          >
            Edit
          </Button>
        </div>
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Enveloppe className="h-4 w-4 flex-none" aria-hidden="true" />
            <div className="flex items-center gap-0.5 flex-wrap">
              <dt>Email:</dt>
              <dd>
                <strong className="font-medium">{values.email}</strong>
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Building className="h-4 w-4 flex-none" aria-hidden="true" />
            <div className="flex items-center gap-0.5 flex-wrap">
              <dt>Project Name:</dt>
              <dd>
                <strong className="font-medium">{values.projectName}</strong>
              </dd>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <GithubLogo className="h-4 w-4 flex-none" aria-hidden="true" />
            <div className="flex items-center gap-0.5 flex-wrap">
              <dt>GitHub Repo:</dt>
              <dd>
                {values.githubRepo ? (
                  <a
                    href={values.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline"
                  >
                    {values.githubRepo}
                  </a>
                ) : (
                  <small className="text-muted/70 italic">&lt;empty&gt;</small>
                )}
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
            onClick={() => onJumpToStep("ENVIRONMENT")}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {values.env.map((env) => {
            const envFound = DEFAULT_ENVS.find(
              (defEnv) => env === defEnv.value,
            );
            return envFound ? (
              <ImageCheckbox
                key={env}
                label={envFound.name}
                image={envFound.logo}
                disabled
              />
            ) : (
              <ImageCheckbox key={env} label={env} disabled />
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-xl leading-6">Toolkit</h2>
          <Button
            type="button"
            variant="bordered"
            className="px-2 py-1 text-muted font-normal text-xs"
            onClick={() => onJumpToStep("TOOLKIT")}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {toolkitFound ? (
            <ImageCheckbox
              label={toolkitFound.name}
              image={toolkitFound.logo}
              disabled
            />
          ) : (
            <ImageCheckbox label={values.toolkit} disabled />
          )}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h2 className="font-medium text-xl leading-6">Layer 1</h2>
          <Button
            type="button"
            variant="bordered"
            className="px-2 py-1 text-muted font-normal text-xs"
            onClick={() => onJumpToStep("LAYER")}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Array.from(values.layer).map((layer) => {
            const layerFound = DEFAULT_LAYERS.find(
              (defLayer) => layer === defLayer.value,
            );
            return layerFound ? (
              <ImageCheckbox
                key={layer}
                label={layerFound.name}
                image={layerFound.logo}
                disabled
              />
            ) : (
              <ImageCheckbox key={layer} label={layer} disabled />
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SuccessStep() {
  return (
    <div className="h-full w-full fixed inset-0">
      <div
        className={cn(
          "min-w-max border border-mid-dark-100 bg-muted-100 px-8 py-6 rounded-md absolute",
          "animate-slide-up-from-bottom top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
      >
        <img
          src="/images/bg-btn.svg"
          className="absolute left-0 top-0 right-0"
          alt=""
        />
        <span className="relative z-10">
          🎈 Thank you for registering your chain
        </span>
      </div>

      <img
        src="/images/confetti_left.svg"
        alt=""
        className="absolute -left-4 -bottom-4 animate-slide-up-from-left"
      />
      <img
        src="/images/confetti_right.svg"
        alt=""
        className="absolute -right-4 -bottom-4 animate-slide-up-from-right"
      />
    </div>
  );
}
