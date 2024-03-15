"use server";

import { env } from "~/env.js";
import type { RegisterFormValues } from "./register-schema";
import { Resend } from "resend";

export async function sendEmail(values: RegisterFormValues) {
  // Don't send emails on DEV to avoid going over the plan
  if (process.env.NODE_ENV !== "development" && env.TARGET !== "electron") {
    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: env.RESEND_EMAIL_SENDER!,
      to: env.RESEND_EMAIL_RECEIVER!,
      subject: "Newly registered chain",
      react: (
        <div>
          <h1>Newly registered chain</h1>
          <p>
            Email:&nbsp;
            <strong
              style={{
                fontWeight: "bold",
              }}
            >
              {values.email}
            </strong>
          </p>
          <p>
            Project name:&nbsp;
            <strong
              style={{
                fontWeight: "bold",
              }}
            >
              {values.projectName}
            </strong>
          </p>
          <p>
            Github repository:&nbsp;
            {values.githubRepo ? (
              <a
                href={values.githubRepo}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "dodgerblue",
                  textDecoration: "underline",
                }}
              >
                {values.githubRepo}
              </a>
            ) : (
              <em
                style={{
                  color: "grey",
                  fontStyle: "italic",
                }}
              >
                &lt;empty&gt;
              </em>
            )}
          </p>
          <p>
            The project is live ? :&nbsp;
            {values.isProjectLive ? (
              <strong
                style={{
                  fontWeight: "bold",
                }}
              >
                YES
              </strong>
            ) : (
              <strong
                style={{
                  fontWeight: "bold",
                }}
              >
                NO
              </strong>
            )}
          </p>

          {values.estimatedLaunchDate && (
            <p>
              Estimated launch date :&nbsp;
              <strong
                style={{
                  fontWeight: "bold",
                }}
              >
                {values.estimatedLaunchDate}
              </strong>
            </p>
          )}

          <p>
            Execution Environment(s):&nbsp;
            <strong
              style={{
                fontWeight: "bold",
              }}
            >
              {values.env.map((env, index) => (
                <>
                  <span>{env}</span>
                  {index < values.env.length - 1 && ", "}
                </>
              ))}
            </strong>
          </p>
          <p>
            Toolkit:&nbsp;
            <strong
              style={{
                fontWeight: "bold",
              }}
            >
              {values.toolkit}
            </strong>
          </p>
          <p>
            Layer(s):&nbsp;
            <strong
              style={{
                fontWeight: "bold",
              }}
            >
              {Array.from(values.layer).map((layer, index) => (
                <>
                  <span>{layer}</span>
                  {index < values.layer.length - 1 && ", "}
                </>
              ))}
            </strong>
          </p>
        </div>
      ),
    });
  }

  return {
    success: true,
  };
}
