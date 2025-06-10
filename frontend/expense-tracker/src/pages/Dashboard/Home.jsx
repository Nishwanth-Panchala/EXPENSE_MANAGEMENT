import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout"
import { useUserAuth } from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useEffect } from "react";
import { LuHandCoins,LuWalletCards } from "react-icons/lu";
import {IoMdCard} from "react-icons/io"
import { addThousandsSeperator } from "../../utils/helper";
import InfoCard from "../../components/Cards/InfoCard";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions"
import RecentIncomeWithChart from "./RecentIncomeWithChart";
import RecentIncome from "./RecentIncome.JSX";
import Last30daysExpenses from "./Last30daysExpenses";
const Home=()=>{
  useUserAuth()

  const navigate=useNavigate()
  const[dashboardData,setDashboardData]=useState(null)
  const[loading,setLoading]=useState(false)
  const fetchDashboardData=async()=>{
    if(loading) return

    setLoading(true)
    try{
      const response=await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`)
      console.log(response.data)
      if(response.data)
      {
        setDashboardData(response.data)
      }
    }
    catch(error)
    {
      console.log("Something went wrong please try again",error)
    }
    finally
    {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchDashboardData()
    
  },[])
  return(
    
    <DashboardLayout activeMenu="Dashboard">
          <div className="my-5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
              icon={<IoMdCard/>}
              label="Total Balance"
              value={addThousandsSeperator(dashboardData?.totalBalance ||0)}
              color="bg-primary"
              />
               <InfoCard
              icon={<LuWalletCards />}
              label="Total Income"
              value={addThousandsSeperator(dashboardData?.totalIncome||0)}
              color="bg-orange-500"
              />
              <InfoCard
              icon={<LuHandCoins/>}
              label="Total Expense"
              value={addThousandsSeperator(dashboardData?.totalExpense||0)}
              color="bg-red-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentTransactions
               transactions={dashboardData?.recentTransactions}
               onSeeMore={()=>navigate("/expense")}
               />
               <FinanceOverview
               totalBalance={dashboardData?.totalBalance ||0}
               totalIncome={dashboardData?.totalIncome||0}
               totalExpense={dashboardData?.totalExpense ||0}
               />
               <ExpenseTransactions
               transactions={dashboardData?.last30daysExpenses?.transactions || []}
               onSeeMore={()=>navigate("/expense")}
               />
               <Last30daysExpenses
                  data={dashboardData?.last30daysExpenses?.transactions || []}
                  />
               <RecentIncomeWithChart
               data={dashboardData?.last60daysIncome?.transactions?.slice(0,4) || []}
               totalIncome={dashboardData?.totalIncome || 0}
               />
               <RecentIncome 
                  transactions={dashboardData?.last60daysIncome?.transactions || []}
                  onSeeMore={()=>navigate("/income")}
                  />
            </div>
           
               {/* <ExpenseTransactions
               transactions={dashboardData?.last30daysExpenses?.transactions || []}
               onSeeMore={()=>navigate("/expense")}
               />
               <RecentIncomeWithChart
               data={dashboardData?.last60daysIncome?.transactions?.slice(0,4) || []}
               totalIncome={dashboardData?.totalIncome || 0}
               />
               <RecentIncome 
                  transactions={dashboardData?.last60daysIncome?.transactions || []}
                  onSeeMore={()=>navigate("/income")}
                  /> */}
            
           
            </div>
    </DashboardLayout>

  )
}
export default Home;