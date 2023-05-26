/** @format */

import { Button, Tooltip, Space } from 'antd';
import { ConstantsColor } from '../constant/color';
type ChildProps = {
	icon: any;
	text: string;
	size: any;
	color: any;
	block: boolean | null;
	shape: any | null;
	Click: () => void;
};

export const ButtonCore: React.FC<ChildProps> = (props) => {
	const buttonStyle: any = ConstantsColor.button.filter((item) => {
		if (item.text == props.color) {
			return item;
		}
	});
	return (
		<Button
			style={buttonStyle[0]}
			type="default"
			ghost
			shape={props.shape ? props.shape : 'round'}
			block={props.block ? props.block : false}
			onClick={props.Click}
			size={props.size}
			icon={props.icon}>
			{props.text != '' ? props.text : undefined }
		</Button>
	);
};
