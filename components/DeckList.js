import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class DeckList extends Component {
	handleDeckClick = () => {
		console.log("Clicked");
	};

	render() {
		let { decks } = this.props;
		let components = Object.keys(decks).map(key => {
			const deck = decks[key];
			return (
				<TouchableOpacity
					onPress={this.handleDeckClick}
					style={styles.deck}
					key={`${key}_button`}
				>
					<View key={key}>
						<Text style={styles.deck_title}>{deck.title}</Text>
					</View>
				</TouchableOpacity>
			);
		});
		return <View style={styles.container}>{components}</View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
		alignItems: "center",
		justifyContent: "center"
	},
	deck: {
		flex: 1,
		backgroundColor: "#aaf",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "stretch",
		borderBottomColor: "#eee",
		borderBottomWidth: 1
	},
	deck_title: {
		fontSize: 21,
		color: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});

function mapStateToProps({ decks }) {
	return {
		decks
	};
}

export default connect(mapStateToProps)(DeckList);
