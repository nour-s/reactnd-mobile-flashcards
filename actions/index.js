import * as ActionTypes from "./constants";
import API from "../services/api";

function populateDecks() {
	return dispatch =>
		API.getDecks().then(decks => {
			dispatch({
				type: ActionTypes.DECKS_POPULATE,
				payload: decks
			});
		});
}

function addCard(card) {
	return dispatch => {
		API.addCard(card).then(() => {
			dispatch({
				type: ActionTypes.DECKS_ADD_CARD,
				payload: card
			});
		});
	};
}

function addDeck(deckName) {
	return dispatch => {
		dispatch({
			type: ActionTypes.DECKS_CREATE_NEW,
			payload: { deckName }
		});
	};
}
export default { addDeck, addCard, populateDecks };
