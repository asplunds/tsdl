import { useState } from "react";
import { tsdl } from "./main";

function App() {
  /* const apple = tsdl.vegetables.fetchOne.useQuery({ name: "apple" }); */
  const fruit = tsdl.vegetables.fetchAll.useQuery();
  const addOne = tsdl.vegetables.addOne.useMutation();

  const [name, setName] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addOne.mutate(
            {
              name,
            },
            {
              onSuccess() {
                setName("");
                tsdl.vegetables.fetchAll.invalidate();
              },
              onError() {
                console.log("oh no!");
              },
            }
          );
        }}
      >
        <input value={name} onChange={(e) => setName(e.currentTarget.value)} />
        <button disabled={addOne.isLoading}>add</button>
      </form>
      <ul>
        {fruit.data?.map((fruit, i) => (
          <li key={i}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
