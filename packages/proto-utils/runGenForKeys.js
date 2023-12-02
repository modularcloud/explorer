const fs = require("fs");
const { spawn } = require("child_process");

// Path to your protobufs.json file
const filePath = "./protobufs.json";

// Read the JSON file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  let jsonData;
  try {
    jsonData = JSON.parse(data);
  } catch (parseErr) {
    console.error("Error parsing JSON:", parseErr);
    return;
  }

  // Extract and loop through top-level keys
  const keys = Object.keys(jsonData);
  keys.forEach((key) => {
    // Execute the npm command for each key
    const process = spawn("npm", ["run", "gen", "--name=" + key]);

    // Handle normal output
    process.stdout.on("data", (data) => {
      console.log(`Output for key ${key}: ${data}`);
    });

    // Handle error output
    process.stderr.on("data", (data) => {
      console.error(`Error for key ${key}: ${data}`);
    });

    // Handle close
    process.on("close", (code) => {
      console.log(`Child process for key ${key} exited with code ${code}`);
    });
  });
});
