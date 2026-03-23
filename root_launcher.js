console.log("Root Launcher");
try {
  require('./backend/src/index.js');
  console.log("Success!");
} catch (e) {
  console.error("Fail:", e.code);
  console.error(e.message);
}
