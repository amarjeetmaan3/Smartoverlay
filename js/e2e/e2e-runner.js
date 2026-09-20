/* SmartOverlay 13N — End-to-End Test Runner */
export async function runE2ETests(tests=[]) {
  const results=[];
  for (const test of tests) {
    try { results.push({name:test.name,status:await test.run()?"passed":"failed"}); }
    catch(error){ results.push({name:test.name,status:"error",error:String(error)}); }
  }
  return results;
}
