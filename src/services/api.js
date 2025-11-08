export const fetchMessagesInRange = async (startDate, endDate) => {
  const startISO = startDate.toISOString();
  const endISO = endDate.toISOString();

  const res = await fetch(
    `http://localhost:9999/api/messages/range?start=${startISO}&end=${endISO}`
  );

  if (!res.ok) {
    throw new Error("Error fetching data");
  }

  return res.json();
};
