import _ from 'lodash';
import React, {Component} from 'react';
import { View, Image, ImageBackground} from 'react-native';
import Swiper from 'react-native-swiper'
import { Button } from 'react-native-elements';


class Welcome extends Component {

  onSlidesComplete = () => {
    this.props.navigation.navigate('login');
  }

  render() {
    return (
        <Swiper
          vertical={false}
          loop={false}
          showsPagination={true}
          index={0}>
          <View >
            <Image style={{ height: '100%', width: '100%'}} source={require('../../assets/UsedPhotos/time.png')} />
          </View>
          <View >
            <Image style={{ height: '100%', width: '100%'}} source={require('../../assets/UsedPhotos/system.png')} />
          </View>
          <View >
            <ImageBackground style={{ height: '100%', width: '100%'}} source={require('../../assets/UsedPhotos/guarantee.png')}>
              <Button
              title="Start"
              buttonStyle={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('login')}
              />
            </ImageBackground>
          </View>
        </Swiper>
    );
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: '#f85f68',
    marginLeft: 142,
    marginTop: 600,
    width: 100
  }
}

export default Welcome;
