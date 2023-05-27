"use client";
import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  value: string;
};
export const SummaryPresenter: React.FC<Props> = ({ icon, title, value }) => {
  return (
    <div className="flex items-start justify-start gap-2">
      <div className="mt-[6px]">{icon}</div>
      <div className="flex flex-col min-w-fit">
        <span className="font-bold text-night whitespace-nowrap">{title}</span>
        <span className="text-[mid-dark] whitespace-nowrap min-w-fit">
          {value}
        </span>
      </div>
    </div>
  );
};
