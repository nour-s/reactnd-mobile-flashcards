import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	createAppContainer,
	createStackNavigator,
	createBottomTabNavigator
} from "react-navigation";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import decksReducer from "./reducers/decks-reducer";
import Actions from "./actions";
import DeckList from "./components/DeckList";

const middleware = applyMiddleware(thunk);

const AddDeck = props => (
	<View style={styles.container}>
		<Text>Add new deck goes here</Text>
	</View>
);

const bottomNavigator = createBottomTabNavigator({
	DeckList: {
		screen: DeckList,
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

const reducer = combineReducers({
	decks: decksReducer
});

export default class App extends React.Component {
	store = createStore(reducer, {}, middleware);

	componentDidMount() {
		Actions.populateDecks()(this.store.dispatch);
	}

	render() {
		console.log(this.state);
		return (
			<Provider store={this.store}>
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
