import React, { useState } from 'react'

export default function NewTransfer({ createTransfer }) {
  const [transfer, setTransfer] = useState(undefined);

  const submit = e => {
    e.preventDefault();
    createTransfer(transfer);
  }

  const updateTransfer = (event, field) => {
    const value = event.target.value;
    setTransfer({ ...transfer, [field]: value });
  }

  return (
    <div>
      <h2>Create transfer</h2>
      <form onSubmit={(e) => submit(e)}>
        <label>Amount</label>
        <input
          id="amount"
          type="text"
          onChange={e => updateTransfer(e, "amount")}
        />
        <input
          id="to"
          type="text"
          onChange={e => updateTransfer(e, "to")}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}
