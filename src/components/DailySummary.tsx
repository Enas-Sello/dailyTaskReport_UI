import React from "react"
import { useGetDailySummaryQuery } from "../store/api"
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { DialogDescription, DialogHeader } from "./ui/dialog"

const DailySummary: React.FC<{ employeeId: string; date: string }> = ({
  employeeId,
  date,
}) => {
  const { data, error, isLoading } = useGetDailySummaryQuery({
    employeeId,
    date,
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading daily summary</div>

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <DialogClose className="flex justify-end w-full">
        <X className="h-6 w-6" />
      </DialogClose>

      <DialogDescription>
        <p>Total Hours: {data?.totalHours}</p>
      </DialogDescription>
      <DialogDescription>
      <p>Remaining Hours: {data?.remainingHours}</p>
      </DialogDescription>
    </div>
  )
}

export default DailySummary
