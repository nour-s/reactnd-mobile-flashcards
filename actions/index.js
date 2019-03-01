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

export default { addCard, populateDecks };
