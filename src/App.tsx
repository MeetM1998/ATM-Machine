import React, { useState, ChangeEvent } from "react";

interface DispensedNotes {
  [key: number]: number;
}

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [dispensedNotes, setDispensedNotes] = useState<DispensedNotes>({});
  // console.log("dispensedNotes: ", dispensedNotes);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAmount(value);
  };

  const handleWithdrawAmount = () => {
    let remainingAmount: number = amount;
    const dispensedNotes: DispensedNotes = {};

    [100, 50, 20].forEach((note: number) => {
      // console.log("note: ", note);
      // console.log("test :", Math.min(remainingAmount / note));
      const count: number = Math.min(Math.floor(remainingAmount / note));
      // console.log("test2 :", (dispensedNotes[note] = count));
      dispensedNotes[note] = count;
      remainingAmount -= count * note;
    });

    if (remainingAmount === 0) {
      setDispensedNotes(dispensedNotes);
    } else {
      alert("Unable to dispense the requested amount.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="bg-black text-white text-center py-2 uppercase text-xl w-full">
        ATM Machine
      </h1>
      <div className="border-solid border-2 border-black w-1/3 mt-5 px-5 py-3">
        <div className="flex gap-x-4 items-center text-lg">
          <label>Enter Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            className="border-solid border-2 border-black rounded px-2"
          />
          <button
            onClick={handleWithdrawAmount}
            className="bg-orange-800 text-white p-2 rounded"
          >
            Withdraw
          </button>
        </div>

        {Object.keys(dispensedNotes).length > 0 && (
          <div className="mt-5">
            <h2 className="text-lg mb-3">Dispensed Notes:</h2>
            <ul>
              {Object?.entries(dispensedNotes).map(([note, count]) => (
                <div className="flex flex-row justify-between items-center flex-left">
                  <div className="text-base">
                    <li key={note}>{`No. of ${note} notes: ${count}`}</li>
                  </div>
                  <div>
                    <p key={note}>{`${note} * ${count}`}</p>
                  </div>
                  <div>
                    <p>{`${Number(note) * Number(count)}`}</p>
                  </div>
                </div>
              ))}
            </ul>
            <p className="mt-3 text-right border-black border-solid border-t-2">{`Total Amount: ${amount}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
