import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button className="w-[100px] h-[40px]" onClick={() => setCount((count) => count + 1)}>
        Click me
      </button>
      <div className="px-10">{count}</div>
    </>
  );
}

export default App;
