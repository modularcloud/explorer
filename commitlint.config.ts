import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["gitmoji"],
  rules: {
    "type-empty": [RuleConfigSeverity.Disabled],
    "subject-empty": [RuleConfigSeverity.Disabled],
    // require a message after the gitmoji
    "header-min-length": [RuleConfigSeverity.Error, "always", 5],
  },
};
module.exports = Configuration;
