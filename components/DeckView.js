import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { withMappedNavigationProps } from "react-navigation-props-mapper";
import TextButton from "./TextButton";

class DeckView extends Component {
	navigateToAddCard = deck =>
		this.props.navigation.navigate("AddCard", {
			deckId: deck.id,
			deckTitle: deck.title
		});

	navigateToQuiz = deck =>
		this.props.navigation.navigate("Quiz", {
			deck
		});

	render() {
		const { deckId, decks } = this.props;
		const deck = decks[deckId];
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.cardNubmer}>{`Cards: ${
					deck.questions ? deck.questions.length : 0
				}`}</Text>
				<TextButton
					style={{
						wrapper: styles.addCard,
						text: styles.addCardText
					}}
					onPress={() => this.navigateToAddCard(deck)}
				>
					Add Card
				</TextButton>
				<TextButton
					style={{
						wrapper: styles.addCard,
						text: styles.addCardText
					}}
					onPress={() => this.navigateToQuiz(deck)}
				>
					Start Quiz
				</TextButton>
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
		fontSize: 50,
		fontWeight: "bold"
	},
	cardNubmer: {
		marginBottom: 100
	},
	addCard: {
		width: 150,
		height: 50,
		backgroundColor: "#9b0000",
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
