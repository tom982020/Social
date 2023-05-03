/** @format */

import { useSpring, animated } from '@react-spring/web';

type ChildProps = {
	children: any;
	visible: boolean;
};

export const AnimationCore: React.FC<ChildProps> = (prop) => {
	const springs = useSpring({
		from: { opacity: 0 },
		to: { opacity: prop.visible ? 0 : 1 },
		delay: 200,
	});

	return (
		<animated.div
			style={{
				...springs,
			}}>
			{prop.children}
		</animated.div>
	);
};
