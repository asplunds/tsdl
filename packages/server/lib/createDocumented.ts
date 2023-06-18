/** @internal */
export default function createDocumented<T>(
  cb: (documentation: { name: string; description: string | null }) => T
) {
  function doc(name: string, description?: string): T;
  function doc(name: { name: string; description?: string }): T;
  function doc(...args: unknown[]): T {
    const { name, description } = (() => {
      if (typeof args[0] === "string") {
        const name: string = args[0];
        const description: string | null =
          typeof args[1] === "string" ? args[1] : null;
        return { name, description };
      } else if (
        args[0] &&
        typeof args[0] === "object" &&
        "name" in args[0] &&
        typeof args[0].name === "string"
      ) {
        const name = args[0].name;
        const description =
          "description" in args[0] && typeof args[0].description === "string"
            ? args[0].description
            : null;

        return { name, description };
      }
      throw new TypeError("Invalid documentation arguments");
    })();

    return cb({ name, description });
  }

  return {
    doc,
  };
}
