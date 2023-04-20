/** @format */

import { Button } from '@nextui-org/react';
import React, { ReactEventHandler } from 'react';

type ChildProps = {
	color: any;
	text: string;
	icon: any | null;
	iconRight: any | null;
	size: any;
	Click: (e:ReactEventHandler)=>void;
};
const ButtonCore: React.FC<ChildProps> = (props) => {
	return (
		<Button
			style={{margin: '5px'}}
			flat
			icon={props.icon}
			iconRight={props.iconRight}
			color={props.color}
			size={props.size}
			onPress={(e:any) => props.Click(e)}
			// shadow="true"
			auto>
			{props.text}
		</Button>
	);
};

export default ButtonCore;
