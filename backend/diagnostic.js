console.log("Diagnostic: Node is running in", process.cwd());
const fs = require('fs');
const path = require('path');
const target = path.join(__dirname, 'src', 'index.js');
console.log("Checking for:", target);
if (fs.existsSync(target)) {
    console.log("File EXISTS. Attempting to require...");
    try {
        require('./src/index.js');
    } catch (e) {
        console.error("Require FAILED:", e.message);
        console.error(e.stack);
    }
} else {
    console.error("File DOES NOT EXIST at that path.");
}
