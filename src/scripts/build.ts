import print from "../utils/console/index.ts";
import buildComponentMap from "../utils/helpers/buildComponentMap.ts";

const build = () => {
  try {
    print.fancy("Starting optimized build...");

    buildComponentMap();

    print.success("Build completed!");
  } catch (e) {
    print.fail("Build failed!");
    console.error(e);
    return;
  }
};

build();
