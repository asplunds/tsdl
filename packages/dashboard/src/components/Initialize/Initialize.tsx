import { useNavigate, useSearchParams } from "react-router-dom";
import { types } from "@tsdl/core";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

function Initialize() {
  const navigate = useNavigate();
  const [, setTree] = useLocalStorageState<types.tree.Tree | null>("tree", {
    defaultValue: null,
  });
  const [params] = useSearchParams();

  useEffect(() => {
    try {
      const raw = params.get("tree");
      if (!raw) {
        throw new Error("Invalid tree");
      }
      const tree = JSON.parse(raw);
      setTree(tree);
      navigate("/");
    } catch (e) {
      alert(e);
    }
  }, []);

  return <></>;
}

export default Initialize;
