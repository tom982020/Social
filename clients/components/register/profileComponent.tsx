/** @format */

'use client';
import {
	Box,
	TextInput,
	Tooltip,
	Textarea,
	Text,
	Group,
	Button,
	Modal,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
	IconAlertCircle,
	IconCalendarTime,
	IconMapPins,
	IconNews,
	IconSignature,
} from '@tabler/icons';
import { IProfile } from 'constant/interface/IvalidationAccount';
import { useState } from 'react';
import 'dayjs/locale/vi';
import { DatePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';

type ChildProps = {
	// items: Item[];
	toggleState: (e: React.MouseEvent, active: number) => void;
	// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−^^^^^^^^^^^^^^^
};

const ProfileComponent: React.FC<ChildProps> = (props) => {
	const [actived, setActive] = useState(0);
	const [opened, handleOpen] = useDisclosure(false);

	const nextStep = () => {
		handleOpen.open();
	};

	const handleSubmit = (e: React.MouseEvent) => {
		handleOpen.open();
		props.toggleState(e, 2);
		setActive(1);
		handleOpen.close();
	};

	const prevStep = (e: React.MouseEvent) => {
		setActive(0);
		props.toggleState(e, 0);
	};

	const [validate, setValidate] = useState<IProfile>({
		nickname: '',
		DOB: '',
		BIO: '',
		destination: '',
	});

	const form = useForm({
		initialValues: {
			nickname: '',
			DOB: '',
			BIO: '',
			destination: '',
		},

		validate: {
			// nickname: (value) =>
			// value.length > 0 ? '' : 'Input your nickname',
			DOB: (value) => (value.length > 0 ? '' : 'Input your password'),
			// BIO: (value) => (/${0-9}/.test(value) ? '' : 'Input your username'),
			destination: (value) =>
				value.length > 0 ? '' : 'Input your phone number',
		},
	});
	return (
		<Box sx={{ maxWidth: '65%' }}>
			<form
				onSubmit={form.onSubmit(
					(values, _event) => {
						// setFormValues(values);
					},
					(validationErrors, _values, _event) => {
						setValidate({
							nickname: '',
							DOB: validationErrors.DOB ? validationErrors.DOB.toString() : '',
							BIO: '',
							destination: validationErrors.destination
								? validationErrors.destination.toString()
								: '',
						});
					}
				)}>
				<TextInput
					withAsterisk
					icon={<IconSignature size={16} />}
					label="Nick name"
					placeholder="nickname..."
					type={'text'}
					{...form.getInputProps('nickname')}
					rightSection={
						validate.nickname ? (
							<Tooltip
								label={validate.nickname}
								position="top-end"
								color="red"
								withArrow>
								<div>
									<IconAlertCircle
										size={18}
										style={{ display: 'block', opacity: 0.5 }}
									/>
								</div>
							</Tooltip>
						) : null
					}
				/>
				<Textarea
					withAsterisk
					icon={<IconNews size={16} />}
					label="BIO"
					autosize
					minRows={1.5}
					maxRows={2}
					placeholder="your BIO..."
					{...form.getInputProps('BIO')}
					rightSection={
						validate.BIO ? (
							<Tooltip
								label={validate.BIO}
								position="top-end"
								color="red"
								withArrow>
								<div>
									<IconAlertCircle
										size={18}
										style={{ display: 'block', opacity: 0.5 }}
									/>
								</div>
							</Tooltip>
						) : null
					}
				/>

				<DatePicker
					withAsterisk
					locale="vi"
					icon={<IconCalendarTime size={16} />}
					placeholder="Pick a date"
					label="DOB"
					defaultValue={new Date()}
					{...form.getInputProps('DOB')}
				/>

				<TextInput
					withAsterisk
					type={'text'}
					icon={<IconMapPins size={16} />}
					label="Destination"
					placeholder="your destination..."
					{...form.getInputProps('destination')}
					rightSection={
						validate.destination ? (
							<Tooltip
								label={validate.destination}
								position="top-end"
								color="red"
								withArrow>
								<div>
									<IconAlertCircle
										size={18}
										style={{ display: 'block', opacity: 0.5 }}
									/>
								</div>
							</Tooltip>
						) : null
					}
				/>
			</form>

			<Group
				position="center"
				mt="xl">
				{actived ? (
					<Button
						variant="default"
						onClick={(e) => prevStep(e)}>
						Back
					</Button>
				) : (
					''
				)}
				<Button onClick={nextStep}>nextStep</Button>
			</Group>

			<Modal
				opened={opened}
				onClose={() => handleOpen.close()}
				transition="slide-down"
				transitionDuration={600}
				transitionTimingFunction="ease"
				size="auto"
				centered>
				<Text mx="auto">Are your sure create ?</Text>

				<Group
					mt="xl"
					position="right">
					<Button
						variant="light"
						color="teal"
						onClick={(e) => handleSubmit(e)}>
						Submit
					</Button>
					<Button
						variant="light"
						color="red"
						onClick={() => handleOpen.close()}>
						Cancel
					</Button>
				</Group>
			</Modal>
		</Box>
	);
};
export default ProfileComponent;
