import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { withMappedNavigationProps } from "react-navigation-props-mapper";
import Actions from "../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextButton from "./TextButton";

class AddCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deckId: props.deckId,
			question: "",
			answer: "",
			invalidQuestion: false,
			invalidAnswer: false
		};
	}

	handleClick = () => {
		const card = { ...this.state };
		// Clear validation.
		this.setState({ invalidQuestion: false, invalidAnswer: false });

		if (card.question.trim() === "") {
			this.setState({ invalidQuestion: true });
			return;
		} else if (card.answer.trim() === "") {
			this.setState({ invalidAnswer: true });
			return;
		}

		this.props.addCard(card);
		this.props.navigation.goBack();
	};

	render() {
		const { deckTitle } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{deckTitle}</Text>
				<TextInput
					placeholder="Enter question"
					style={[
						styles.textField,
						this.state.invalidQuestion && styles.invalidField
					]}
					value={this.state.question}
					onChangeText={text => this.setState({ question: text })}
				/>
				<TextInput
					placeholder="Enter answer"
					style={[
						styles.textField,
						this.state.invalidAnswer && styles.invalidField
					]}
					value={this.state.answer}
					onChangeText={text => this.setState({ answer: text })}
				/>
				<TextButton
					style={{
						wrapper: styles.addCard,
						text: styles.addCardText
					}}
					onPress={() => this.handleClick()}
				>
					Save
				</TextButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		paddingHorizontal: 20,
		paddingVertical: 20
	},
	title: {
		fontSize: 21,
		fontWeight: "bold",
		marginBottom: 20
	},
	cardNubmer: {
		fontSize: 17,
		marginBottom: 10
	},
	addCard: {
		width: 150,
		height: 50,
		backgroundColor: "#9b0000",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		alignSelf: "center"
	},
	addCardText: {
		color: "#fff",
		fontSize: 21
	},
	textField: {
		fontSize: 21,
		borderBottomWidth: 1,
		borderBottomColor: "#D81B37",
		borderRadius: 5,
		marginBottom: 20,
		paddingHorizontal: 5,
		paddingVertical: 5
	},
	invalidField: {
		borderWidth: 1,
		borderColor: "#D81B37"
	}
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			addCard: Actions.addCard
		},
		dispatch
	);

export default withMappedNavigationProps()(
	connect(
		null,
		mapDispatchToProps
	)(AddCard)
);
