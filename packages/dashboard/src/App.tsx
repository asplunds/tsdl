import { Text, TextProvider } from "react-echo";
import "./globals.scss";
import styles from "./text.module.css";
import tree from "./tree";
import Tree from "./components/Tree/Tree";
import classes from "./index.module.scss";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Query from "./components/Query/Query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const routes = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "query/:path",
          element: (
            <section>
              <Query tree={tree} />
            </section>
          ),
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
  return (
    <QueryClientProvider client={queryClient}>
      <TextProvider classNames={styles}>
        <main className={classes.main}>
          <section>
            <Text h1>TSDL</Text>
            <Tree depth={0} tree={tree} />
          </section>
          <Outlet />
        </main>
      </TextProvider>
    </QueryClientProvider>
  );
}

export default App;
