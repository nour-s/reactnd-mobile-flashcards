import { AsyncStorage } from "react-native";
const DECKS_STORAGE_KEY = "DECKS_STORAGE";
let currentDecksList;

const initData = {
	decks: {
		React: {
			id: "React",
			title: "React",
			questions: [
				{
					question: "What is React?",
					answer: "A library for managing user interfaces",
					isCorrect: true
				},
				{
					question: "Where do you make Ajax requests in React?",
					answer: "The componentDidMount lifecycle event",
					isCorrect: false
				}
			]
		},
		JavaScript: {
			id: "JavaScript",
			title: "JavaScript",
			questions: [
				{
					question: "What is a closure?",
					answer:
						"The combination of a function and the lexical environment within which that function was declared.",
					isCorrect: true
				},
				{
					question: "What is a ternary operator",
					answer: "It is the excalamtion mark",
					isCorrect: false
				},
				{
					question: "What is a class?",
					answer: "A bunch of functions grouped together",
					isCorrect: false
				},
				{
					question: "What is 'const' keyword?",
					answer: "Define a variable that cannot be changed later.",
					isCorrect: true
				}
			]
		},
		TypeScript: {
			id: "TypeScript",
			title: "TypeScript",
			questions: [
				{
					question: "Who developed and designed TypeScript?",
					answer: "Amazon",
					isCorrect: false
				},
				{
					question:
						"When was the first time TypeScript was made public?",
					answer: "October 2012",
					isCorrect: true
				},
				{
					question:
						"Which of the following is a filename extension for typescript?",
					answer: "tt",
					isCorrect: false
				}
			]
		},
		Angular: {
			id: "Angular",
			title: "Angular",
			questions: [
				{
					question: "The Angular 4 features:",
					answer: "Ng-template",
					isCorrect: true
				},
				{
					question: "The AngularJS is based on?",
					answer: "MVVM",
					isCorrect: false
				},
				{
					question:
						"Angular 4 applications are usually small because it uses",
					answer: "TypeScript 2.2",
					isCorrect: true
				}
			]
		}
	}
};

function getDecks() {
	return currentDecksList
		? Promise.resolve(currentDecksList)
		: loadDecksFromStorage().catch(er => console.error(er));
}

function loadDecksFromStorage() {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
		result = JSON.parse(result);
		return Promise.resolve(
			result || (saveDecksToStorage(initData.decks), initData.decks)
		);
	});
}

function saveDecksToStorage(decks) {
	decks = JSON.stringify(decks);
	return AsyncStorage.setItem(DECKS_STORAGE_KEY, decks);
}

function addCard(card) {
	return getDecks()
		.then(decks => {
			let updatedDecks = { ...decks };
			let deck = updatedDecks[card.deckId];
			deck.questions = [...deck.questions, card];
			saveDecksToStorage(updatedDecks).then(() => {
				currentDecksList = { ...updatedDecks };
			});
		})
		.catch(err => console.log("I'm catching: ", err));
}

export default { getDecks, addCard };
