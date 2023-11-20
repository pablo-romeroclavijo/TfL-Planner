import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const BlinkingCircle = () => {
  const opacity = useRef(new Animated.Value(1)).current; // Initial opacity

  const startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startBlinking();
  }, []);

  return (
    <Animated.View style={[styles.circle, { opacity }]} />
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: 'blue',
    position: 'absolute',
    top: 30,
    left: 40


  },
});

export default BlinkingCircle;
