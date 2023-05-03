/** @format */

import { useState } from 'react';
import { ButtonCore } from '../core/Button';
import { BsTextIndentLeft, BsTextIndentRight } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { Avatar, Badge, Col, Row, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

type ChildProps = {
	toggleSidebar: (visible: boolean) => void;
};

export const HeaderComponent: React.FC<ChildProps> = (props) => {
	const [visible, setVisible] = useState(true);

	return (
		<div className="">
			<Row>
				<Col flex={1}>
					<ButtonCore
						icon={
							visible ? (
								<BsTextIndentRight size={26} />
							) : (
								<BsTextIndentLeft size={26} />
							)
						}
						text=""
						size={'large'}
						color={'info'}
						Click={() => {
							setVisible(!visible);
							props.toggleSidebar(visible);
						}}
					/>
				</Col>
				<Col flex={3}>
					<Space size={20}  style={{ float: 'right',width: '100%' }}>
						
					</Space>
				</Col>
			</Row>
		</div>
	);
};
