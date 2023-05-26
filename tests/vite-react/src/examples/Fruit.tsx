import { Button, Card, Input } from "@nextui-org/react";
import { useState } from "react";
import styles from "./Fruit.module.css";
import { Text } from "@nextui-org/react";
import { tsdl } from "../main";
import { toast } from "react-hot-toast";
import { TSDLError } from "../../../../packages/core";

export default function Fruit() {
  const [input, setInput] = useState("");

  const addOne = tsdl.fruit.addOne.useMutation();
  const removeOne = tsdl.fruit.removeOne.useMutation();
  const fruit = tsdl.fruit.all.useQuery();
  const fruit2 = tsdl.fruit.all(undefined, {
    next: 10,
  });
  void fruit2;

  return (
    <div className={styles.cont}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          addOne.mutate(input, {
            onSuccess() {
              setInput("");
              tsdl.invalidate();
            },
            onError(e) {
              if (e instanceof TSDLError) {
                toast.error(e.message ?? "Error");
              }
            },
          });
        }}
      >
        <Text h1>Fruit</Text>
        <Input
          label="Fruit to add"
          placeholder="Fruit name"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button type="submit">Add</Button>
        <div className={styles.list}>
          {fruit.data?.map((fruit) => (
            <Card
              onClick={() => {
                removeOne.mutate(fruit.id, {
                  onSuccess() {
                    tsdl.fruit.all.invalidate();
                  },
                  onError(e) {
                    if (e instanceof TSDLError) {
                      toast.error(e.code);
                    }
                  },
                });
              }}
              className={styles.listItem}
              key={fruit.id}
              variant="bordered"
              isPressable
              isHoverable
            >
              <Card.Body>
                <Text h3>{fruit.name}</Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </form>
    </div>
  );
}
