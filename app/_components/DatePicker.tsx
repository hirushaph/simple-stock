import { getFormatedDate } from "@/utils/helpers";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function DatePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DateRange | undefined>();

  function handleDatePickerChange(date: DateRange | undefined) {
    setSelected(date);
  }

  function handleDatePickerClose() {
    setSelected(undefined);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <div
        className="px-2 py-1 bg-white text-[0.8rem] rounded-sm cursor-pointer border"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected?.from && selected?.to
          ? getFormatedDate(selected.from) +
            " - " +
            getFormatedDate(selected.to)
          : "Date Range"}
      </div>

      {isOpen && (
        <div className="absolute bg-white right-0 shadow-md p-2 rounded-md border z-10">
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={handleDatePickerChange}
            autoFocus
            footer={
              <div className="mt-2 flex justify-between">
                <div>
                  <button
                    className="bg-red-100 rounded-sm text-red-600 text-sm px-2 py-1"
                    onClick={handleDatePickerClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gray-100 rounded-sm text-gray-600 text-sm px-2 py-1"
                    onClick={() => setSelected(undefined)}
                  >
                    Reset
                  </button>
                </div>
                <button className="bg-blue-100 rounded-sm text-blue-600 text-sm px-3 py-1">
                  Done
                </button>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
