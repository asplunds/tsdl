import { Link, useParams } from "react-router-dom";
import classes from "./Query.module.scss";
import { types } from "@tsdl/core";
import { Fragment, useMemo } from "react";
import { Text } from "react-echo";
import { getColor } from "../../utils/getColor";
import Button from "../Button/Button";
import useLocalStorageState from "use-local-storage-state";
import Input from "../Input/Input";
import { createUrl } from "../../../../client/src/lib/createUrl";
import { createPayload } from "../../../../client/src/lib/createPayload";
import { useMutation } from "@tanstack/react-query";
import TextArea from "../TextArea/TextArea";
import Pre from "../Pre/Pre";

type QueryProps = {
  tree: types.tree.Tree;
};

function recursiveFind(
  tree: types.tree.Tree,
  target: string[]
): types.tree.Tree {
  if (target.length === 0) {
    return tree;
  }

  const node = tree.nodes.find((v) =>
    target.join("-").startsWith(v.path.join("-"))
  );

  if (node?.leaf) {
    return node;
  }
  if (!node) {
    throw new Error("Query not found");
  }

  return recursiveFind(node, target);
}

function Query({ tree }: QueryProps) {
  const { path } = useParams<{ path: string }>();
  const query = useMemo(() => {
    try {
      const target = path?.split("-").filter((v) => Boolean(v));
      if (!target) {
        return null;
      }
      return recursiveFind(tree, target);
    } catch {
      return null;
    }
  }, [path, tree]);

  const [baseUrl, setBaseUrl] = useLocalStorageState("baseUrl", {
    defaultValue: "http://localhost:8000",
  });
  const [input, setInput] = useLocalStorageState(["input", path].join("-"), {
    defaultValue: "",
  });
  const resolvedPath = useMemo(() => query?.path.slice(1), [query?.path]);
  const generatedURL = useMemo(() => {
    if (!resolvedPath) {
      return "";
    }
    const parsed = (() => {
      try {
        return JSON.parse(input);
      } catch {
        return null;
      }
    })();
    const payload = JSON.stringify(createPayload(resolvedPath, parsed));

    return createUrl(resolvedPath, payload)(baseUrl);
  }, [baseUrl, input, resolvedPath]);

  const mutation = useMutation(["fetch", generatedURL], async () => {
    const d = await fetch(generatedURL);
    return await d.json();
  });

  if (!query) {
    return (
      <>
        <Text h2>Query not found</Text>
      </>
    );
  }

  return (
    <div className={classes.sticky}>
      <div className={classes.top}>
        <div className={classes.texts}>
          {query.path.map((v, i) => (
            <Fragment key={i}>
              <Text h3 inline color={getColor(i - 1)}>
                {v}
              </Text>
              {i !== query.path.length - 1 && <Text inline>/</Text>}
            </Fragment>
          ))}
        </div>
        <Link to="/">
          <Button>Close</Button>
        </Link>
      </div>
      <div className={classes.content}>
        {(query.queryDoc?.name || query.queryDoc?.description) && (
          <div className={classes.titles}>
            {query.queryDoc?.name && <Text h2>{query.queryDoc?.name}</Text>}
            {query.queryDoc?.description && (
              <Text>{query.queryDoc?.description}</Text>
            )}
          </div>
        )}
        <div className={classes.testing}>
          <div className={classes.inputs}>
            <label>
              <Text size={14}>Base URL:</Text>
              <Input
                className={classes.input}
                placeholder="Base URL"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.currentTarget.value)}
              />
            </label>
            <label>
              <Text size={14}>Input JSON</Text>
              <TextArea
                style={{
                  minHeight: 120,
                }}
                className={classes.input}
                placeholder="Generated URL"
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
              />
            </label>
            <label>
              <Text size={14}>Generated URL (readonly)</Text>
              <Pre className={classes.input} placeholder="Generated URL">
                {generatedURL}
              </Pre>
            </label>
            <div>
              <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Running" : "Run"}
              </Button>
            </div>
            {mutation.data && !mutation.isLoading && (
              <label>
                <Text size={14}>
                  Response ({mutation.isError ? "error" : "success"})
                </Text>
                <Pre>{JSON.stringify(mutation.data, null, 2)}</Pre>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Query;
