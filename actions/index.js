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

export default { populateDecks };
