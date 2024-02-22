import React from "react";

interface IItem {
  id: number;
  name: string;
  nickname: string;
  myValue: number;
}

const createExpensiveFunction = () => {
  // 이 함수를 실제로 비용이 큰 함수로 대체하세요.
  const expensiveFunction = (arg: IItem) => {
    console.log(`Calculating expensive value for ${arg}`);

    return (
      (((((((arg.myValue * 2) / 2) * 3922) / 3) * 432) / 123.32) * 12319) / 723
    );
  };

  const cache = new Map();

  const handler: ProxyHandler<(value: IItem) => number> = {
    apply(target, _: unknown, argumentsList: IItem[]) {
      const arg = argumentsList[0];

      if (!cache.has(arg)) {
        cache.set(arg, target(arg));
      } else {
        console.log("Returning cached data...");
      }

      return cache.get(arg);
    },
  };

  return new Proxy(expensiveFunction, handler);
};

const memorizedFunction = createExpensiveFunction();

function ProxyNote(): React.ReactElement {
  const items: IItem[] = [
    {
      id: 0,
      name: "yeom",
      nickname: "mumu",
      myValue: 0,
    },
    {
      id: 1,
      name: "yeom",
      nickname: "mumu",
      myValue: 1,
    },
    {
      id: 2,
      name: "yeom",
      nickname: "mumu",
      myValue: 2,
    },
    {
      id: 3,
      name: "yeom",
      nickname: "mumu",
      myValue: 4,
    },
  ];
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>{item.nickname}</p>
          <p>{memorizedFunction(item)}</p>
        </div>
      ))}
    </div>
  );
}

export default ProxyNote;
