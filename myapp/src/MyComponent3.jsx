import { useState } from "react";

function MyComponent3() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(1);

  const increment = () => {
    setCount1(count1 + 1); // 이게 먼저 호출되기 때문에 상태가 바뀌면 리렌더링이 발생해야하지 않는가?
    setCount2(count2 + 1); // 사실은 이 함수까지 호출되고 나서 렌더링은 한번만 일어난다.
  };

  return (
    <>
      <p>
        현재 값 : {count1} ⭐ {count2}
      </p>
      <button onClick={increment}> 증가 </button>
    </>
  );
}

export default MyComponent3;
