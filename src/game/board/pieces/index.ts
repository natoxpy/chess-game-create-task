import type { BoardPointsType, GameBoard } from '../../board';
import { Knight, Pawn, Queen, Rook, Bishop, King } from './individuals';
import type { Piece } from './piece';

export class PiecesTileSet {
    image: HTMLImageElement;
    loaded = false;

    constructor(url: string) {
        this.image = new Image();
        this.image.src = url;

        this.image.onload = () => {
            this.loaded = true;
        };
    }

    waitForLoad(): Promise<void> {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (this.loaded) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }

    getTile(x: number, y: number): HTMLCanvasElement {
        const size = 16;
        const canvas = document.createElement('canvas');

        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext('2d')!;

        ctx.drawImage(this.image, x * size, y * size, size, size, 0, 0, size, size);

        return canvas;
    }
}

export class PiecesManager {
    pieces: Piece[] = [];

    update(delta: number, ctx: CanvasRenderingContext2D) {
        for (const piece of this.pieces) {
            piece.update(delta, ctx);
        }
    }

    getPieceAtPosition(positionName: BoardPointsType): Piece | null {
        for (const piece of this.pieces) {
            if (piece.position.name === positionName) {
                return piece;
            }
        }

        return null;
    }

    removePieceAtPosition(positionName: BoardPointsType) {
        const piece = this.getPieceAtPosition(positionName);

        if (piece) {
            this.pieces = this.pieces.filter((p) => p !== piece);
        }
    }

    isAtEnd(piece: Piece) {
        return false;
    }
}

export class BlackManager extends PiecesManager {
    constructor(board: GameBoard, piecesTileSet: PiecesTileSet) {
        super();

        this.pieces = [
            new Pawn(piecesTileSet, board.getBoardPoint('a7')),
            new Pawn(piecesTileSet, board.getBoardPoint('b7')),
            new Pawn(piecesTileSet, board.getBoardPoint('c7')),
            new Pawn(piecesTileSet, board.getBoardPoint('d7')),
            new Pawn(piecesTileSet, board.getBoardPoint('e7')),
            new Pawn(piecesTileSet, board.getBoardPoint('f7')),
            new Pawn(piecesTileSet, board.getBoardPoint('g7')),
            new Pawn(piecesTileSet, board.getBoardPoint('h7')),
            new Rook(piecesTileSet, board.getBoardPoint('a8')),
            new Knight(piecesTileSet, board.getBoardPoint('b8')),
            new Bishop(piecesTileSet, board.getBoardPoint('c8')),
            new Queen(piecesTileSet, board.getBoardPoint('d8')),
            new King(piecesTileSet, board.getBoardPoint('e8')),
            new Bishop(piecesTileSet, board.getBoardPoint('f8')),
            new Knight(piecesTileSet, board.getBoardPoint('g8')),
            new Rook(piecesTileSet, board.getBoardPoint('h8'))
        ];
    }

    isAtEnd(piece: Piece): boolean {
        return piece.position.name[1] === '8';
    }

    makeRandomMove(enemyPieces: PiecesManager) {
        let piece;
        let available;

        do {
            piece = this.pieces[Math.floor(Math.random() * this.pieces.length)];
            available = piece.availableMoves(this, enemyPieces, true);
        } while (available.length === 0);

        piece.moveToPosition(available[Math.floor(Math.random() * available.length)].name, this);

        const enemyPiece = enemyPieces.getPieceAtPosition(piece.position.name);

        if (enemyPiece) enemyPieces.removePieceAtPosition(piece.position.name);

        if (enemyPiece instanceof King) {
            setTimeout(() => {
                alert('You lose!');
                location.reload();
            }, 100);
        }
    }
}

export class WhiteManager extends PiecesManager {
    constructor(board: GameBoard, tileset: PiecesTileSet) {
        super();

        this.pieces = [
            new Pawn(tileset, board.getBoardPoint('a2')),
            new Pawn(tileset, board.getBoardPoint('b2')),
            new Pawn(tileset, board.getBoardPoint('c2')),
            new Pawn(tileset, board.getBoardPoint('d2')),
            new Pawn(tileset, board.getBoardPoint('e2')),
            new Pawn(tileset, board.getBoardPoint('f2')),
            new Pawn(tileset, board.getBoardPoint('g2')),
            new Pawn(tileset, board.getBoardPoint('h2')),
            new Rook(tileset, board.getBoardPoint('a1')),
            new Knight(tileset, board.getBoardPoint('b1')),
            new Bishop(tileset, board.getBoardPoint('c1')),
            new Queen(tileset, board.getBoardPoint('d1')),
            new King(tileset, board.getBoardPoint('e1')),
            new Bishop(tileset, board.getBoardPoint('f1')),
            new Knight(tileset, board.getBoardPoint('g1')),
            new Rook(tileset, board.getBoardPoint('h1'))
        ];
    }

    isAtEnd(piece: Piece): boolean {
        return piece.position.name[1] === '1';
    }
}
