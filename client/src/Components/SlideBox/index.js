import React, { useState } from 'react';
import { ScrollView, View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('window');

import SVG from "../MapSVG"
import RouteInfo from '../RouteDetails';

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
  console.log(slides[0].journey.distuptions)
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
                <RouteInfo duration={slide.journey.duration} fare = {slide.journey.fare} isDisrupted = {slide.journey.isDisrupted}  warningText={slide.journey.disruptions} arrival={slide.journey.arrivalDateTime}/>
                <SVG journey = {slide.journey} user={true}/>
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
    height: "auto",
    
  },
  scrollViewStyle: {
    flex: 1,
  },
  slide: {
    width: width - 20, // Adjust width based on container margin
    justifyContent: 'space-between',
    alignItems: 'center',
    height: "auto", // Adjust as needed

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
