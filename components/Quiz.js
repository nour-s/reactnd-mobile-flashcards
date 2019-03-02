import React, { Component } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import TextButton from "./TextButton";

class Quiz extends Component {
	state = {
		currentCard: 0,
		showAnswer: false,
		correctAnswers: 0,
		incorrectAnswers: 0
	};

	answered = what => {
		this.setState(state => ({
			[`${what}Answers`]: state[`${what}Answers`] + 1,
			showAnswer: false,
			currentCard: state.currentCard + 1
		}));
	};

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
			<View style={styles.card}>
				<Text style={styles.question}>{card.question}</Text>
				<ScrollView style={styles.answerContainer}>
					{showAnswer && (
						<Text style={styles.answer}>{card.answer}</Text>
					)}
				</ScrollView>
				{showAnswer && (
					<View style={styles.answerActions}>
						<TextButton
							style={{
								wrapper: [
									styles.btnBkg,
									styles.btnAnswerIncorrect
								],
								text: styles.btnText
							}}
							onPress={() => this.answered("incorrect")}
						>
							Wrong
						</TextButton>
						<TextButton
							style={{
								wrapper: [
									styles.btnBkg,
									styles.btnAnswerCorrect
								],
								text: styles.btnText
							}}
							onPress={() => this.answered("correct")}
						>
							Right
						</TextButton>
					</View>
				)}
				{!showAnswer && (
					<TextButton
						style={{
							wrapper: [styles.btnBkg, styles.btnShowAnswer],
							text: styles.btnText
						}}
						onPress={() => this.setState({ showAnswer: true })}
					>
						Show answer
					</TextButton>
				)}
			</View>
		);
	};

	renderQuizEnd = () => {
		const { correctAnswers, incorrectAnswers } = this.state;
		console.log(this.state);
		return (
			<View style={styles.score}>
				<Text style={styles.scoreCircleText}>You scored:</Text>
				<View style={styles.scoreCircle}>
					<Text style={styles.scoreCircleText}>
						{Math.floor(
							(correctAnswers /
								(correctAnswers + incorrectAnswers)) *
								100
						)}
						%
					</Text>
				</View>
				<TextButton
					style={{
						wrapper: styles.btnBkg,
						text: styles.btnText
					}}
					onPress={() => this.restartQuiz()}
				>
					Restart Quiz
				</TextButton>
				<TextButton
					style={{
						wrapper: styles.btnBkg,
						text: styles.btnText
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
			<View style={styles.container}>
				{!allAnswered
					? this.renderCard(deck.questions[currentCard])
					: this.renderQuizEnd()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		flex: 1,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#eee",
		marginVertical: 20,
		marginHorizontal: 20,
		paddingVertical: 20,
		paddingHorizontal: 20
	},
	answerContainer: {},
	question: {
		fontSize: 30,
		fontWeight: "bold",
		marginBottom: 5
	},
	answer: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#444",
		marginBottom: 5
	},
	btnBkg: {
		width: 150,
		height: 50,
		backgroundColor: "#9b0000",
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10
	},
	btnText: {
		color: "#fff",
		fontSize: 21
	},
	btnShowAnswer: {
		width: undefined,
		alignSelf: "stretch"
	},
	btnAnswerCorrect: {
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderLeftWidth: 1,
		borderLeftColor: "#fff"
	},
	btnAnswerIncorrect: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0
	},
	answerActions: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around"
	},
	score: {
		flex: 1,
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#eee",
		marginVertical: 10,
		marginHorizontal: 10,
		paddingVertical: 20,
		paddingHorizontal: 20
	},
	scoreCircle: {
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		width: 100,
		height: 100,
		borderRadius: 100 / 2,
		borderWidth: 2,
		borderColor: "#D81B37"
	},
	scoreCircleText: {
		fontSize: 25,
		fontWeight: "bold"
	}
});

export default Quiz;
