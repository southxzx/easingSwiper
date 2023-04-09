import {memo, useEffect} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';

interface AnimatedSwiperItemProps {
  fadingValue: number;
  children: React.ReactNode;
  duration: number;
}

const AnimatedSwiperItem: React.FC<AnimatedSwiperItemProps> = ({
  fadingValue,
  children,
  duration,
}) => {
  const fadingAnimationValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(fadingAnimationValue.value, {
        duration,
        easing: Easing.ease,
      }),
    };
  });

  useEffect(() => {
    fadingAnimationValue.value = fadingValue;
  }, [fadingValue]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

export default memo(AnimatedSwiperItem, (prev, next) => {
  return prev.fadingValue === next.fadingValue;
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
});
