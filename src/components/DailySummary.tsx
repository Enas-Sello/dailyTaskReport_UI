import React from "react";
import { useGetDailySummaryQuery } from "../store/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { DialogDescription, DialogFooter, DialogHeader } from "./ui/dialog";
import { Button } from "./ui/button";
import { formatHours } from "@/utils/DateTransform";

const DailySummary: React.FC<{ employeeId: string; date: string }> = ({
  employeeId,
  date,
}) => {
  const { data, error, isLoading } = useGetDailySummaryQuery({
    employeeId,
    date,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading daily summary</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Daily Summary</Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-80" />
      <DialogContent className="fixed p-6 bg-white rounded-lg shadow-md sm:max-w-[425px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4 justify-center items-center">
          <DialogClose className="flex justify-end w-full">
            <X className="h-6 w-6" />
          </DialogClose>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Daily Summary
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
          <DialogFooter>
            <div className="text-gray-800">
            <p className="mb-2">
            Total Hours:{" "}
                <span className="font-medium">
                  {formatHours(data?.totalHours as number)}
                </span>
              </p>
              <p className="mb-2">
              Remaining Hours: {" "}
                <span className="font-medium">
                  {formatHours(data?.remainingHours as number)}
                </span>
              </p>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DailySummary;
