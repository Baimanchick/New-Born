import {BaseButtonProps} from "antd/es/button/button";
import React from "react";

export interface ButtonProps extends BaseButtonProps{
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    appearance: "yellow" | "blue"
}
