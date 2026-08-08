"use client";
import React, { useState, useEffect } from "react";

export const ComingSoonCountdown: React.FC = () => {
  // Target: 28 days from now
  const [timeLeft, setTimeLeft] = useState({
    days: 28,
    hours: 23,
    minutes: 59,
    seconds: 54,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  return (
    <div className="my-8 text-center space-y-2">
      <div className="text-4xl font-extrabold text-brand-500 sm:text-5xl md:text-6xl tracking-wider">
        <span>{formatNumber(timeLeft.days)}</span>
        <span className="mx-2 font-normal text-brand-400">:</span>
        <span>{formatNumber(timeLeft.hours)}</span>
        <span className="mx-2 font-normal text-brand-400">:</span>
        <span>{formatNumber(timeLeft.minutes)}</span>
        <span className="mx-2 font-normal text-brand-400">:</span>
        <span>{formatNumber(timeLeft.seconds)}</span>
      </div>

      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        {timeLeft.days} days left
      </p>
    </div>
  );
};
