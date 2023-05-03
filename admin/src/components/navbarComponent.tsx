/** @format */

import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Menu, Space, Typography } from 'antd';
import type { MenuProps } from 'antd';
import { AnimationCore } from '../core/Animation';
const { Title, Paragraph, Text, Link } = Typography;

type ChildProps = {
	visible: boolean;
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('Option 1', '1', <PieChartOutlined />),
	getItem('Option 2', '2', <DesktopOutlined />),
	getItem('User', 'sub1', <UserOutlined />, [
		getItem('Tom', '3'),
		getItem('Bill', '4'),
		getItem('Alex', '5'),
	]),
	getItem('Team', 'sub2', <TeamOutlined />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8'),
	]),
	getItem('Files', '9', <FileOutlined />),
];

export const NavbarComponent: React.FC<ChildProps> = (props) => {
	return (
		<div className="">
			<div
				style={{
					padding: '10px',
					textAlign: props.visible ? 'center' : 'start',
				}}>
				<Space>
					<Avatar
						style={{
							backgroundColor: 'GrayText',
						}}
						shape="circle"
						icon={<UserOutlined />}
					/>

					<AnimationCore
						children={
							props.visible ? undefined : (
								<Text style={{ color: '#ffffff', fontSize: '18px' }}>
									SuperAdmin
								</Text>
							)
						}
						visible={props.visible}
					/>
				</Space>
			</div>

			<Menu
				theme="dark"
				defaultSelectedKeys={['1']}
				mode="inline"
				items={items}
			/>
		</div>
	);
};
