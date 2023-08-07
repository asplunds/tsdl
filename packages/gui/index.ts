import { types } from "@tsdl/core";

const html = (tree: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TSDL</title>
  </head>
  <body>
  <style>
    body, html {
      margin:0;padding:0;
      height:100%;
      width:100%;
      overflow:hidden;
      background: #000;
    }
  </style>
  <iframe
      src="http://localhost:5174/initialize?tree=${encodeURIComponent(tree)}"
      style="width: 100%; height: 100%; border: none"
    />
  </body>
</html>`;

export function guiHTML(tree: types.tree.Tree) {
  return html(JSON.stringify(tree));
}
