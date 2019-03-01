import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TextButton({ children, onPress, style = {} }) {
	return (
		<TouchableOpacity onPress={onPress} style={style.wrapper}>
			<Text style={style.text}>{children}</Text>
		</TouchableOpacity>
	);
}
