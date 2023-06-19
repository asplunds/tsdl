import { promises as fs } from "node:fs";

type Package = {
  folder: string;
  name: string;
  description: string;
};

(async () => {
  const packages = await fs.readdir("./packages");
  const readme = await fs.readFile("./README.md", "utf-8");
  const license = await fs.readFile("./LICENSE", "utf-8");

  const packageData: Package[] = [];

  for (const folder of packages) {
    if ((await fs.stat(`./packages/${folder}`)).isDirectory()) {
      const packageJson = await (async () => {
        try {
          return {
            ...JSON.parse(
              await fs.readFile(`./packages/${folder}/package.json`, "utf-8")
            ),
            folder,
          } as Package;
        } catch (e) {
          console.error(e);
          return null;
        }
      })();

      if (!packageJson) {
        continue;
      } else {
        packageData.push(packageJson);
      }
    }
  }

  for (const data of packageData) {
    await fs.writeFile(
      `./packages/${data.folder}/README.md`,
      [
        "[//]: <> (AUTO GENERATED - DO NOT EDIT ME. EDIT README IN PROJECT ROOT)",
        "",
        `${data.description}`,
        "",
        packageData
          .map((v) => {
            if (v.name === data.name) {
              return v.name;
            }
            return `[${v.name}](https://npmjs.com/package/${v.name})`;
          })
          .join(", "),
        "",
        "***",
        `${readme}`,
        "***",
        "This README is auto-generated",
      ].join("\n")
    );

    await fs.writeFile(`./packages/${data.folder}/LICENSE.md`, license);

    console.log(`Generated README.md for "${data.name}"`);
  }
})();
