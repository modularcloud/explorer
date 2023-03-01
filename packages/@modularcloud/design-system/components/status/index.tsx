import * as React from 'react';
import clsx from 'clsx';
import { GreenTick, RedCross } from '../../icons';

type Props = {
  children?: React.ReactNode;
  status: any;
  mode?: string;
};

export function Status({ children, status, mode }: Props) {
    const isSuccess = !!status && (status !== "Failure" || Number(status) === 0);
    
    return mode === "icon" ? (isSuccess ? <GreenTick /> : <RedCross />) :
    
    <div className={clsx("flex gap-2 items-center", isSuccess ? "text-specialty-green" : "text-specialty-red")}>
        {isSuccess ? <GreenTick /> : <RedCross />}
        { children ?? (isSuccess ? "Success" : "Failure") }
    </div>
}