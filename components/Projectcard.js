import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { contribute, createWithdrawRequest } from "../redux/interactions";
import { etherToWei } from "../helper/helper";
import { toastSuccess, toastError } from "../helper/toastMessage";

const colorMaker = (state) => {
  if (state === "Fundraising") {
    return "bg-lime-500";
  } else if (state === "Expired") {
    return "bg-red-500";
  } else {
    return "bg-lime-500";
  }
};

const FundRiserCard = ({ props, pushWithdrawRequests }) => {
  const [btnLoader, setBtnLoader] = useState(false);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const crowdFundingContract = useSelector(
    (state) => state.fundingReducer.contract
  );
  const account = useSelector((state) => state.web3Reducer.account);
  const web3 = useSelector((state) => state.web3Reducer.connection);

  const contributeAmount = (projectId, minContribution) => {
    if (amount < minContribution) {
      toastError(`Minimum contribution amount is ${minContribution}`);
      return;
    }

    setBtnLoader(projectId);
    const contributionAmount = etherToWei(amount);

    const data = {
      contractAddress: projectId,
      amount: contributionAmount,
      account: account,
    };
    const onSuccess = () => {
      setBtnLoader(false);
      setAmount(0);
      toastSuccess(`Successfully contributed ${amount} ETH`);
    };
    const onError = (message) => {
      setBtnLoader(false);
      toastError(message);
    };
    contribute(crowdFundingContract, data, dispatch, onSuccess, onError);
  };

  const requestForWithdraw = (projectId) => {
    setBtnLoader(projectId);
    const contributionAmount = etherToWei(amount);

    const data = {
      description: `${amount} ETH requested for withdraw`,
      amount: contributionAmount,
      recipient: account,
      account: account,
    };
    const onSuccess = (data) => {
      setBtnLoader(false);
      setAmount(0);
      if (pushWithdrawRequests) {
        pushWithdrawRequests(data);
      }
      toastSuccess(`Successfully requested for withdraw ${amount} ETH`);
    };
    const onError = (message) => {
      setBtnLoader(false);
      toastError(message);
    };
    createWithdrawRequest(web3, projectId, data, onSuccess, onError);
  };

  return (
    <div className="Projectcard relative overflow-hidden my-3">
      <div className={`ribbon ${colorMaker(props.state)}`}>{props.state}</div>
      <Link href={`/project-details/${props.address}`}>
        <h1 className="font-sans text-xl text-gray font-semibold hover:text-yellow-600 hover:cursor-pointer">
          {props.title}- Contribute
        </h1>
      </Link>
      <p className="font-sans text-sm text-stone-800 tracking-tight">
        {props.description}
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="Project-card my-6 w-full lg:w-3/5">
          <p className="text-md font-bold font-sans text-gray">
            Targeted contribution
          </p>
          <p className="text-sm font-bold font-sans text-gray-600 ">
            {props.goalAmount} ETH{" "}
          </p>
          <p className="text-md font-bold font-sans text-gray">Deadline</p>
          <p className="text-sm font-bold font-sans text-gray-600 ">
            {props.deadline}
          </p>
        </div>
      </div>
      {props.state !== "Successful" ? (
        <div className="w-full bg-gray-200 rounded-full">
          <div className="progress" style={{ width: `${props.progress}%` }}>
            {" "}
            {props.progress}%{" "}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FundRiserCard;
