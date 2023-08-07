import { Text, TextProvider } from "react-echo";
import "./globals.scss";
import styles from "./text.module.css";
import Tree from "./components/Tree/Tree";
import classes from "./index.module.scss";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Query from "./components/Query/Query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useLocalStorageState from "use-local-storage-state";
import { types } from "@tsdl/core";
import Initialize from "./components/Initialize/Initialize";

function App() {
  const [tree] = useLocalStorageState<types.tree.Tree | null>("tree", {
    defaultValue: null,
  });

  const routes = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "initialize",
          element: <Initialize />,
        },
        {
          path: "query/:path",
          element: <section>{tree && <Query tree={tree} />}</section>,
        },
        {
          path: "",
          element: <></>,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

const queryClient = new QueryClient();

function Root() {
  const [tree] = useLocalStorageState<types.tree.Tree | null>("tree", {
    defaultValue: null,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <TextProvider classNames={styles}>
        <main className={classes.main}>
          <section>
            <Text h1>TSDL</Text>
            {tree ? <Tree depth={0} tree={tree} /> : "Error: Invalid Tree"}
          </section>
          <Outlet />
        </main>
      </TextProvider>
    </QueryClientProvider>
  );
}

export default App;
