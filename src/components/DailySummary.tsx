import React from "react"
import { useGetDailySummaryQuery } from "../store/api"

const DailySummary: React.FC<{ employeeId: string; date: string }> = ({
  employeeId,
  date,
}) => {
    console.log("employeeId3", employeeId)

  const { data, error, isLoading } = useGetDailySummaryQuery({
    employeeId,
    date,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading daily summary</div>

  return (
    <div className="p-4 mb-4 bg-white border-2 rounded">
      <h2 className="mb-4 text-xl font-bold">Daily Summary</h2>
      <p>Total Hours: {data?.totalHours}</p>
      <p>Remaining Hours: {data?.remainingHours}</p>
    </div>
  )
}

export default DailySummary
