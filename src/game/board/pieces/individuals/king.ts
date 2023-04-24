import { Piece } from '../piece';
import type { PiecesManager, PiecesTileSet } from '..';
import type { BoardPoint } from '../..';

export class King extends Piece {
    constructor(tileset: PiecesTileSet, position: BoardPoint) {
        super(tileset.getTile(4, 0), position);
    }

    availableMoves(friendlyPieces: PiecesManager): BoardPoint[] {
        const moves: BoardPoint[] = [];

        this.appendDefined(moves, this.position.forwardPosition(), friendlyPieces);
        this.appendDefined(moves, this.position.forwardPosition()?.leftPosition(), friendlyPieces);
        this.appendDefined(moves, this.position.forwardPosition()?.rightPosition(), friendlyPieces);
        this.appendDefined(moves, this.position.backwardPosition(), friendlyPieces);
        this.appendDefined(moves, this.position.backwardPosition()?.leftPosition(), friendlyPieces);
        this.appendDefined(
            moves,
            this.position.backwardPosition()?.rightPosition(),
            friendlyPieces
        );
        this.appendDefined(moves, this.position.leftPosition(), friendlyPieces);
        this.appendDefined(moves, this.position.rightPosition(), friendlyPieces);

        return moves;
    }
}
