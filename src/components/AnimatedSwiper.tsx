import React, {useCallback, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import useSwipe from '../hooks/useSwipe';
import AnimatedPagination from './AnimatedPagination';

import AnimatedSwiperItem from './AnimatedSwiperItem';

interface AnimatedSwiperProps {
  children: React.ReactNode;
  paginationStyle?: ViewStyle;
  duration?: number;
  dotColor?: string;
  activeDotColor?: string;
}

const AnimatedSwiper: React.FC<AnimatedSwiperProps> = ({
  children,
  paginationStyle,
  duration = 300,
  dotColor = '#000d37',
  activeDotColor = '#FFFFFF',
}) => {
  const childrenArray: React.ReactNode[] = Array.isArray(children)
    ? children
    : [children];
  const childrenLength = childrenArray.length;

  const [fadingValues, setFadingValues] = useState<number[]>(
    childrenArray.map((_, index) => (index === 0 ? 1 : 0)),
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const setFadingValue = useCallback(
    (isNext: boolean) => {
      const newFadingValues = [...fadingValues];
      newFadingValues[activeIndex] = 0;
      newFadingValues[activeIndex + (isNext ? 1 : -1)] = 1;
      setFadingValues(newFadingValues);
    },
    [activeIndex],
  );

  const onSwipeLeftHandler = useCallback(() => {
    if (activeIndex > 0) {
      setFadingValue(false);
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  const onSwipeRightHandler = useCallback(() => {
    if (activeIndex < childrenLength - 1) {
      setFadingValue(true);
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex]);

  const [onTouchStart, onTouchEnd] = useSwipe(
    onSwipeLeftHandler,
    onSwipeRightHandler,
  );

  return (
    <View
      style={styles.container}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
      {childrenArray.map((child, index) => {
        return (
          <AnimatedSwiperItem
            key={index}
            fadingValue={fadingValues[index]}
            duration={duration}>
            {child}
          </AnimatedSwiperItem>
        );
      })}
      <View style={[styles.dotContainer, paginationStyle]}>
        {childrenArray.map((_, index) => {
          return (
            <AnimatedPagination
              key={index}
              isActive={index === activeIndex}
              duration={duration}
              dotColor={dotColor}
              activeDotColor={activeDotColor}
            />
          );
        })}
      </View>
    </View>
  );
};

export default AnimatedSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00272F',
    width: '100%',
    height: '100%',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
