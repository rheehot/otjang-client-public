import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import ItemsList from '../../../UIcomponents/ItemsList'
import { fromJS } from 'immutable';
import { MaterialTopTabBar } from '@react-navigation/material-top-tabs';
const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: "flex-start",
    padding: 10
    // height: '100%'
  },
});

function Bag({ navigation, accessories, ClothesActions }) {

  let jsAcc = accessories.toJS()
  let bag = fromJS(jsAcc.filter(item => item.type.bag === true))

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ItemsList title='Bag' items={bag}
          ClothesActions={ClothesActions}
          navigation={navigation} />
      </View>
    </View>
  );
}

export default Bag;