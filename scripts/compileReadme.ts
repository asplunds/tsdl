import { promises as fs } from "node:fs";

(async () => {
  const packages = await fs.readdir("./packages");
  const readme = await fs.readFile("./README.md", "utf-8");

  for (const folder of packages) {
    if ((await fs.stat(`./packages/${folder}`)).isDirectory()) {
      const packageJson = await (async () => {
        try {
          return JSON.parse(
            await fs.readFile(`./packages/${folder}/package.json`, "utf-8")
          ) as {
            name: string;
            description: string;
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      })();

      if (!packageJson) {
        continue;
      }

      await fs.writeFile(
        `./packages/${folder}/README.md`,
        [
          `## ${packageJson.name}`,
          `${packageJson.description}`,
          "***",
          `${readme}`,
          "***",
          `This README file was generated automatically at ${new Date().toLocaleString(
            "en-US"
          )}`,
        ].join("\n")
      );

      console.log(`Generated README.md for "${folder}"`);
    }
  }
})();
