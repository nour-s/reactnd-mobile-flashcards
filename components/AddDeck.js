import React, { Component } from "react";
import {
	StyleSheet,
	KeyboardAvoidingView,
	View,
	Text,
	TextInput,
	Keyboard
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Actions from "../actions";
import TextButton from "./TextButton";

class AddDeck extends Component {
	state = {
		name: "",
		invalid: false
	};

	handleClick = () => {
		const { name } = this.state;
		const exist = this.props.decks[name.trim()];
		if (name.trim() === "" || exist) {
			this.setState({ invalid: true });
			return;
		}
		this.props.addDeck(name);
		Keyboard.dismiss();
		this.props.navigation.navigate("DeckView", { deckId: name });
	};

	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<Text style={styles.title}>What the title of the deck?</Text>
				<TextInput
					style={[
						styles.textField,
						this.state.invalid && styles.invalidField
					]}
					placeholder="Deck name"
					value={this.state.name}
					onChangeText={text => this.setState({ name: text })}
				/>
				<TextButton
					style={{ wrapper: styles.save, text: styles.saveText }}
					onPress={() => this.handleClick()}
				>
					Save
				</TextButton>
			</KeyboardAvoidingView>
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
	},
	save: {
		width: 150,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
		backgroundColor: "#9b0000",
		borderRadius: 5,
		alignSelf: "center"
	},
	saveText: {
		color: "#fff",
		fontSize: 21
	}
});

mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			addDeck: Actions.addDeck
		},
		dispatch
	);

mapStateToProps = ({ decks }) => ({
	decks
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddDeck);
