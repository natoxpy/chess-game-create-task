import { Piece } from '../piece';
import type { PiecesManager, PiecesTileSet } from '..';
import type { BoardPoint } from '../..';

export class Knight extends Piece {
    constructor(tileset: PiecesTileSet, position: BoardPoint) {
        super(tileset.getTile(1, 0), position);
    }

    public availableMoves(friendlyPieces: PiecesManager): BoardPoint[] {
        const moves: BoardPoint[] = [];

        this.appendDefined(
            moves,
            this.position.forwardPosition(2)?.rightPosition(),
            friendlyPieces
        );
        this.appendDefined(
            moves,
            this.position.forwardPosition()?.rightPosition(2),
            friendlyPieces
        );
        this.appendDefined(moves, this.position.forwardPosition(2)?.leftPosition(), friendlyPieces);
        this.appendDefined(moves, this.position.forwardPosition()?.leftPosition(2), friendlyPieces);
        this.appendDefined(
            moves,
            this.position.backwardPosition(2)?.rightPosition(),
            friendlyPieces
        );
        this.appendDefined(
            moves,
            this.position.backwardPosition()?.rightPosition(2),
            friendlyPieces
        );
        this.appendDefined(
            moves,
            this.position.backwardPosition(2)?.leftPosition(),
            friendlyPieces
        );
        this.appendDefined(
            moves,
            this.position.backwardPosition()?.leftPosition(2),
            friendlyPieces
        );

        return moves;
    }
}
