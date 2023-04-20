import { useSpring, animated } from '@react-spring/web';

type ChildProps = {
    child: any;
    visible: boolean;
}

const AnimationClickCore: React.FC<ChildProps> = (props) => {
    const springs = useSpring({
		from: { x: -400, opacity: 0},
        to: { x: props.visible ? 0 : -400 , opacity: props.visible ? 1 : 0},
        delay: 300,
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

export default AnimationClickCore