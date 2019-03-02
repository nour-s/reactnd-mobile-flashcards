import React from "react";
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Platform,
	ToolbarAndroid
} from "react-native";
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
import DeckView from "./components/DeckView";
import AddCard from "./components/AddCard";
import AddDeck from "./components/AddDeck";
import Quiz from "./components/Quiz";

const middleware = applyMiddleware(thunk);
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
			tabBarLabel: "Add Deck"
		}
	}
});

const AppNavigator = createStackNavigator(
	{
		Home: {
			screen: bottomNavigator,
			navigationOptions: {
				title: "Home"
			}
		},
		DeckView: {
			screen: DeckView,
			navigationOptions: {
				title: "Deck View"
			}
		},
		AddCard: {
			screen: AddCard,
			navigationOptions: {
				title: "Add card"
			}
		},
		Quiz: {
			screen: Quiz,
			navigationOptions: {
				title: "Quiz"
			}
		}
	},
	{
		initialRouteName: "Home",
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: "#a00037"
			},
			headerTintColor: "#fff",
			headerTitleStyle: {
				fontWeight: "bold"
			}
		}
	}
);

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
		return (
			<Provider store={this.store}>
				<View>
					<StatusBar
						translucent
						backgroundColor="rgba(0, 0, 0, 0.24)"
						animated
					/>
					{Platform.OS === "android" && Platform.Version >= 20 ? (
						<View
							style={{
								height: 24,
								backgroundColor: "#a00037"
							}}
						/>
					) : null}
					<ToolbarAndroid
						style={{
							height: 56,
							backgroundColor: "#a00037",
							elevation: 4
						}}
						titleColor="white"
						title="Flashcards"
					/>
				</View>
				<AppContainer style={styles.container} />
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
