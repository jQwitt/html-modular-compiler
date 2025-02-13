import print from "../utils/console/index.ts";

const clean = () => {
  try {
    print.fancy("Cleaning...");

    // Remove coverage files
    let found = false;
    const coverageDir = Deno.readDirSync("coverage");
    for (const { name, isFile } of coverageDir) {
      if (isFile && name.includes("json")) {
        found = true;
        const path = `coverage/${name}`;
        Deno.removeSync(path);
        print.fileRemoved(path);
      }
    }

    if (!found) {
      print.success("No coverage files found!");
    } else {
      print.success("Done!");
    }
  } catch (e) {
    print.fail("Cleaning failed!");
    console.error(e);
    return;
  }
};

clean();
