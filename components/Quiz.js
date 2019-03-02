import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TextButton from "./TextButton";

class Quiz extends Component {
	state = {
		currentCard: 0,
		showAnswer: false,
		correctAnswers: 0,
		incorrectAnswers: 0
	};

	answered = what =>
		this.setState(state => ({
			[`${what}Answers`]: state[`${what}Answers`] + 1,
			showAnswer: false,
			currentCard: state.currentCard + 1
		}));

	restartQuiz = () =>
		this.setState({
			currentCard: 0,
			showAnswer: false,
			correctAnswers: 0,
			incorrectAnswers: 0
		});

	renderCard = card => {
		const { showAnswer } = this.state;
		return (
			<View style={styles.container}>
				<Text>{card.question}</Text>
				{showAnswer && <Text>{card.answer}</Text>}
				{!showAnswer && (
					<Button
						style={{ padding: 10 }}
						onPress={() => this.setState({ showAnswer: true })}
						title="Show answer"
					/>
				)}
				{showAnswer && (
					<View style={{ flex: 1, alignSelf: "stretch" }}>
						<Text>I guessed it:</Text>
						<View style={styles.answerActions}>
							<TextButton
								style={{
									wrapper: styles.buttonBkg,
									text: styles.buttonText
								}}
								onPress={() => this.answered("incorrect")}
							>
								Wrong
							</TextButton>
							<TextButton
								style={{
									wrapper: styles.buttonBkg,
									text: styles.buttonText
								}}
								onPress={() => this.answered("correct")}
							>
								Right
							</TextButton>
						</View>
					</View>
				)}
			</View>
		);
	};

	renderQuizEnd = () => {
		const { correctAnswers, incorrectAnswers } = this.state;
		return (
			<View style={styles.container}>
				<Text>
					You answered {correctAnswers} out of
					{correctAnswers + incorrectAnswers}
				</Text>
				<TextButton
					style={{
						wrapper: styles.buttonBkg,
						text: styles.buttonText
					}}
					onPress={() => this.restartQuiz()}
				>
					Restart Quiz
				</TextButton>
				<TextButton
					style={{
						wrapper: styles.buttonBkg,
						text: styles.buttonText
					}}
					onPress={() => this.props.navigation.goBack()}
				>
					Back to deck
				</TextButton>
			</View>
		);
	};

	render() {
		const { deck } = this.props.navigation.state.params;
		const { currentCard } = this.state;
		const allAnswered = currentCard > deck.questions.length - 1;
		return (
			<View>
				{!allAnswered
					? this.renderCard(deck.questions[currentCard])
					: this.renderQuizEnd()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center"
	},
	buttonBkg: {
		width: 150,
		height: 50,
		backgroundColor: "#55f",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10
	},
	buttonText: {
		color: "#fff",
		fontSize: 21
	},
	answerActions: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around"
	}
});

export default Quiz;
