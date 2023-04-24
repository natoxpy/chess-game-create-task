import { Piece } from '../piece';
import type { PiecesManager, PiecesTileSet } from '..';
import type { BoardPoint } from '../..';

export class Queen extends Piece {
    constructor(tileset: PiecesTileSet, position: BoardPoint) {
        super(tileset.getTile(5, 0), position);
    }

    fullX(friendlyPieces: PiecesManager, enemyPieces: PiecesManager): BoardPoint[] {
        const movesList: BoardPoint[] = [];

        let forward = this.position.forwardPosition();

        while (forward != null) {
            if (friendlyPieces.getPieceAtPosition(forward.name)) break;
            movesList.push(forward);
            if (enemyPieces.getPieceAtPosition(forward.name)) break;
            forward = forward.forwardPosition();
        }

        let backward = this.position.backwardPosition();

        while (backward != null) {
            if (friendlyPieces.getPieceAtPosition(backward.name)) break;
            movesList.push(backward);
            if (enemyPieces.getPieceAtPosition(backward.name)) break;
            backward = backward.backwardPosition();
        }

        return movesList;
    }

    fullY(friendlyPieces: PiecesManager, enemyPieces: PiecesManager): BoardPoint[] {
        const movesList: BoardPoint[] = [];

        let right = this.position.rightPosition();

        while (right != null) {
            if (friendlyPieces.getPieceAtPosition(right.name)) break;
            movesList.push(right);
            if (enemyPieces.getPieceAtPosition(right.name)) break;
            right = right.rightPosition();
        }

        let left = this.position.leftPosition();

        while (left != null) {
            if (friendlyPieces.getPieceAtPosition(left.name)) break;
            movesList.push(left);
            if (enemyPieces.getPieceAtPosition(left.name)) break;
            left = left.leftPosition();
        }

        return movesList;
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

    public availableMoves(friendlyPieces: PiecesManager, enemyPieces: PiecesManager): BoardPoint[] {
        const moves: BoardPoint[] = [];

        moves.push(...this.fullX(friendlyPieces, enemyPieces));
        moves.push(...this.fullY(friendlyPieces, enemyPieces));

        moves.push(...this.topRightToBottomLeft(friendlyPieces, enemyPieces));
        moves.push(...this.topLeftToBottomRight(friendlyPieces, enemyPieces));

        // this.appendDefined(moves, this.position.forwardPosition()?.leftPosition(), friendlyPieces);
        // this.appendDefined(moves, this.position.forwardPosition()?.rightPosition(), friendlyPieces);

        // this.appendDefined(moves, this.position.backwardPosition()?.leftPosition(), friendlyPieces);
        // this.appendDefined(
        //     moves,
        //     this.position.backwardPosition()?.rightPosition(),
        //     friendlyPieces
        // );

        return moves;
    }
}
