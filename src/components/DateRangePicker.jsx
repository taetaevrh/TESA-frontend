import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onFetch,
}) => (
  <div className="bg-white rounded-xl shadow-md p-4 mb-6 w-full max-w-2xl">
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      <div>
        <label className="block text-sm">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          showTimeSelect
          dateFormat="Pp"
          className="border px-2 py-1 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm">End Date</label>
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          showTimeSelect
          dateFormat="Pp"
          className="border px-2 py-1 rounded-md"
        />
      </div>
      <button
        onClick={onFetch}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Load History
      </button>
    </div>
  </div>
);

export default DateRangePicker;
