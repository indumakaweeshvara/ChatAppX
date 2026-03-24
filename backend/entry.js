try {
  require('./src/index.js');
} catch (e) {
  console.error("Backend Entry Error:", e.message);
  if (e.stack) console.error(e.stack);
  process.exit(1);
}
