import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "" });

  console.log("rerender", { count });

  return (
    <div>
      Je m'appelle {user.name}
      <input
        type="text"
        value={user.name}
        onChange={(e) => {
          setUser({ name: e.target.value });
        }}
      />
      {count}
      <button
        onClick={() => {
          setCount((oldCount) => oldCount + 1);
          setCount((oldCount) => oldCount + 1);
        }}
      >
        +1
      </button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}
