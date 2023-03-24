/** @format */

import { Tabs } from '@mantine/core';
import { IconMessageCircle, IconPhoto } from '@tabler/icons';

type ChildProps = {
	data: [];
};
const Tab: React.FC<ChildProps> = (props) => {
	return (
		<Tabs
			color="green"
			defaultValue="gallery">
			<Tabs.List>
				<Tabs.Tab
					value="gallery"
					icon={<IconPhoto size="0.8rem" />}>
					Gallery
				</Tabs.Tab>
				<Tabs.Tab
					value="messages"
					icon={<IconMessageCircle size="0.8rem" />}>
					Messages
				</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel
				value="gallery"
				pt="xs">
				Gallery tab content
			</Tabs.Panel>

			<Tabs.Panel
				value="messages"
				pt="xs">
				Messages tab content
			</Tabs.Panel>
		</Tabs>
	);
};

export default Tab;
