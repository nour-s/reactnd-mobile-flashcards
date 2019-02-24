import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	createAppContainer,
	createStackNavigator,
	createBottomTabNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";

const DecksList = props => (
	<View style={styles.container}>
		<Text>Decks List goes here</Text>
	</View>
);

const AddDeck = props => (
	<View style={styles.container}>
		<Text>Add new deck goes here</Text>
	</View>
);

const bottomNavigator = createBottomTabNavigator({
	DecksList: {
		screen: DecksList,
		navigationOptions: {
			tabBarLabel: "Decks"
		}
	},
	AddDeck: {
		screen: AddDeck,
		navigationOptions: {
			tabBarLabel: "Add Deck",
			header: null
		}
	}
});

const AppNavigator = createStackNavigator({
	Home: {
		screen: bottomNavigator,
		navigationOptions: {
			header: null
		}
	}
});

const AppContainer = createAppContainer(AppNavigator);

function reducer(state = {}, action) {
	return state;
}

export default class App extends React.Component {
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<AppContainer />
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
		alignItems: "center",
		justifyContent: "center"
	}
});
