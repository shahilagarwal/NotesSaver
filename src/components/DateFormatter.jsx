import React from "react";

const DateFormatter = ({ isoDate }) => {
  const formattedDate = new Date(isoDate).toLocaleString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

  return <div>{formattedDate}</div>;
};

export default DateFormatter;
