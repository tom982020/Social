/** @format */

import {
	Col,
	Row,
	Typography,
	Image,
	Form,
	Input,
	message,
	Button,
} from 'antd';
import Login from '../../asset/group-friends-chilling-with-smartphones-outside 1.png';
import './index.scss';
import { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { AxiosService } from '../../api/axiosClient';
import Cookies from 'js-cookie';
import { AnimationCore } from '../../core/Animation';
import { Navigate, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
type SizeType = Parameters<typeof Form>[0]['size'];
const stylesButton: any = {
	backgroundColor: '#FFCA64',
	textAlign: '-webkit-center',
	color: '#1A1A1A',
};
export const SignInComponent = () => {
	const [componentSize, setComponentSize] = useState<SizeType | 'default'>(
		'default'
	);
	// const [form] = Form.useForm();
	const api = new AxiosService();
	const navigate = useNavigate();
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 360000);

	const onFormLayoutChange = ({ size }: { size: SizeType }) => {
		setComponentSize(size);
		console.log(size);
	};

	const onFinish = async (values: any) => {
		await api
			.postData('login', values)
			.then((response: any) => {
				console.log(response);
				if (response.status === 201) {
					Cookies.set('token', response.data.refresh_token, {
						expires: expirationDate,
						secure: true,
						path: '',
					});
					message.success('Submit success!');
					navigate('/')
				}
			})
			.catch((error) => {
				console.log(error);
				message.error('Submit failed!');
			});
	};

	const onFinishFailed = () => {
		message.error('Submit failed!');
	};

	return (
		<AnimationCore
			visible={false}
			children={
				<div className="w-full h-screen">
					<Row
						style={{ width: '100%', minHeight: '100%' }}
						justify="space-around"
						className="mobile:hidden tablet:flex desktop:flex"
						align="middle">
						<Col
							flex={1}
							span={12}
							offset={0}>
							<Row
								justify="space-around"
								// align="middle"
								style={{
									width: '100%',
									borderRadius: '25px',
									boxShadow: '3px 2px 8px 3px rgba(0, 0, 0, 0.25)',
								}}>
								<Col span={14}>
									<Row style={{ height: '30%' }}></Row>
									<Row
										justify="space-around"
										align="middle">
										<Col>
											<Title
												level={3}
												style={{ marginBottom: 0 }}>
												Sign In
											</Title>
										</Col>
									</Row>
									<Row
										justify="space-around"
										align="middle">
										<Col>
											<Text>Welcome back!</Text>
										</Col>
									</Row>
									<Row
										justify="space-around"
										align="middle">
										<Col span={20}>
											<Form
												layout="horizontal"
												onFinish={onFinish}
												onFinishFailed={onFinishFailed}
												style={{ marginTop: 16, width: '100%' }}>
												<Form.Item
													name={['username']}
													rules={[
														{ required: true, message: 'Missing first name' },
													]}>
													<Input
														size="large"
														prefix={<FiUser />}
														placeholder="Email or Phone number"
													/>
												</Form.Item>
												<Form.Item name={['password']}>
													<Input.Password
														size="large"
														prefix={<FiLock />}
														placeholder="Password"
													/>
												</Form.Item>
												<Form.Item style={{ paddingLeft: 6 }}>
													<Button
														style={stylesButton}
														type="default"
														ghost
														shape={'round'}
														block={true}
														htmlType="submit">
														Submit
													</Button>
												</Form.Item>
											</Form>
										</Col>
									</Row>
								</Col>
								<Col span={10}>
									<Image
										preview={false}
										width={'100%'}
										height={'100%'}
										style={{ borderRadius: '0 25px 25px 0' }}
										src={Login}
									/>
								</Col>
							</Row>
						</Col>
					</Row>
					<div className="background-mobile mobile:block tablet:hidden h-full">
						<div className="background-black"></div>
						<Row
							justify="space-around"
							style={{ position: 'relative', zIndex: 2 }}
							align="middle">
							<Col
								span={24}
								offset={2}>
								<Image />
							</Col>
						</Row>
						<Row
							justify="space-around"
							style={{ position: 'relative', zIndex: 2 }}
							align="middle">
							<Col
								span={24}
								offset={2}>
								<Title style={{ color: 'white', margin: 0 }}>Sign In</Title>
								<Text style={{ color: 'white' }}>Welcome back!</Text>
							</Col>
							<Col
								span={24}
								offset={2}>
								<Form
									labelCol={{ span: 4 }}
									wrapperCol={{ span: 24 }}
									layout="horizontal"
									initialValues={{ size: componentSize }}
									onValuesChange={onFormLayoutChange}
									size={componentSize as SizeType}
									style={{ marginTop: 16, width: '90%' }}>
									<Form.Item style={{ paddingLeft: 6 }}>
										<Input
											size="large"
											prefix={<FiUser />}
											placeholder="Email or Phone number"
										/>
									</Form.Item>
									<Form.Item style={{ paddingLeft: 6 }}>
										<Input.Password
											size="large"
											prefix={<FiLock />}
											placeholder="Password"
										/>
									</Form.Item>
								</Form>
							</Col>
							<Col></Col>
							<Col></Col>
							<Col></Col>
						</Row>
					</div>
				</div>
			}
		/>
	);
};
