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
      <div className="flex min-w-fit flex-col">
        <span className="text-night whitespace-nowrap font-bold">{title}</span>
        <span className="min-w-fit whitespace-nowrap text-[mid-dark]">
          {value}
        </span>
      </div>
    </div>
  );
};
