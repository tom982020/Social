import { useSpring, animated } from '@react-spring/web';

type ChildProps = {
    child: any;
}

const AnimationCore: React.FC<ChildProps> = (props) => {
    const springs = useSpring({
		from: { opacity: 0,},
        to: { opacity: 1 },
        delay: 500,
	});
    return (
        <animated.div
            style={{
                height:'100%',
				...springs,
            }}>
            
            {props.child}
            </animated.div>
    )
}

export default AnimationCore