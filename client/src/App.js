import React, { useEffect, useState } from "react";
import { getWeb3, getWallet } from './utils'

import Header from "./Header";
import NewTransfer from "./NewTransfer";
import TransferList from "./TransferList";

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await getTranfers(wallet);
      const approvals = await getApprovals(transfers, wallet, accounts);
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
      setApprovals(approvals);
    };
    init();
  }, []);

  const createTransfer = async transfer => {
    await wallet.methods.createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });
    const transfers = await getTranfers(wallet);
    const approvals = await getApprovals(transfers, wallet, accounts);
    setTransfers(transfers);
    setApprovals(approvals);
  }

  const approveTranfer = async transferId => {
    await wallet.methods.approveTransfer(transferId)
      .send({ from: accounts[0] });
    const transfers = await getTranfers(wallet);
    const approvals = await getApprovals(transfers, wallet, accounts);
    setTransfers(transfers);
    setApprovals(approvals);
  }

  const getTranfers = async (wallet) => {
    return await wallet.methods.getTransfers().call();
  }

  const getApprovals = async (transfers, wallet, accounts) => {
    let approvals = await Promise.all(transfers.map(async transfer => {
      const check = await wallet.methods.approvals(accounts[0], transfer.id).call();
      return {
        transfer_id: transfer.id,
        account: accounts[0],
        check
      };
    }));
    return approvals;
  }

  if (typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined') {
    return <div>Loading ...</div>
  } else {
    return (
      <div className="App">
        Multisig Dapp
        <Header approvers={approvers} quorum={quorum} />
        <NewTransfer createTransfer={createTransfer} />
        <TransferList transfers={transfers} approveTranfer={approveTranfer} approvals={approvals} />
      </div>
    );
  }

}

export default App;
