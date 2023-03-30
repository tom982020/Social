/** @format */

'use client';

import { Button } from "@mantine/core";

type ChildProps = {
    text: string;
    size: string | null;
    color: string;
    icon: any;
}

const ButtonCore: React.FC<ChildProps> = (props) => {
    return (
        <Button variant="light" leftIcon={props.icon} radius="md" color={props.color}>
            {props.text}
        </Button>
    )
}

export default ButtonCore;