import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { withMappedNavigationProps } from "react-navigation-props-mapper";

class DeckView extends Component {
	render() {
		const { deckId, decks } = this.props;
		const deck = decks[deckId];
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.cardNubmer}>{`Cards: ${
					deck.questions ? deck.questions.length : 0
				}`}</Text>
				<TouchableOpacity
					style={styles.addCard}
					onPress={() =>
						this.props.navigation.navigate("AddCard", {
							deckId: deck.id,
							deckTitle: deck.title
						})
					}
				>
					<Text style={styles.addCardText}>Add Card</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.addCard}>
					<Text style={styles.addCardText}>Start Quiz</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: 21,
		fontWeight: "bold"
	},
	cardNubmer: {
		marginBottom: 100
	},
	addCard: {
		width: 150,
		height: 50,
		backgroundColor: "#55f",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10
	},
	addCardText: {
		color: "#fff",
		fontSize: 21
	}
});

mapStateToProps = state => ({
	decks: state.decks
});

export default withMappedNavigationProps()(connect(mapStateToProps)(DeckView));
