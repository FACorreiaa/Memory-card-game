import React from 'react';
import './PlayerTurns.css';
type PlayerTurnsType = {
	playerOne: string;
	playerTwo: string;
	playerOneTurn: number;
	playerOnePoints: number;
	playerTwoTurn: number;
	playerTwoPoints: number;
};

function PlayerTurns({
	playerOneTurn,
	playerOnePoints,
	playerOne,
	playerTwo,
	playerTwoTurn,
	playerTwoPoints,
}: PlayerTurnsType) {
	return (
		//I repeat content here but i would iterate over an object of players to display the respective data
		<div className="container">
			<div className="row">
				<div className="column">
					<div className="player-container">
						<h5 className="player-title">{playerOne}</h5>
						<div>
							<span>Turns: {playerOneTurn}</span>
							<span>Points: {playerOnePoints}</span>
						</div>
					</div>
				</div>
				<div className="column">
					<div className="player-container">
						<h5 className="player-title">{playerTwo}</h5>
						<div>
							<span>Turns: {playerTwoTurn}</span>
							<span>Points: {playerTwoPoints}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlayerTurns;
