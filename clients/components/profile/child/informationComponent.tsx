/** @format */

'use client';

import { Box, Grid, Text } from '@mantine/core';
import { IProfileRequest } from 'constant/interface/IvalidationAccount';

type ChildProps = {
	data: IProfileRequest;
};

const InformationComponent: React.FC<ChildProps> = (props) => {
	return (
		<Box>
			<Grid>
				<Grid.Col span={4}>
					<Text
						sx={(theme) => ({
							color:
								theme.colorScheme === 'dark'
									? theme.colors.white
									: theme.colors.gray[6],
						})}>
						{' '}
						Nick name{' '}
					</Text>
				</Grid.Col>

				<Grid.Col span={8}>{props.data.nickname}</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={4}>
					<Text
						sx={(theme) => ({
							color:
								theme.colorScheme === 'dark'
									? theme.colors.white
									: theme.colors.gray[6],
						})}>
						{' '}
						BIO{' '}
					</Text>
				</Grid.Col>

				<Grid.Col span={8}>{props.data.BIO}</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={4}>
					<Text
						sx={(theme) => ({
							color:
								theme.colorScheme === 'dark'
									? theme.colors.white
									: theme.colors.gray[6],
						})}>
						BirthDay{' '}
					</Text>
				</Grid.Col>

				<Grid.Col span={8}>{props.data.DOB}</Grid.Col>
			</Grid>
			<Grid>
				<Grid.Col span={4}>
					<Text
						sx={(theme) => ({
							color:
								theme.colorScheme === 'dark'
									? theme.colors.white
									: theme.colors.gray[6],
						})}>
						{' '}
						destination{' '}
					</Text>
				</Grid.Col>

				<Grid.Col span={8}>{props.data.destination}</Grid.Col>
			</Grid>

			<Grid>
				<Grid.Col span={4}>
					<Text
						sx={(theme) => ({
							color:
								theme.colorScheme === 'dark'
									? theme.colors.white
									: theme.colors.gray[6],
						})}>
						{' '}
						follow{' '}
					</Text>
				</Grid.Col>

				<Grid.Col span={8}>{props.data.follow}</Grid.Col>
            </Grid>
            
            <Grid>
				<Grid.Col span={4}>
					<Text
						sx={(theme) => ({
							color:
								theme.colorScheme === 'dark'
									? theme.colors.white
									: theme.colors.gray[6],
						})}>
						{' '}
						Email{' '}
					</Text>
				</Grid.Col>

				<Grid.Col span={8}>{props.data.authors.email}</Grid.Col>
			</Grid>
		</Box>
	);
};

export default InformationComponent;
