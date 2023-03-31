 (() => {
	"use strict";
 	var __webpack_modules__ = ({

 "./src/dragDropLogic.js":

((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addDragDropFeature": () => (/* binding */ addDragDropFeature)
/* harmony export */ });
/* eslint-disable max-len */
const addDragDropFeature=function (human) {
    const allDraggableDivs = document.querySelectorAll(".draggable");
    allDraggableDivs.forEach((div) => {
        for (let i = 0; i < div.children.length; i+=1) {
            div.children[i].addEventListener("mousedown", (e) => {
                // eslint-disable-next-line no-param-reassign
                div.dataset.index = e.target.dataset.index; // this will give the position of draggable div on which mouse is on.
            });
        }
    });

    const dragstart=function (e) {
        const shipBeingDragged = e.target;
        const positionOfMouseOnTheShip = shipBeingDragged.dataset.index;
        const lengthOfTheShip = shipBeingDragged.dataset.shiplength;
        const shipName = shipBeingDragged.id;
        const transferData = [positionOfMouseOnTheShip, lengthOfTheShip, shipName];
        e.dataTransfer.setData("ship-data", JSON.stringify(transferData));
    };

    const dragEnter=function (e) {
        e.preventDefault();
    };

    const dragOver=function (e) {
        e.preventDefault();
    };

    const isAShipAlreadyPlaced=function (
        cells_With_Same_Y_Axis_As_DropTarget,
        shipData,
        xAxisOfDroppedShipFirstPosition,
    ) {
        const cellsWithShipPlaced = cells_With_Same_Y_Axis_As_DropTarget.filter(
            (cell) => cell.classList.contains("dropped"),
        );
        // eslint-disable-next-line radix
        const shipsPositionsInXAxis = cellsWithShipPlaced.map((cell) => parseInt(cell.dataset.index.split(",")[0]));
        const potentialShipPositionsForCurrentShip = [];
        const shipLength = shipData[1];
        for (let i = 0; i < shipLength; i+=1) {
            let droppedShipPosition = xAxisOfDroppedShipFirstPosition;
            droppedShipPosition += i;
            potentialShipPositionsForCurrentShip.push(droppedShipPosition);
        }
        const totalOverlappedShipPositions =
      potentialShipPositionsForCurrentShip.some((potentialShipPosition) => shipsPositionsInXAxis.includes(potentialShipPosition));
        if (totalOverlappedShipPositions) {
            return true;
        }
        return false;

    };

    const isThereEnoughSpace=function (
        cells_With_Same_Y_Axis_As_DropTarget,
        shipData,
        xAxisOfDroppedShipFirstPosition,
    ) {
        const shiplength = Number(shipData[1]);
        const xAxisOfFirstCell =
      cells_With_Same_Y_Axis_As_DropTarget[0].dataset.index.split(",")[0];
        const xAxisOfLastCell =
      cells_With_Same_Y_Axis_As_DropTarget[
          cells_With_Same_Y_Axis_As_DropTarget.length - 1
      ].dataset.index.split(",")[0];
        if (
            xAxisOfFirstCell <= xAxisOfDroppedShipFirstPosition &&
      xAxisOfLastCell >= xAxisOfDroppedShipFirstPosition + (shiplength - 1)
        ) {
            // shilplength-1 because 95+5=100 but if you consider 95 and add 5 to it then it would be 99
            // you have to consider this nuance when working with gameboard cells
            return true; // means the ship can be placed
        }
        return false;

    };

    const checkIfDropValid=function (event, shipData) {
        const dropTargetCoordinates = event.target.dataset.index.split(",");
        const positionOfMouseOnTheShip = shipData[0];
        const xAxisOfDroppedShipFirstPosition =
      dropTargetCoordinates[0] - positionOfMouseOnTheShip;
        const humanGameboardCellsArray = [...humanGameboardCells];
        const cells_With_Same_Y_Axis_As_DropTarget = humanGameboardCellsArray.filter(
            (cell) => {
                const yAxisOfCell = cell.dataset.index.split(",")[1];
                const yAxisOfDropTarget = dropTargetCoordinates[1];
                return yAxisOfCell === yAxisOfDropTarget;
            },
        );

        if (
            isAShipAlreadyPlaced(
                cells_With_Same_Y_Axis_As_DropTarget,
                shipData,
                xAxisOfDroppedShipFirstPosition,
            )
        ) {
            return false; // means there is already a ship placed in the same axis
        } else if (
            isThereEnoughSpace(
                cells_With_Same_Y_Axis_As_DropTarget,
                shipData,
                xAxisOfDroppedShipFirstPosition,
            )
        ) {
            return true; // means the ship can be placed
        }
        return false;

    };

    const totalShips = 4;
    let dropCount = 0;

    const drop=function (e) {
        e.stopPropagation(); // stops the browser from redirecting.

        const xAxisOfDropTarget = Number(e.target.dataset.index.split(",")[0]);
        const shipDataJson = e.dataTransfer.getData("ship-data");
        const shipData = JSON.parse(shipDataJson);

        if (!checkIfDropValid(e, shipData)) {
            return false; // this will stop the function and thus the drop will not be handled
        }

        const shiplength = shipData[1];
        const positionOfMouseOnTheShip = shipData[0];
        const xAxisOfShipStartPosition = xAxisOfDropTarget - positionOfMouseOnTheShip;
        const shipName = shipData[2];
        human.gameboard.placeShip(`${ shipName }`, xAxisOfShipStartPosition);
        for (let i = 0; i < shiplength; i+=1) {
            humanGameboardCells[xAxisOfShipStartPosition + i].style.background =
        "#444444";
            humanGameboardCells[xAxisOfShipStartPosition + i].classList.add(
                "dropped",
            );
        }

        const draggable = document.querySelector(`#${ shipName }`);
        draggable.style.display = "none";
        dropCount += 1;
        if (dropCount === totalShips) {
            const startGameButton = document.querySelector("#start");
            startGameButton.style.display = "block";
        }
    };

    const humanGameboardCells = document.querySelectorAll(
        "#friendly-area-gameboard .square_div",
    );
    humanGameboardCells.forEach((cell) => {
        cell.addEventListener("dragenter", dragEnter);
        cell.addEventListener("dragover", dragOver);
        cell.addEventListener("drop", drop);
    });

    const draggableShips = document.querySelectorAll(".draggable");
    draggableShips.forEach((ship) => {
        ship.addEventListener("dragstart", dragstart);
    });
};




/***/ }),

/***/ "./src/gameLogic.js":
/*!**************************!*\
  !*** ./src/gameLogic.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ai": () => (/* binding */ ai),
/* harmony export */   "computer": () => (/* binding */ computer),
/* harmony export */   "gameBoard": () => (/* binding */ gameBoard),
/* harmony export */   "getHitScoreOfBothPlayer": () => (/* binding */ getHitScoreOfBothPlayer),
/* harmony export */   "human": () => (/* binding */ human),
/* harmony export */   "humanPlayer": () => (/* binding */ humanPlayer),
/* harmony export */   "ship": () => (/* binding */ ship)
/* harmony export */ });
/* eslint-disable max-len */
const ship= function (shipname, coordinate) {
    let shipLength;
    switch (shipname) {
    case "carrier":
        shipLength = 5;
        break;
    case "battleship":
        shipLength = 4;
        break;
    case "destroyer":
        shipLength = 3;
        break;
    case "submarine":
        shipLength = 2;
        break;
        case "titanic":
            shipLength = 1;
            break;
    }
    const hitPositions = [];
    const hit=function (hitCoordinate) {
        hitPositions.push(hitCoordinate);
    };
    const isSunk=function () {
        if (hitPositions.length === shipLength) {
            return true;
        }
        return false;
    };
    return { coordinate, shipLength, hitPositions, hit, isSunk };
};

const gameBoard=function () {
    const shipList = [];
    const placeShip=function (shipname, coordinate) {
        shipList.push(ship(shipname, coordinate));
    };
    const missedHits = [];
    const receiveAttack=function (hitCoordinate) {
        for (let i = 0; i < shipList.length; i+=1) {
            if (
                hitCoordinate >= shipList[i].coordinate &&
        hitCoordinate < shipList[i].coordinate + shipList[i].shipLength
            ) {
                shipList[i].hit(hitCoordinate);
                break;
            } else if (i === shipList.length - 1) {
                // means,we are at the end of the loop but we did not find a hit
                missedHits.push(hitCoordinate);
            }
        }
    };
    const areAllShipSunk=function () {
        return shipList.every((ship) => ship.isSunk());
    };
    return { shipList, placeShip, receiveAttack, missedHits, areAllShipSunk };
};

const humanPlayer=function () {
    const gameboard = gameBoard();
    const attack=function (enemyGameBoard, attackCoordinate) {
        enemyGameBoard.receiveAttack(attackCoordinate);
    };
    return { gameboard, attack };
};

const returnLastSuccessfulHitPositionOfEnemyGameboard=function (
    previousEnemyGameBoardHitPositions,
    enemyGameBoard,
) {
    let updatedEnemyGameboardHitPositions = [];
    enemyGameBoard.shipList.forEach((ship) => {
        updatedEnemyGameboardHitPositions =
      updatedEnemyGameboardHitPositions.concat(ship.hitPositions);
    });
    const lastHitPositionStr = updatedEnemyGameboardHitPositions
        // eslint-disable-next-line max-len
        .filter((position) => !previousEnemyGameBoardHitPositions.includes(position))
        .toString();
    if (
        updatedEnemyGameboardHitPositions.length >
    previousEnemyGameBoardHitPositions.length
    ) {
    // means last attack was successful
        // eslint-disable-next-line radix
        const lastHitPosition = parseInt(lastHitPositionStr);
        previousEnemyGameBoardHitPositions.push(lastHitPosition);
        return lastHitPosition;
    }
    return false; // means last attack was not successful

};

const calculateShotCoordinate=function (
    previousEnemyGameBoardHitPositions,
    enemyGameBoard,
    coordinatesForAttack,
) {
    const lastHitPositionOfEnemyGameboard =
    returnLastSuccessfulHitPositionOfEnemyGameboard(
        previousEnemyGameBoardHitPositions,
        enemyGameBoard,
    );
    const coordinatesForAttackIncludeNextHit = coordinatesForAttack.includes(
        lastHitPositionOfEnemyGameboard + 1,
    );
    let shotCoordinate;

    if (lastHitPositionOfEnemyGameboard && coordinatesForAttackIncludeNextHit) {
    // means last attack was a hit
        shotCoordinate = lastHitPositionOfEnemyGameboard + 1;
        coordinatesForAttack.splice(
            coordinatesForAttack.indexOf(shotCoordinate),
            1,
        );
        return shotCoordinate;
    }
    shotCoordinate =
      coordinatesForAttack[
          Math.floor(Math.random() * coordinatesForAttack.length)
      ];
    coordinatesForAttack.splice(
        coordinatesForAttack.indexOf(shotCoordinate),
        1,
    );
    return shotCoordinate;

};

const ai=function () {
    const gameboard = gameBoard();
    const gameBoardSize = 100;
    const coordinatesForAttack = [];
    for (let i = 0; i < gameBoardSize; i+=1) {
        coordinatesForAttack.push(i);
    }
    const previousEnemyGameBoardHitPositions = [];

    const attack=function (enemyGameBoard) {
        const shotCoordinate = calculateShotCoordinate(
            previousEnemyGameBoardHitPositions,
            enemyGameBoard,
            coordinatesForAttack,
        );
        enemyGameBoard.receiveAttack(shotCoordinate);
    };

    const autoPlaceShip=function () {
        const firstPositionsOfAllGameboardRow=[0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        const fourRandomlyPickedPositions=[];
        const pickeARandomPosition= function () {
            return firstPositionsOfAllGameboardRow[
                Math.floor(Math.random() * firstPositionsOfAllGameboardRow.length)
            ];
        };
        for(let i=0;i<4;i+=1) {
            const randomlyPickedPosition=pickeARandomPosition();
            fourRandomlyPickedPositions.push(randomlyPickedPosition);
            firstPositionsOfAllGameboardRow.splice(
                firstPositionsOfAllGameboardRow.indexOf(randomlyPickedPosition),
                1,
            );
        }
        
        gameboard.placeShip("carrier", fourRandomlyPickedPositions[0]);
        gameboard.placeShip("battleship", fourRandomlyPickedPositions[1]+6);
        // 4 is the length of battleship
        gameboard.placeShip("destroyer", fourRandomlyPickedPositions[2]+3);
        // 3 is the length of destroyer
        gameboard.placeShip("submarine", fourRandomlyPickedPositions[3]+8);
        // 6 is a random number
        gameboard.placeShip("titanic", fourRandomlyPickedPositions[4]+10);
    };
    return { gameboard, attack, autoPlaceShip };
};

const human = humanPlayer();
const computer = ai();

const getHitScoreOfBothPlayer=function () {
    const humanHitPositionsArr = [];
    computer.gameboard.shipList.forEach((ship) => {
        ship.hitPositions.forEach((position) => {
            humanHitPositionsArr.push(position);
        });
    });
    const humanMissedHitCount = computer.gameboard.missedHits.length;

    const computerHitPositionsArr = [];
    human.gameboard.shipList.forEach((ship) => {
        ship.hitPositions.forEach((position) => {
            computerHitPositionsArr.push(position);
        });
    });
    const computerMissedHitCount = human.gameboard.missedHits.length;

    return {
        humanHitCount: humanHitPositionsArr.length,
        humanMissedHitCount,
        computerHitCount: computerHitPositionsArr.length,
        computerMissedHitCount,
    };
};
// eslint-disable-next-line max-len



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameLogic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameLogic */ "./src/gameLogic.js");
/* harmony import */ var _dragDropLogic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dragDropLogic */ "./src/dragDropLogic.js");
/* eslint-disable radix */
/* eslint-disable max-len */



const howToModal = document.querySelector("#modal");
const howToModalCloseButton = document.querySelector("#close_how_to_modal");
const howToButton = document.querySelector(".how_to");

howToButton.addEventListener("click", () => {
    howToModal.showModal();
});

howToModalCloseButton.addEventListener("click", () => {
    howToModal.close();
});

const friendlyAreaGameboard = document.querySelector(
    "#friendly-area-gameboard",
);
const enemyAreaGameboard = document.querySelector("#enemy-area-gameboard");

const createGameBoardDom = function (gameBoardContainerName) {
    const gridSize = 10;
    const gridSquare = 100;
    // eslint-disable-next-line no-param-reassign
    gameBoardContainerName.style.gridTemplateRows = `repeat(${ gridSize },1fr)`;
    // eslint-disable-next-line no-param-reassign
    gameBoardContainerName.style.gridTemplateColumns = `repeat(${ gridSize },1fr)`;
    const squareDiv = [];
    let loopCount = 1;
    let yAxis = 1;
    for (let i = 0; i < gridSquare; i += 1) {
        squareDiv[i] = document.createElement("div");
        squareDiv[i].setAttribute("data-index", `${ [i, yAxis] }`);
        if (loopCount === 10) {
            yAxis += 1;
            loopCount = 1;
        } else {
            loopCount += 1;
        }
        squareDiv[i].classList.add("square_div");
        gameBoardContainerName.appendChild(squareDiv[i]);
    }
};

createGameBoardDom(friendlyAreaGameboard);
createGameBoardDom(enemyAreaGameboard);

(0,_dragDropLogic__WEBPACK_IMPORTED_MODULE_1__.addDragDropFeature)(_gameLogic__WEBPACK_IMPORTED_MODULE_0__.human);
// human goes into this function and get changed
// but since human is an object we will get an updated human object in this module

const autoPlaceButton = document.querySelector("#auto_place");
const shipContainer = document.querySelector("#all_ship_container");
const gameStartButton = document.querySelector("#start");

const markShipsInTheDom = function () {
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard.shipList.forEach((ship) => {
        for (let i = 0; i < ship.shipLength; i += 1) {
            friendlyAreaGameboard.children[ship.coordinate + i].style.background =
        "#444444";
        }
    });
};

const autoPlaceShips = function () {
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard.placeShip("carrier", 14);
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard.placeShip("battleship", 34);
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard.placeShip("destroyer", 94);
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard.placeShip("submarine", 74);
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard.placeShip("titanic", 59);
    markShipsInTheDom();
    shipContainer.style.display = "none";
    gameStartButton.style.display = "block";
};
autoPlaceButton.addEventListener("click", autoPlaceShips);

const markHitUnhit = function (enemy, enemyGameboardDom) {
    enemy.gameboard.shipList.forEach((ship) => {
        ship.hitPositions.forEach((position) => {
            // eslint-disable-next-line no-param-reassign
            enemyGameboardDom.children[position].style.background = "#F93943";
        });
    });
    enemy.gameboard.missedHits.forEach((missedHitPosition) => {
    // eslint-disable-next-line no-param-reassign
        enemyGameboardDom.children[missedHitPosition].style.background = "#05B2DC";
    });
};

const itIsAiTurn = function () {
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.computer.attack(_gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard);
    markHitUnhit(_gameLogic__WEBPACK_IMPORTED_MODULE_0__.human, friendlyAreaGameboard);
};

const checkWinner = function () {
    const allComputerShipSunk = _gameLogic__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.areAllShipSunk();
    const allHumanShipSunk = _gameLogic__WEBPACK_IMPORTED_MODULE_0__.human.gameboard.areAllShipSunk();
    if (allComputerShipSunk) {
        return "you";
    } else if (allHumanShipSunk) {
        return "ai";
    }
    return false;
};

const removeAllEventListenerInComputerGameboard = function () {
    enemyAreaGameboard.childNodes.forEach((child) => {
        child.removeEventListener("click", handleClickEvents);
    });
};

const showScore = function () {
    const score = (0,_gameLogic__WEBPACK_IMPORTED_MODULE_0__.getHitScoreOfBothPlayer)();
    const humanScoreCard = document.querySelector("#human_score_card");
    const humanMissedHitCount = humanScoreCard.children[0];
    const humanHitCount = humanScoreCard.children[1];
    humanMissedHitCount.textContent = `Elhibázott lövések: ${ score.humanMissedHitCount }`;
    humanHitCount.textContent = `Pontok: ${ score.humanHitCount }`;

    const computerScoreCard = document.querySelector("#ai_score_card");
    const computerMissedHitCount = computerScoreCard.children[0];
    const computerHitCount = computerScoreCard.children[1];
    computerMissedHitCount.textContent = `Elhibzott lövések: ${ score.computerMissedHitCount }`;
    computerHitCount.textContent = `Pontok: ${ score.computerHitCount }`;
};

const handleClickEvents = function () {
    const targetIndex = parseInt(this.dataset.index.split(",")[0]);
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.computer.gameboard.receiveAttack(targetIndex);
    markHitUnhit(_gameLogic__WEBPACK_IMPORTED_MODULE_0__.computer, enemyAreaGameboard);
    itIsAiTurn();
    showScore();
    const winner = checkWinner();
    if (winner) {
        alert(`${ winner } won the game`);
        removeAllEventListenerInComputerGameboard();
    }
};

const addEventListenerToAiGameBoard = function () {
    enemyAreaGameboard.childNodes.forEach((child) => {
        child.addEventListener("click", handleClickEvents, { once: true });
    });
};

const aiDomContainer = document.querySelector("#ai_container");
const scoreCard = document.querySelector("#score_card_container");
const playGame = function (gameStartButton) {
    // eslint-disable-next-line no-param-reassign
    gameStartButton.style.display = "none";
    aiDomContainer.style.display = "block";
    scoreCard.style.display = "flex";
    _gameLogic__WEBPACK_IMPORTED_MODULE_0__.computer.autoPlaceShip();
    addEventListenerToAiGameBoard();
};

const startGameButton = document.querySelector("#start");
startGameButton.addEventListener("click", (e) => {
    playGame(e.target);
});

})();

/******/ })()
;
