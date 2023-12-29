/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import { Building } from "lucide-react";
import { RegisterFormValues } from "~/app/(register)/register/register-schema";
import { Button } from "~/ui/button";
import { Enveloppe, GithubLogo, Warning } from "~/ui/icons";
import { Input } from "~/ui/input";
import { cn } from "~/ui/shadcn/utils";
import { ImageCheckbox } from "./image-checkbox";
import { RegisterFormStep } from ".";
import { Checkbox } from "~/ui/checkbox";
import { Select, SelectContent, SelectItem } from "~/ui/select";

type FormDefaultValues = Partial<{
  [K in keyof RegisterFormValues]?: RegisterFormValues[K] | null;
}>;
type FormStepProps = {
  defaultValues: FormDefaultValues;
  errors: Record<string, string[] | undefined> | null;
};

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
    value: "ORBIT_STACK",
    name: "Orbit Stack",
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

export function DetailStepForm({ defaultValues, errors }: FormStepProps) {
  const [isProjectLive, setIsProjectLive] = React.useState(
    Boolean(defaultValues.isProjectLive),
  );
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

      <Checkbox
        checked={isProjectLive}
        name="isProjectLive"
        value="true"
        label="This project is currently live"
        onChange={(e) => setIsProjectLive(e.target.checked)}
      />

      {isProjectLive && (
        <Select
          size="small"
          label="Estimated Launch Date (optional)"
          placeholder="Choose a value"
          name="estimatedLaunchDate"
          defaultValue={defaultValues.estimatedLaunchDate ?? undefined}
        >
          <SelectContent>
            <SelectItem value="QUARTER_1-2024">1. Quarter 2024</SelectItem>
            <SelectItem value="QUARTER_2-2024">2. Quarter 2024</SelectItem>
            <SelectItem value="QUARTER_3-2024">3. Quarter 2024</SelectItem>
            <SelectItem value="QUARTER_4-2024 OR LATER">
              4. Quarter 2024 or later
            </SelectItem>
          </SelectContent>
        </Select>
      )}
    </>
  );
}

export function EnvStepForm({ defaultValues, errors }: FormStepProps) {
  const [additionalEnvs, setAdditionalEnvs] = React.useState(
    () =>
      defaultValues.env?.filter(
        (env) => !DEFAULT_ENVS.find((e) => e.value !== env),
      ) ?? [],
  );

  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  function addAdditionalEnv() {
    const currentValue = inputRef.current?.value.trim();
    if (inputRef.current && currentValue) {
      setAdditionalEnvs([...additionalEnvs, currentValue]);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

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

        {additionalEnvs.map((currentEnv, index) => (
          <ImageCheckbox
            key={index}
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

      <div className="flex flex-col justify-stretch gap-4 items-end lg:justify-normal lg:flex-row">
        <Input
          size="small"
          ref={inputRef}
          label="Not listed here ?"
          placeholder="Enter the name here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addAdditionalEnv();
            }
          }}
        />
        <Button
          color="primary"
          className="min-w-max px-3 py-1 w-full iline-flex justify-center lg:w-auto"
          type="button"
          onClick={addAdditionalEnv}
        >
          <span>Add environment</span>
        </Button>
      </div>
    </>
  );
}

export function ToolkitStepForm({ defaultValues, errors }: FormStepProps) {
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

  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  function addToolkit() {
    const currentValue = inputRef.current?.value.trim();
    if (inputRef.current && currentValue) {
      setAdditionalToolkit(currentValue);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }

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
          label="Orbit Stack"
          name="toolkit"
          value="ORBIT_STACK"
          defaultChecked={defaultValues.toolkit === "ORBIT_STACK"}
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

      <div className="flex flex-col justify-stretch gap-4 items-end lg:justify-normal lg:flex-row">
        <Input
          size="small"
          ref={inputRef}
          label="Not listed here ?"
          placeholder="Enter the name here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addToolkit();
            }
          }}
        />
        <Button
          color="primary"
          className="min-w-max px-3 py-1 w-full iline-flex justify-center lg:w-auto"
          type="button"
          onClick={addToolkit}
        >
          <span>Add toolkit</span>
        </Button>
      </div>
    </>
  );
}

export function LayerStepForm({ defaultValues, errors }: FormStepProps) {
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

export function SummaryStep({
  values,
  onJumpToStep,
}: {
  values: RegisterFormValues;
  onJumpToStep: (step: RegisterFormStep) => void;
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

        <div className="grid grid-cols-2 gap-3 place-items-stretch">
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
                direction="horizontal"
              />
            ) : (
              <ImageCheckbox
                key={env}
                label={env}
                disabled
                direction="horizontal"
              />
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

        <div className="grid grid-cols-2 gap-3 place-items-stretch">
          {toolkitFound ? (
            <ImageCheckbox
              label={toolkitFound.name}
              image={toolkitFound.logo}
              disabled
              direction="horizontal"
            />
          ) : (
            <ImageCheckbox
              label={values.toolkit}
              disabled
              direction="horizontal"
            />
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

        <div className="grid grid-cols-2 gap-3 place-items-stretch">
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
                direction="horizontal"
              />
            ) : (
              <ImageCheckbox
                key={layer}
                label={layer}
                disabled
                direction="horizontal"
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function SuccessStep() {
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
