import {ButtonProps as BtnPropsAntd} from "antd/es/button/button";
import React from "react";

export interface ButtonProps extends BtnPropsAntd{
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    appearance: "yellow" | "blue" | "lightBlue",
}
