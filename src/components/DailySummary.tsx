import { useGetDailySummaryQuery } from "@/store/api"
import React, { useState } from "react"

const DailySummary: React.FC = () => {
  const [employeeId, setEmployeeId] = useState("")
  const [date, setDate] = useState("")
  const { data, error, isLoading } = useGetDailySummaryQuery(
    { employeeId, date },
    { skip: !employeeId || !date }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Daily Summary</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching summary</p>}
      {data && (
        <div>
          <p>Total Hours: {data.totalHours}</p>
          <p>Remaining Hours: {data.remainingHours}</p>
        </div>
      )}
    </div>
  )
}

export default DailySummary
