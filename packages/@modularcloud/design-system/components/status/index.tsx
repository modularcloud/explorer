import * as React from 'react';
import clsx from 'clsx';
import { GreenTick, RedCross } from '../../icons';

type Props = {
  children?: React.ReactNode;
  status: boolean;
  mode?: string;
};

export function Status({ children, status, mode }: Props) {
  console.log("status", status)
    return mode === "icon" ? (status ? <GreenTick /> : <RedCross />) :
    
    <div className={clsx("flex gap-2 items-center", status ? "text-specialty-green" : "text-specialty-red")}>
        {status ? <GreenTick /> : <RedCross />}
        { children ?? (status ? "Success" : "Failure") }
    </div>
}