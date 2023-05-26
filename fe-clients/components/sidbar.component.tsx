/** @format */

import { Card, Text } from '@nextui-org/react';

const SidebarComponent = () => {
	return (
		<div className="absolute z-9999 top-0">
			<Card style={{width : '80%'}}>
				<Card.Body>
					<Text>Default card. (shadow)</Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default SidebarComponent;
