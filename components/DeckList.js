import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class DeckList extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Decks List goes here</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
		alignItems: "center",
		justifyContent: "center"
	}
});
