"use client";
import { useEffect, useState } from "react";

// We need to manually format the dates due to discrepencies between the server and client
function padNumber(num: number, digits = 2) {
  return String(num).padStart(digits, "0");
}

function getUTCFullTime(date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let amPm = "AM";
  let adjustedHour = hour;

  if (hour >= 12) {
    amPm = "PM";
    if (hour > 12) {
      adjustedHour = hour - 12;
    }
  } else if (hour === 0) {
    adjustedHour = 12;
  }

  const formattedDate = `${monthNames[month]} ${day}, ${year} at ${padNumber(
    adjustedHour
  )}:${padNumber(minute)} ${amPm}`;
  return formattedDate;
}

function getUTCCompactTime(currentDate: Date, date: Date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let amPm = "AM";
  let adjustedHour = hour;

  if (hour >= 12) {
    amPm = "PM";
    if (hour > 12) {
      adjustedHour = hour - 12;
    }
  } else if (hour === 0) {
    adjustedHour = 12;
  }

  // not giving second-level precision on server side to avoid rehydration issues
  if (currentDate.getTime() - date.getTime() < 1000 * 60) {
    return "now";
  }

  // if it's today, show the time (omit seconds)
  if (currentDate.getDate() === date.getDate()) {
    return `${padNumber(adjustedHour)}:${padNumber(minute)} ${amPm}`;
  }

  // if it's this year, show the date (omit year)
  if (currentDate.getFullYear() === date.getFullYear()) {
    return `${monthNames[month]} ${day}`;
  }

  // if it's another year, show the year only
  else {
    return `${year}`;
  }
}

type Props = {
  datetime: number;
};

export function CompactDate({ datetime }: Props) {
  const currentDate = new Date();
  const date = new Date(datetime);

  const [fullTime, setFullTime] = useState(getUTCFullTime(date));
  const [compactTime, setCompactTime] = useState(
    getUTCCompactTime(currentDate, date)
  );

  // run once to get locale time and start timeout
  useEffect(() => {
    // use browser time settings
    setFullTime(
      date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    );

    // if it's less than 1 minutes ago, show "Xs ago"
    if (currentDate.getTime() - date.getTime() < 1000 * 60) {
      setCompactTime(
        `${Math.floor((currentDate.getTime() - date.getTime()) / 1000)}s ago`
      );
      // if the time difference is less than 1 minute, re-render after another minute
      const timeout = setTimeout(() => {
        setCompactTime(
          date.toLocaleTimeString(undefined, {
            hour: "numeric",
            minute: "numeric",
          })
        );
      }, 1000 * 60);
      return () => clearTimeout(timeout);
    }

    // if it's today, show the time (omit seconds)
    if (currentDate.getDate() === date.getDate()) {
      setCompactTime(
        date.toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "numeric",
        })
      );
    }

    // if it's this year, show the date (omit year)
    if (currentDate.getFullYear() === date.getFullYear()) {
      setCompactTime(
        date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })
      );
    }

    // if it's another year, show the year only
    if (currentDate.getFullYear() !== date.getFullYear()) {
      setCompactTime(
        date.toLocaleDateString(undefined, {
          year: "numeric",
        })
      );
    }
  }, []);

  return (
    <>
      <time className="hidden xl:block" dateTime={fullTime}>
        {fullTime}
      </time>
      <time className="xl:hidden" dateTime={fullTime}>
        {compactTime}
      </time>
    </>
  );
}
