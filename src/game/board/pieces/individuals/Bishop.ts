import { Piece } from '../piece';
import type { PiecesManager, PiecesTileSet } from '..';
import type { BoardPoint } from '../..';

export class Bishop extends Piece {
    constructor(tileset: PiecesTileSet, position: BoardPoint) {
        super(tileset.getTile(3, 0), position);
    }

    public topRightToBottomLeft(
        friendlyPieces: PiecesManager,
        enemyPieces: PiecesManager
    ): BoardPoint[] {
        const moves: BoardPoint[] = [];

        let point;

        point = this.position.backwardPosition(1)?.rightPosition(1);

        while (point) {
            if (friendlyPieces.getPieceAtPosition(point.name)) break;
            moves.push(point);
            if (enemyPieces.getPieceAtPosition(point.name)) break;
            point = point.backwardPosition(1)?.rightPosition(1);
        }

        point = this.position.forwardPosition(1)?.leftPosition(1);

        while (point) {
            if (friendlyPieces.getPieceAtPosition(point.name)) break;
            moves.push(point);
            if (enemyPieces.getPieceAtPosition(point.name)) break;
            point = point.forwardPosition(1)?.leftPosition(1);
        }

        return moves;
    }

    public topLeftToBottomRight(
        friendlyPieces: PiecesManager,
        enemyPieces: PiecesManager
    ): BoardPoint[] {
        const moves: BoardPoint[] = [];

        let point;

        point = this.position.backwardPosition(1)?.leftPosition(1);

        while (point) {
            if (friendlyPieces.getPieceAtPosition(point.name)) break;
            moves.push(point);
            if (enemyPieces.getPieceAtPosition(point.name)) break;
            point = point.backwardPosition(1)?.leftPosition(1);
        }

        point = this.position.forwardPosition(1)?.rightPosition(1);

        while (point) {
            if (friendlyPieces.getPieceAtPosition(point.name)) break;
            moves.push(point);
            if (enemyPieces.getPieceAtPosition(point.name)) break;
            point = point.forwardPosition(1)?.rightPosition(1);
        }

        return moves;
    }

    availableMoves(friendlyPieces: PiecesManager, enemyPieces: PiecesManager): BoardPoint[] {
        const moves: BoardPoint[] = [];

        moves.push(...this.topRightToBottomLeft(friendlyPieces, enemyPieces));
        moves.push(...this.topLeftToBottomRight(friendlyPieces, enemyPieces));

        return moves;
    }
}
