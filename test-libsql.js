const { createClient } = require("@libsql/client");
async function main() {
  const client = createClient({ url: "file:dev.db" });
  try {
    await client.execute("SELECT 1");
    console.log("Query executed successfully!");
  } catch (e) {
    console.error("Query error:", e);
  }
}
main();
