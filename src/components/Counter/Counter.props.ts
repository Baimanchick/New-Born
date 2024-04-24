import React from "react";

export interface CounterProps extends React.HTMLAttributes<HTMLElement>{
    initialValue?: number;
    onIncrement?: (newCount: number) => void;
    onDecrement?: (newCount: number) => void;
}
