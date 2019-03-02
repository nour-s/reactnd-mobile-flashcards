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
			answer: ""
		};
	}

	handleClick = () => {
		const card = { ...this.state };
		this.props.addCard(card);
		this.props.navigation.goBack();
	};

	render() {
		const { deckTitle } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{deckTitle}</Text>
				<Text style={styles.cardNubmer}>{`Question: `}</Text>
				<TextInput
					placeholder="Enter question"
					style={styles.textField}
					value={this.state.question}
					onChangeText={text => this.setState({ question: text })}
				/>
				<TextInput
					placeholder="Enter answer"
					style={styles.textField}
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
		alignItems: "center",
		paddingTop: 15
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
		marginTop: 10
	},
	addCardText: {
		color: "#fff",
		fontSize: 21
	},
	textField: {
		width: 200,
		fontSize: 21,
		height: 30,
		borderBottomWidth: 1,
		borderBottomColor: "#eee"
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
