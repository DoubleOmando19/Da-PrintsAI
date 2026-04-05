const { spawn, exec } = require("child_process");
const path = require("path");

// Resolve project root (directory where this file lives)
const projectRoot = __dirname;

const PORT = 3000;
const URL = "http://localhost:" + PORT + "/amazon.html";

// Open the default browser based on platform
function openBrowser(url) {
  var p = process.platform;
  if (p === "darwin") exec("open " + url);
  else if (p === "win32") exec("start " + url);
  else exec("xdg-open " + url);
}

// Spawn the backend server with cwd set to the project root
// so that dotenv loads the root .env file correctly
const server = spawn("node", [path.join("backend", "server.js")], {
  cwd: projectRoot,
  stdio: ["inherit", "pipe", "pipe"],
  env: { ...process.env }
});

// Track whether browser has been opened
let browserOpened = false;

// Pipe child stdout to parent stdout and detect server ready
server.stdout.on("data", (data) => {
  process.stdout.write(data);
  // Open browser when server signals it is ready
  if (!browserOpened && data.toString().includes("running on port")) {
    browserOpened = true;
    console.log(" [OK] Opening " + URL);
    openBrowser(URL);
  }
});

// Pipe child stderr to parent stderr
server.stderr.on("data", (data) => {
  process.stderr.write(data);
});

// Handle child exit
server.on("exit", (code) => {
  console.log("Server exited with code " + code);
  process.exit(code);
});

// Handle spawn errors
server.on("error", (err) => {
  console.error("[FAIL] " + err.message);
  process.exit(1);
});

// Forward termination signals to child
process.on("SIGINT", () => server.kill("SIGINT"));
process.on("SIGTERM", () => server.kill("SIGTERM"));
