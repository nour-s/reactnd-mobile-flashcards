import { AsyncStorage } from "react-native";
const DECKS_STORAGE_KEY = "DECKS_STORAGE";

const initData = {
	decks: {
		React: {
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
		}
	}
};

function getDecks() {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(result => {
		return result || initData.decks;
	});
}

export default { getDecks };
