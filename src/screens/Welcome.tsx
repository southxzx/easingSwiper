import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import AnimatedSwiper from '../components/AnimatedSwiper';

const Welcome1 = require('../assets/images/welcome1.png');
const Welcome2 = require('../assets/images/welcome2.png');
const Welcome3 = require('../assets/images/welcome3.png');

const SCREEN_WIDTH = Dimensions.get('window').width;

const listData = [
  {
    key: '1',
    title: 'What is Lorem Ipsum?',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    img: Welcome1,
  },
  {
    key: '2',
    title: 'Where does it come from?',
    description:
      'It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable',
    img: Welcome2,
  },
  {
    key: '3',
    title: 'Why do we use it?',
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    img: Welcome3,
  },
];

const WelcomeScreen: React.FC = () => {
  return (
    <AnimatedSwiper paginationStyle={{marginBottom: "70%"}} duration={600}>
      {listData.map(data => (
        <View style={styles.imageContainer} key={data.key}>
          <Image source={data.img} alt="Welcome1" style={styles.img} resizeMode="cover" />
          <View style={styles.textContainer}>
            <Text style={styles.textTitle}>{data.title}</Text>
            <Text style={styles.textDescription}>{data.description}</Text>
          </View>
        </View>
      ))}
    </AnimatedSwiper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: SCREEN_WIDTH,
  },
  textTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  textDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});
