import { z, preprocess } from "zod";

export const detailStepSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({
      message: "Can't be empty!",
    })
    .email({
      message: "Please enter a correct email",
    }),
  projectName: z.string().trim().nonempty({
    message: "Can't be empty!",
  }),
  estimatedLaunchDate: z.string().trim().nullish(),
  isProjectLive: z.coerce.boolean().default(false),
  githubRepo: z
    .string()
    .trim()
    .refine(
      (val) => {
        // allow empty
        if (!val) return true;
        try {
          if (!val.startsWith("https://")) val = `https://${val}`;

          const url = new URL(val);
          return (
            url.toString().startsWith("https://github.com/") ||
            url.toString().startsWith("github.com/")
          );
        } catch (error) {
          return false;
        }
      },
      {
        message:
          "please enter a correct URL, hint: it should start with https://github.com/",
      },
    ),
});

export const envStepSchema = z.object({
  env: z.array(z.string().trim().nonempty()).nonempty({
    message: "Choose one or more environments",
  }),
});

export const toolkitStepSchema = z.object({
  toolkit: z
    .string({
      required_error: "Please select one toolkit",
    })
    .trim()
    .nonempty({
      message: "Please select one toolkit",
    }),
});

export const layerStepSchema = z.object({
  layer: z.array(z.string().trim().nonempty(), {
    invalid_type_error: "Please choose one or more options",
    required_error: "Please choose one or more options",
  }).nonempty({
    message: "Please choose one or more options",
  }),
});

export const registerFormValuesSchema = detailStepSchema
  .merge(envStepSchema)
  .merge(toolkitStepSchema)
  .merge(layerStepSchema);

export type DetailStep = z.TypeOf<typeof detailStepSchema>;
export type EnvStep = z.TypeOf<typeof envStepSchema>;
export type ToolkitStep = z.TypeOf<typeof toolkitStepSchema>;
export type LayerStep = z.TypeOf<typeof layerStepSchema>;

export type RegisterFormValues = z.TypeOf<typeof registerFormValuesSchema>;
