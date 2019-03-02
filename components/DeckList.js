import React, { Component } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";

class DeckList extends Component {
	renderDeckItem = ({ item: deck, index }) => (
		<TouchableOpacity
			onPress={() =>
				this.props.navigation.navigate("DeckView", {
					deckId: deck.id
				})
			}
			style={styles.deck}
		>
			<Icon name="md-card" style={styles.icon} size={60} color="#900" />
			<View>
				<Text style={styles.deckTitle}>{deck.title}</Text>
				<Text style={styles.deckSubtitle}>
					{`Cards: ${deck.questions ? deck.questions.length : 0}`}
				</Text>
			</View>
		</TouchableOpacity>
	);

	render() {
		let { decks } = this.props;
		let components = Object.keys(decks).map(key => decks[key]);
		return (
			<FlatList
				renderItem={this.renderDeckItem}
				data={components}
				style={styles.container}
				keyExtractor={(item, index) => item.id}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	deck: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		alignSelf: "stretch",
		flexDirection: "row",
		backgroundColor: "#fff",
		borderBottomColor: "#eee",
		borderBottomWidth: 1,
		paddingLeft: 30,
		paddingVertical: 20
	},
	deckTitle: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#000",
		alignItems: "center",
		justifyContent: "center"
	},
	deckSubtitle: {
		color: "#D81B37",
		alignItems: "center",
		justifyContent: "center"
	},
	icon: {
		alignSelf: "stretch",
		paddingTop: 4,
		marginRight: 15
	}
});

function mapStateToProps({ decks }) {
	return {
		decks
	};
}

export default connect(mapStateToProps)(DeckList);
