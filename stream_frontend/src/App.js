import React, { useEffect, useState } from "react";

const App = () => {
  const [stockData, setStockData] = useState({
    stock1Rate: null,
    stock2Rate: null,
  });

  useEffect(() => {
    // opening a connection to the server to begin receiving events from it
    const eventSource = new EventSource("http://localhost:4001/rates");
    
    // attaching a handler to receive message events
    eventSource.onmessage = (event) => {
      const stockData = JSON.parse(event.data);
      setStockData({ ...stockData });
    };
    
    // terminating the connection on component unmount
    return () => eventSource.close();
  }, []);

  return (
    <div className="w-[300px] h-[200px] bg-gray-50 shadow-sm rounded-3xl py-4 px-6">
      <p className="text-3xl text-slate-700">Stock prices:</p>
      <div className="flex flex-col items-start justify-start mt-6 gap-2">
        {stockData.stock1Rate ? (
          <p>Stock 1: &#8377;{stockData.stock1Rate}</p>
        ) : null}
        {stockData.stock2Rate ? (
          <p>Stock 2: &#8377;{stockData.stock2Rate}</p>
        ) : null}
      </div>
    </div>
  );
};

export default App;