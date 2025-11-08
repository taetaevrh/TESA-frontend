import { useState } from "react";
import { Tab } from "@headlessui/react";
import { useMQTTListener } from "./hooks/useMQTTListener";
import { fetchMessagesInRange } from "./services/api";
import DateRangePicker from "./components/DateRangePicker";

function App() {
  const [liveMessages, setLiveMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Live MQTT Listener
  useMQTTListener((data) => setLiveMessages((prev) => [data, ...prev]));

  const loadHistory = async () => {
    const data = await fetchMessagesInRange(startDate, endDate);
    setHistoryMessages(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        📡 MQTT Dashboard
      </h1>
      <p className="text-gray-600 mb-4">Broker: 192.168.191.63:1883</p>

      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mb-6">
          {["Live", "History"].map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `w-full py-2.5 text-sm font-medium text-blue-700 rounded-lg ${
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/20"
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Live Tab */}
          <Tab.Panel>
            <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
              {liveMessages.map((msg, i) => (
                <div
                  key={i}
                  className="border-b border-gray-200 py-2 text-gray-700"
                >
                  <div className="flex justify-between items-center gap-10">
                    <div>
                      <div>
                        <b>Topic:</b> {msg.topic}
                      </div>
                      <div>
                        <b>Message:</b> {msg.payload}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      ({new Date(msg.createdAt).toLocaleString()})
                    </div>
                  </div>
                </div>
              ))}
              {liveMessages.length === 0 && (
                <p className="text-center text-gray-500">
                  No live messages yet...
                </p>
              )}
            </div>
          </Tab.Panel>

          {/* History Tab */}
          <Tab.Panel>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onFetch={loadHistory}
            />
            <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
              {historyMessages.map((msg, i) => (
                <div
                  key={i}
                  className="border-b border-gray-200 py-2 text-gray-700"
                >
                  <b>Topic:</b> {msg.topic} &nbsp;&nbsp;
                  <b>Message:</b> {msg.payload} &nbsp;&nbsp;
                  <span className="text-xs text-gray-500">
                    ({new Date(msg.createdAt).toLocaleString()})
                  </span>
                </div>
              ))}
              {historyMessages.length === 0 && (
                <p className="text-center text-gray-500">
                  Load history to view messages.
                </p>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default App;
