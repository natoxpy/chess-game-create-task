import { Piece } from '../piece';
import type { PiecesManager, PiecesTileSet } from '..';
import type { BoardPoint } from '../..';

export class Rook extends Piece {
    constructor(tileset: PiecesTileSet, position: BoardPoint) {
        super(tileset.getTile(2, 0), position);
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

    availableMoves(friendlyPieces: PiecesManager, enemyPieces: PiecesManager): BoardPoint[] {
        const movesList: BoardPoint[] = [];

        movesList.push(...this.fullX(friendlyPieces, enemyPieces));
        movesList.push(...this.fullY(friendlyPieces, enemyPieces));

        return movesList;
    }
}
