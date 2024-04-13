import React, { useState } from 'react';
import { Button as ButtonAntd, Flex } from 'antd';
import cn from "classnames";

import styles from './button.module.scss'


import { ButtonProps } from './Button.props'



export function Button({ children, appearance, className, icon = 'none', ...props }: ButtonProps) {
    return (
        <ButtonAntd
            {...props}
            className={cn(styles.button, className, {
                [styles.blue]: appearance == "blue",
                [styles.yellow]: appearance == "yellow",
                [styles.lightBlue]: appearance == "lightBlue"
            })}
        >
            <Flex gap={"small"} align={"center"}>
                {children} {icon != 'none' && icon}
            </Flex>
        </ButtonAntd>
    );
}

