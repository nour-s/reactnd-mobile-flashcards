import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Keyboard
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Actions from "../actions";

class AddDeck extends Component {
	state = {
		name: ""
	};

	handleClick = () => {
		const { name } = this.state;
		this.props.addDeck(name);
		Keyboard.dismiss();
		this.props.navigation.navigate("DeckView", { deckId: name });
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>What the title of the deck?</Text>
				<TextInput
					style={styles.textField}
					placeholder="Deck name"
					value={this.state.name}
					onChangeText={text => this.setState({ name: text })}
				/>
				<TouchableOpacity
					style={styles.save}
					onPress={() => this.handleClick()}
				>
					<Text style={styles.saveText}>Save</Text>
				</TouchableOpacity>
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
	textField: {
		width: 200,
		fontSize: 21
	},
	save: {
		width: 150,
		height: 50,
		backgroundColor: "#55f",
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10
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

export default connect(
	null,
	mapDispatchToProps
)(AddDeck);
