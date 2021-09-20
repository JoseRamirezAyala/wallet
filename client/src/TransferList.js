import React, { useEffect, useState } from 'react'

export default function TransferList({ transfers, approveTranfer, approvals }) {
  const [approved, setApproved] = useState([])

  useEffect(() => {
    setApproved(approvals);
  }, [transfers, approvals])
  return (
    <div>
      <h2>Transfers</h2>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>To</th>
            <th>Approvals</th>
            <th>Sent</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map(transfer => {
            let approvedItem = approved.find(x => x.transfer_id === transfer.id);
            return <tr key={transfer.id}>
              <td>{transfer.id}</td>
              <td>{transfer.amount}</td>
              <td>{transfer.to}</td>
              <td>
                {transfer.approvals}
                <button disabled={!approvedItem ? false : approvedItem.check} onClick={() => approveTranfer(transfer.id)}>Approve</button>
              </td>
              <td>{transfer.sent ? 'Yes' : 'No'}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div >
  )
}
