import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

class DeckList extends Component {
	render() {
		let { decks } = this.props;
		let components = Object.keys(decks).map(key => {
			const deck = decks[key];
			return (
				<TouchableOpacity
					onPress={() =>
						this.props.navigation.navigate("DeckView", {
							deckId: key
						})
					}
					style={styles.deck}
					key={`${key}_button`}
				>
					<View key={key}>
						<Text style={styles.deckTitle}>{deck.title}</Text>
						<Text style={styles.deckTitle}>
							{`Cards: ${
								deck.questions ? deck.questions.length : 0
							}`}
						</Text>
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
	deckTitle: {
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
