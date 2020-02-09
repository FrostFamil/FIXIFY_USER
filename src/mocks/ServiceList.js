import React, { Component } from "react";
import {View,Text, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('screen');

export default class ServiceList extends Component {

  render() {
    return (
    <ScrollView>
      <View style={styles.services1}>
        <View style={styles.serviceDetails}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.techPressed}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Technology
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, color: 'white', paddingTop: 5 }}>
                Repair of Mobile Phones, Computers, Tablets, TVs and other technologies
            </Text>
            </View>
        </View>
        <TouchableOpacity onPress={this.props.techPressed}>
            <ImageBackground
            style={styles.serviceImage}
            imageStyle={styles.serviceImage}
            source={require('../../assets/Icons/tech.png')}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.services2}>
        <View style={styles.serviceDetails}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.plumberPressed}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Plumber
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, color: 'white', paddingTop: 5 }}>
                Repair of Water Tap, Sewage and more that belongs to bathroom 
            </Text>
            </View>
        </View>
        <TouchableOpacity onPress={this.props.plumberPressed}>
            <ImageBackground
            style={styles.serviceImage}
            imageStyle={styles.serviceImage}
            source={require('../../assets/Icons/plumber.png')}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.services3}>
        <View style={styles.serviceDetails}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.electricPressed}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Electric
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, color: 'white', paddingTop: 5 }}>
                Repair of Current, Light, Electric Lamp and more.
            </Text>
            </View>
        </View>
        <TouchableOpacity onPress={this.props.electricPressed}>
            <ImageBackground
            style={styles.serviceImage}
            imageStyle={styles.serviceImage}
            source={require('../../assets/Icons/electric.png')}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.services4}>
        <View style={styles.serviceDetails}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.furniturePressed}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Furniture
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, color: 'white', paddingTop: 5 }}>
                Repair and Installation of all Furniture types
            </Text>
            </View>
        </View>
        <TouchableOpacity onPress={this.props.furniturePressed}>
            <ImageBackground
            style={styles.serviceImage}
            imageStyle={styles.serviceImage}
            source={require('../../assets/Icons/furniture.png')}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.services5}>
        <View style={styles.serviceDetails}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.autoPressed}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                Auto
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, color: 'white', paddingTop: 5 }}>
                Repair of Automobiles and their parts
            </Text>
            </View>
        </View>
        <TouchableOpacity onPress={this.props.autoPressed}>
            <ImageBackground
            style={styles.serviceImage}
            imageStyle={styles.serviceImage}
            source={require('../../assets/Icons/car.png')}
            />
        </TouchableOpacity>
      </View>

      <View style={styles.services6}>
        <View style={styles.serviceDetails}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.householdPressed}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Household Appliances
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 13, color: 'white', paddingTop: 5 }}>
                Repair of Vacuum Cleaner, Washing Machine, Dishwasher and more
            </Text>
            </View>
        </View>
        <TouchableOpacity onPress={this.props.householdPressed}>
            <ImageBackground
            style={styles.serviceImage}
            imageStyle={styles.serviceImage}
            source={require('../../assets/Icons/meiset.jpg')}
            />
        </TouchableOpacity>
      </View>
    </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    services1: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: '#A5A5A5',
      borderBottomWidth: 0.5,
      padding: 6,
      margin: 5,
      marginBottom: 1,
      backgroundColor: '#51a323',
      borderRadius: 10
    },
    services2: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 0.5,
        padding: 6,
        margin: 5,
        marginBottom: 1,
        backgroundColor: '#fa6078',
        borderRadius: 10
      },
      services3: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 0.5,
        padding: 6,
        margin: 5,
        marginBottom: 1,
        backgroundColor: '#50bed9',
        borderRadius: 10
      },
      services4: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 0.5,
        padding: 6,
        margin: 5,
        marginBottom: 1,
        backgroundColor: '#e4473e',
        borderRadius: 10
      },
      services5: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 0.5,
        padding: 6,
        margin: 5,
        marginBottom: 1,
        backgroundColor: '#ff9600',
        borderRadius: 10
      },
      services6: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: '#A5A5A5',
        borderBottomWidth: 0.5,
        padding: 6,
        margin: 5,
        marginBottom: 1,
        backgroundColor: '#98377a',
        borderRadius: 10
      },
    serviceDetails: {
      flex: 2,
      paddingLeft: 20,
      flexDirection: 'column',
      justifyContent: 'space-around'
    },
    serviceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 14,
    },
    serviceImage: {
      width: width * 0.30,
      height: width * 0.25,
      borderRadius: 6,
    }
  });