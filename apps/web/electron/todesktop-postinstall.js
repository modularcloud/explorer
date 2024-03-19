const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

async function postInstall() {
  const firstInstallOnToDesktopServers =
    process.env.TODESKTOP_CI && process.env.TODESKTOP_INITIAL_INSTALL_PHASE;

  console.log("➔ Building typescript on ToDesktop servers");
  await execAsync("npm run build", {
    stdio: "inherit",
  });

  if (firstInstallOnToDesktopServers) {
    console.log("➔ Building typescript on ToDesktop servers");
  } else {
    console.log("➔ Not on ToDesktop servers... Do nothing.");
  }
}

postInstall();
