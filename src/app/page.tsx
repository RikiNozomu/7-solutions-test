"use client";

import { useEffect, useState } from "react";
import Item from "./components/item";
import { arrData } from "./constants";
import Bucket from "./components/bucket";

export default function Home() {
  const [list, setList] = useState<ItemWithBucket[]>(
    arrData.map((item) => ({ ...item, bucket: "main" }))
  );

  const setItem = (item: ItemWithBucket, bucket: string) => {
    setList((value) => [
      ...value.filter((i) => i != item),
      { ...item, bucket },
    ]);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center py-8 px-4 gap-2">
      <h1 className="font-bold text-2xl w-fit">Auto Delete Todo List</h1>
      <div className="max-w-4xl h-full w-full grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2" data-testid="rest-bucket">
          {list
            .filter((item) => item.bucket == "main")
            .map((item) => (
              <Item
                key={item.name}
                onClick={() => setItem(item, item.type.toLocaleLowerCase())}
                data-testid={item.name}
              >
                {item.name}
              </Item>
            ))}
        </div>
        <Bucket title={"FRUIT"} date-testid={"fruit-bucket"}>
          {list
            .filter((item) => item.bucket == "fruit")
            .map((item) => (
              <Item
                key={item.name}
                onClick={() => setItem(item, "main")}
                onTimeOut={() => setItem(item, "main")}
                data-testid={item.name}
              >
                {item.name}
              </Item>
            ))}
        </Bucket>
        <Bucket title={"VEGETABLE"} date-testid={"vegetable-bucket"}>
          {list
            .filter((item) => item.bucket == "vegetable")
            .map((item) => (
              <Item
                key={item.name}
                onClick={() => setItem(item, "main")}
                onTimeOut={() => setItem(item, "main")}
                data-testid={item.name}
              >
                {item.name}
              </Item>
            ))}
        </Bucket>
      </div>
    </div>
  );
}
