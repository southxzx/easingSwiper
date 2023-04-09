import React, {useEffect} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IAnimatedPaginationProps {
  duration: number;
  isActive: boolean;
  dotColor: string;
  activeDotColor: string;
}

const AnimatedPagination: React.FC<IAnimatedPaginationProps> = ({
  duration,
  isActive,
  dotColor,
  activeDotColor,
}) => {
  const fadingAnimationValue = useSharedValue(dotColor);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(fadingAnimationValue.value, {
        duration,
        easing: Easing.ease,
      }),
    };
  });

  useEffect(() => {
    fadingAnimationValue.value = isActive ? activeDotColor : dotColor;
  }, [isActive]);

  return (
    <Animated.View
      style={[
        {
          width: 8,
          height: 8,
          borderRadius: 8,
          marginHorizontal: 4,
        },
        animatedStyle,
      ]}
    />
  );
};

export default AnimatedPagination;
