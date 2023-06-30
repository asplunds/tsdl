import { createClient } from "@tsdl/client";
import type { Router } from "@tsdl/test-node";

const client = createClient<Router>(({ url }) =>
  fetch(url("http://localhost:9000/tsdl")).then((d) => d.json())
);

client.fruit
  .all()
  .then((d) => {
    console.log(d);
    document.write(`Works!: ${d.map((v) => v.name).join(", ")}`);
  })
  .catch((e) => {
    console.error(e);
    document.write("Does not work, see console");
  });
