import React, { useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {SVG} from '../../Components'
const { width } = Dimensions.get('window');

const SlideBox = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <View key={index} style={[styles.dot, activeSlide === index && styles.activeDot]} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container2}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollViewStyle}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { backgroundColor: "white" }]}>
            <ScrollView style={styles.contentScroll}>
                <SVG journey = {slide.journey} user={true}/>
              <Text style={styles.contentText}>{slide.content}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => slide.onSelect()}>
              <Text style={styles.buttonText}>Select</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    margin: 10, // Margin around the component
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Thin border
    borderColor: '#ddd', // Grey border color
    overflow: 'hidden', // Ensures children do not overlap the rounded corners
    height: 300,
    
  },
  scrollViewStyle: {
    flex: 1,
  },
  slide: {
    width: width - 20, // Adjust width based on container margin
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 550, // Adjust as needed
  },
  contentScroll: {
    flex: 1,
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    // Add more styling for the text as needed
  },
  button: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    // Add more styling for the button text as needed
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20, // Adjust as needed
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'grey',
  },
});

export default SlideBox;
