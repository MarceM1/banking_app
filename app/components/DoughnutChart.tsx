'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  // console.log('accounts in DoughnutChart: ', accounts)
  // const accountNames = accounts?.map((a) => a.name)
  // const balances = accounts?.map((a) => a.currentBalance)
  // console.log({ accountNames: accountNames, balances: balances })
  // console.log('accounts.name: ', accounts[0].name)
  // console.log('accounts.currentBalance: ', accounts[0].currentBalance)

  //accounts is array inside another array. This method crush accounts in one single array
  const flattenedAccounts = accounts?.flat() || [];
  const accountNames = flattenedAccounts.map((a) => a.name);
  const balances = flattenedAccounts.map((a) => a.currentBalance);

  

  const data = {
    datasets: [
      {
        label: 'Banks',
        data: balances,
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
      }
    ],
    labels: accountNames
  }

  return (
    <Doughnut data={data}
      options={{
        cutout: '80%',
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  )
}

export default DoughnutChart