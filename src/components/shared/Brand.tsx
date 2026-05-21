import { Image, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";

const Brand = ({ style, containerStyle }: { style?: StyleProp<ImageStyle>, containerStyle?: StyleProp<ViewStyle>}) => {
  return (
    <View style={StyleSheet.compose({ alignItems: "center" }, containerStyle)}>
      <Image
        source={require("../../../assets/images/brand.png")}
        style={StyleSheet.compose(
          {
            width: 150,
            height: 70,
          },
          style,
        )}
        resizeMode="contain"
      />
    </View>
  );
};

export default Brand;

const styles = StyleSheet.create({});
