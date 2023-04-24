type BoardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type BoardLetter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type BoardPointsType = `${BoardLetter}${BoardNumber}`;

export const totalSize = 67.4;

export class BoardPoint {
    x: number;
    y: number;
    name: BoardPointsType;

    constructor(x: number, y: number, positionName: BoardPointsType, public board: GameBoard) {
        this.x = x;
        this.y = y;
        this.name = positionName;
    }

    /**
     *  Returns the position in front of the current position
     * @param offsetMoves The number of moves to offset the position
     * @returns The position in front of the current position
     * @example
     * const position = board.getBoardPoint('a1');
     * const positionInFront = position.forwardPosition();
     * console.log(positionInFront.name); // a2
     * @example
     * const position = board.getBoardPoint('a1');
     * const positionInFront = position.forwardPosition(2);
     * console.log(positionInFront.name); // a3
     * @example
     * const position = board.getBoardPoint('a1');
     * const positionInFront = position.forwardPosition(3);
     * console.log(positionInFront.name); // null
     * @example
     * const position = board.getBoardPoint('a8');
     * const positionInFront = position.forwardPosition();
     * console.log(positionInFront.name); // null
     * @example
     * const position = board.getBoardPoint('a8');
     * const positionInFront = position.forwardPosition(2);
     * console.log(positionInFront.name); // null
     */
    forwardPosition(offsetMoves: number = 1): BoardPoint | null {
        const letter = this.name[0];
        const number = parseInt(this.name[1]) as BoardNumber;

        if (number + offsetMoves > 8) {
            return null;
        }

        return this.board.getBoardPoint(`${letter}${number + offsetMoves}` as BoardPointsType);
    }

    backwardPosition(offsetMoves: number = 1): BoardPoint | null {
        const letter = this.name[0];
        const number = parseInt(this.name[1]) as BoardNumber;

        if (number - offsetMoves < 1) {
            return null;
        }

        return this.board.getBoardPoint(`${letter}${number - offsetMoves}` as BoardPointsType);
    }

    leftPosition(offsetMoves: number = 1): BoardPoint | null {
        const letter = this.name[0];
        const number = parseInt(this.name[1]) as BoardNumber;

        if (letter === 'a') {
            return null;
        }

        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        const index = letters.indexOf(letter);

        if (index - offsetMoves < 0) {
            return null;
        }

        return this.board.getBoardPoint(
            `${letters[index - offsetMoves]}${number}` as BoardPointsType
        );
    }

    rightPosition(offsetMoves: number = 1): BoardPoint | null {
        const letter = this.name[0];
        const number = parseInt(this.name[1]) as BoardNumber;

        if (letter === 'h') {
            return null;
        }

        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        const index = letters.indexOf(letter);

        if (index + offsetMoves > 7) {
            return null;
        }

        return this.board.getBoardPoint(
            `${letters[index + offsetMoves]}${number}` as BoardPointsType
        );
    }
}

class BoardHash {
    [key: string]: BoardPoint;
}

export class GameBoard {
    image: HTMLImageElement;
    boardPoints: BoardPoint[] = [];
    boardHash: BoardHash = {};
    selected: BoardPoint | null = null;

    constructor() {
        this.image = new Image();
        this.image.src = 'assets/board.png';
        this.calculateBoardPoints();
        this.calculateBoardHash();
    }

    calculateBoardHash() {
        for (const boardPoint of this.boardPoints) {
            this.boardHash[boardPoint.name] = boardPoint;
        }
    }

    calculateBoardPoints() {
        this.boardPoints = [];

        const offset = 30.2;
        const size = totalSize;

        const nameLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const nameNumbers = ['1', '2', '3', '4', '5', '6', '7', '8'];

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.boardPoints.push(
                    new BoardPoint(
                        offset + i * size,
                        offset + j * size,
                        (nameLetters[i] +
                            nameNumbers[nameNumbers.length - 1 - j]) as BoardPointsType,
                        this
                    )
                );
            }
        }
    }

    getBoardPoint(positionName: BoardPointsType): BoardPoint {
        return this.boardHash[positionName];
    }

    update(delta: number, ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, 0, 0, 600, 600);
        this.drawPlaces(ctx);
    }

    drawPlaces(ctx: CanvasRenderingContext2D) {
        const size = totalSize;

        for (const boardPoint of this.boardPoints) {
            if (this.selected == boardPoint) {
                ctx.fillStyle = 'rgba(100, 10, 350, 0.3)';
            } else continue;

            ctx.fillRect(boardPoint.x, boardPoint.y, size, size);
        }
    }

    drawAvailableMoves(ctx: CanvasRenderingContext2D, availableMoves: BoardPoint[], size: number) {
        for (const boardPoint of availableMoves) {
            ctx.fillStyle = 'rgba(0, 250, 0, 0.5)';
            ctx.fillRect(boardPoint.x, boardPoint.y, size, size);
        }
    }

    onClick(x: number, y: number): BoardPoint | null {
        const oldSelected = this.selected;
        if (this.selected != null) this.selected = null;

        for (const boardPoint of this.boardPoints) {
            if (x >= boardPoint.x && x <= boardPoint.x + totalSize + 1) {
                if (y >= boardPoint.y && y <= boardPoint.y + totalSize + 1) {
                    if (oldSelected == boardPoint) return null;
                    this.selected = boardPoint;

                    return boardPoint;
                }
            }
        }

        return null;
    }

    positionToBoardPointName(x: number, y: number): BoardPointsType {
        for (const boardPoint of this.boardPoints) {
            if (x >= boardPoint.x && x <= boardPoint.x + totalSize + 1) {
                if (y >= boardPoint.y && y <= boardPoint.y + totalSize + 1) {
                    return boardPoint.name;
                }
            }
        }

        return 'a1';
    }

    setSelected(positionName: BoardPointsType) {
        this.selected = this.getBoardPoint(positionName);
    }
}
