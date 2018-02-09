import React, { Component } from 'react';
import {
  Alert, ScrollView, FlatList, SectionList, AppRegistry, Platform, StyleSheet, Text,
  TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, ViewPagerAndroid
} from 'react-native';

export default class Intro extends Component {
  _onPressButton() {
    //Alert.alert('You tapped the button!')
  }

  _onLongPressButton() {
    //Alert.alert('You long-pressed the button!')
  }


  render() {
    return (
      <ViewPagerAndroid
        style={styles.viewPager}
        initialPage={0}>
        <View style={styles.pageStyle} key="1">

          <Text>First page</Text>
          <ScrollView style={styles.container}>
            <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>TouchableHighlight</Text>
              </View>
            </TouchableHighlight>
            <TouchableOpacity onPress={this._onPressButton}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>TouchableOpacity</Text>
              </View>
            </TouchableOpacity>
            <TouchableNativeFeedback
              onPress={this._onPressButton}
              background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableWithoutFeedback
              onPress={this._onPressButton}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="white">
              <View style={styles.button}>
                <Text style={styles.buttonText}>Touchable with Long Press</Text>
              </View>
            </TouchableHighlight>
            <FlatList
              data={[
                { key: 'Devin' },
                { key: 'Jackson' },
                { key: 'James' },
                { key: 'Joel' },
                { key: 'John' },
                { key: 'Jillian' },
                { key: 'Jimmy' }
              ]}
              renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
            />
            <Text> Section List              </Text>
            <SectionList
              sections={[
                { title: 'D', data: ['Devin'] },
                { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
              ]}
              renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
              renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
              keyExtractor={(item, index) => index}
            />
          </ScrollView>

        </View>
        <View style={styles.pageStyle} key="2">

          <Text>Second page</Text>

        </View>
      </ViewPagerAndroid>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: 'stretch'
  }
})
