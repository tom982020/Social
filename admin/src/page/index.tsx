/** @format */

import { Outlet } from 'react-router-dom';
import { Breadcrumb, Layout, theme } from 'antd';
import { HeaderComponent } from '../components/headerComponent';
import { NavbarComponent } from '../components/navbarComponent';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;


export const LayoutComponent = () => {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout style={{ minHeight: '100vh', minWidth:'100%' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}>
				<NavbarComponent visible={collapsed} />
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: 5, background: colorBgContainer }}>
					<HeaderComponent toggleSidebar={(visible) => setCollapsed(visible)} />
				</Header>
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div
						style={{
							padding: 24,
							minHeight: 360,
							background: colorBgContainer,
						}}>
						Bill is a cat.
					</div>
					<Outlet />
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					Ant Design ©2023 Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};
