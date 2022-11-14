import { useState, useEffect } from 'react';
import './GamePage.css';
import Board from '../components/Board';
import Card, { CardObjectType } from '../components/Card';
import PlayerTurns from '../components/PlayerTurns';
import Header from '../components/Header';
import Button from '../components/Button';
const cardImages = [
	{ src: '/img/hiruma.jpg', matched: false },
	{ src: '/img/ikki.jpg', matched: false },
	{ src: '/img/ippo.jpg', matched: false },
	{ src: '/img/kongo.jpg', matched: false },
	{ src: '/img/kusanagi.jpg', matched: false },
	{ src: '/img/luffy.jpg', matched: false },
	{ src: '/img/taiga.jpg', matched: false },
	{ src: '/img/takamura.jpg', matched: false },
	{ src: '/img/yoko.jpg', matched: false },
];

enum GAME_STATE {
	GAME_OFF = 'OFF',
	ON_GOING = ' GOING',
	GAME_FINISHED = 'FINISHED',
}

enum PLAYER_TURN {
	PLAYER_ONE = 'Player 1',
	PLAYER_TWO = 'Player 2',
}

function GamePage() {
	const [cards, setCards] = useState(Array<CardObjectType>);
	const [playerOnePoint, setPlayerOnePoints] = useState(0);
	const [playerTwoPoint, setPlayerTwoPoints] = useState(0);
	const [playerOneTurn, setPlayerOneTurn] = useState(0);
	const [playerTwoTurn, setPlayerTwoTurn] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const [gameStatus, setGameStatus] = useState<GAME_STATE>(GAME_STATE.GAME_OFF);
	const [playerTurn, setPlayerTurn] = useState<PLAYER_TURN>(
		PLAYER_TURN.PLAYER_ONE
	);

	const onHandleStartButton = () => {
		setGameStatus(GAME_STATE.ON_GOING);

		const shuffledCardList = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({
				...card,
				id: Math.random(),
			}));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCardList);
		setPlayerOneTurn(0);
		setPlayerTwoTurn(0);
		setPlayerOnePoints(0);
		setPlayerTwoPoints(0);
	};

	const onHandleCardClick = (card: CardObjectType) => {
		//@ts-ignore
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	const handleNextTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		if (playerTurn === PLAYER_TURN.PLAYER_ONE) {
			setPlayerOneTurn((state) => state + 1);
			setPlayerTurn(PLAYER_TURN.PLAYER_TWO);
		} else {
			setPlayerTwoTurn((state) => state + 1);
			setPlayerTurn(PLAYER_TURN.PLAYER_ONE);
		}
		setDisabled(false);
	};

	const validateMatchedCards = () => {
		setCards((prevState) => {
			return prevState.map((card) => {
				//@ts-ignore

				if (card.src === choiceOne?.src) {
					return { ...card, matched: true };
				} else {
					return card;
				}
			});
		});
	};

	const validatePlayerOneTurn = () => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			//@ts-ignore

			if (choiceOne?.src === choiceTwo?.src) {
				setPlayerOnePoints((state) => state + 1);
				validateMatchedCards();
				handleNextTurn();
			} else {
				setPlayerTurn(PLAYER_TURN.PLAYER_TWO);
				setTimeout(() => handleNextTurn(), 500);
			}
		}
	};

	const validatePlayerTwoTurn = () => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			//@ts-ignore

			if (choiceOne?.src === choiceTwo?.src) {
				setPlayerTwoPoints((state) => state + 1);
				validateMatchedCards();
				handleNextTurn();
			} else {
				setPlayerTurn(PLAYER_TURN.PLAYER_TWO);
				setTimeout(() => handleNextTurn(), 500);
			}
		}
	};

	useEffect(() => {
		playerTurn === PLAYER_TURN.PLAYER_ONE
			? validatePlayerOneTurn()
			: validatePlayerTwoTurn();
	}, [choiceOne, choiceTwo]);

	useEffect(() => {
		setGameStatus(GAME_STATE.GAME_OFF);
		setChoiceOne(null);
		setChoiceTwo(null);
		setPlayerOneTurn(0);
		setPlayerTwoTurn(0);
		setPlayerOnePoints(0);
		setPlayerTwoPoints(0);
	}, []);

	const onHandleStopButton = () => {
		setGameStatus(GAME_STATE.GAME_OFF);
	};
	const renderButtonMessage =
		gameStatus === GAME_STATE.GAME_OFF ? 'Start game' : 'Reset Game';

	const renderWinnerMessage = () => {
		const allCardsUp = cards.every((card) => card.matched === true);
		if (playerOnePoint > playerTwoPoint && allCardsUp) {
			return (
				<h4>
					{PLAYER_TURN.PLAYER_ONE} won the game with {playerOnePoint} points in
					{playerOneTurn} turns
				</h4>
			);
		} else if (playerOnePoint < playerTwoPoint && allCardsUp) {
			return (
				<h4>
					{PLAYER_TURN.PLAYER_TWO} won the game with {playerTwoPoint} points in
					{playerTwoTurn} turns
				</h4>
			);
		}
		return <h3 className="message-status">Enjoy the Game!</h3>;
	};

	return (
		<div className="container">
			<div>
				<Button onClick={onHandleStartButton} className="button">
					{renderButtonMessage}
				</Button>
				<Button onClick={onHandleStopButton} className="button">
					Stop game
				</Button>

				<PlayerTurns
					playerOne="Player 1"
					playerTwo="Player 2"
					playerOneTurn={playerOneTurn}
					playerTwoTurn={playerTwoTurn}
					playerOnePoints={playerOnePoint}
					playerTwoPoints={playerTwoPoint}
				/>

				{renderWinnerMessage()}
			</div>

			{gameStatus === GAME_STATE.GAME_OFF ? (
				<h4>Press Start to train your memory!</h4>
			) : (
				<Board>
					{cards.map((card) => (
						<Card
							key={card.id}
							card={card}
							onHandleCardClick={onHandleCardClick}
							flipped={card === choiceOne || card === choiceTwo || card.matched}
							disabled={disabled}
						/>
					))}
				</Board>
			)}
		</div>
	);
}

export default GamePage;
