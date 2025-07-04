import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard";
import moment from "moment";
const RecentIncome = ({transactions,onSeeMore}) => {
  return(
   <div className="card">
    <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>See All <LuArrowRight className="text-base"/></button>
    </div>
    <div className="mt-6">
       {transactions?.slice(0,5)?.map((item)=>(
        <TransactionInfoCard
        key={item._id}
        type="income"
        title={item.source}
        amount={item.amount}
        date={moment(item.date).format("Do MMM YYYY")}
        icon={item.icon}
        hideDeleteBtn
        // category={item.category}
        />
       ))}
    </div>
    </div> 
  )
}
export default RecentIncome