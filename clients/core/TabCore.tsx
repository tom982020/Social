/** @format */

import { Card, Tabs, Transition } from '@mantine/core';
import { IconMessageCircle, IconPhoto } from '@tabler/icons';
import { useEffect, useState } from 'react';

type ChildProps = {
	dataLists: string[];
	dataPanel: any[] | undefined;
};
const TabCore: React.FC<ChildProps> = (props) => {
	const [opened, setOpened] = useState(0);
	const [dataPanel, setDataPanel] = useState<any[]>();
	return (
		<Tabs
			color="green"
			defaultValue="0"
			my={'2%'}>
			<Tabs.List
				grow
				position="center">
				{props.dataLists.map((list, index) => (
					<Tabs.Tab
						key={index}
						value={index.toString()}
						onClick={(e) => setOpened(index)}>
						{list}
					</Tabs.Tab>
				))}
			</Tabs.List>
			{props.dataPanel !=undefined ? props.dataPanel.map((data,index) => (
				<Tabs.Panel
					key={index}
					value={index.toString()}
					pt="xs">
					<Transition
						mounted={opened === index ? true : false}
						transition="slide-right"
						duration={400}
						timingFunction="ease">
						{(styles) => <div key={index} style={{ padding: 20 }}>{data}</div>}
					</Transition>
				</Tabs.Panel>
			)) : null}
		</Tabs>
	);
};

export default TabCore;
