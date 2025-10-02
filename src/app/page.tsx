"use client";

import { useState } from "react";
import Item from "./components/item";
import { arrData } from "./constants";

export default function Home() {
  const [list, setList] = useState<ItemWithBucket[]>(arrData.map(item => ({...item, bucket : "main"}) ));

  return (
    <div className="w-full h-screen flex flex-col items-center py-8 px-4 gap-2">
      <h1 className="font-bold text-2xl w-fit">Auto Delete Todo List</h1>
      <div className="max-w-4xl h-full w-full grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          {list.filter(item => item.bucket == 'main').map((item) => (
            <Item
              key={item.name}
              onClick={() => {
                setList(value => [...value.filter(i => i!=item), {...item, bucket : item.type.toLocaleLowerCase()}])
              }}
            >
              {item.name}
            </Item>
          ))}
        </div>
        <div className="flex flex-col border rounded-xl">
          <div className="w-full text-center p-1 bg-gray-300 rounded-t-xl font-bold">
            FRUIT
          </div>
          <div className="flex flex-col gap-2 p-1">
            {list.filter(item => item.bucket == 'fruit').map((item) => (
              <Item
                key={item.name}
                onClick={() => {
                  setList(value => [...value.filter(i => i!=item), {...item, bucket : 'main'}])
                }}
                onTimeOut={() => {
                  setList(value => [...value.filter(i => i!=item), {...item, bucket : 'main'}])
                }}
              >
                {item.name}
              </Item>
            ))}
          </div>
        </div>
        <div className="flex flex-col border rounded-xl">
          <div className="w-full text-center p-1 bg-gray-300 rounded-t-xl font-bold">
            VEGETABLE
          </div>
          <div className="flex flex-col gap-2 p-1">
            {list.filter(item => item.bucket == 'vegetable').map((item) => (
              <Item
                key={item.name}
                onClick={() => {
                  setList(value => [...value.filter(i => i!=item), {...item, bucket : 'main'}])
                }}
                onTimeOut={() => {
                  setList(value => [...value.filter(i => i!=item), {...item, bucket : 'main'}])
                }}
              >
                {item.name}
              </Item>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
