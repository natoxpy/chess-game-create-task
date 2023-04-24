import { Piece } from '../piece';
import type { PiecesManager, PiecesTileSet } from '..';
import type { BoardPoint, BoardPointsType } from '../..';

export class Pawn extends Piece {
    firstMove: boolean = true;

    constructor(tileset: PiecesTileSet, position: BoardPoint) {
        super(tileset.getTile(0, 0), position);
    }

    move(positionName: BoardPointsType) {
        this.firstMove = false;
        super.move(positionName);
    }

    availableMoves(
        friendlyPieces: PiecesManager,
        enemyPiece: PiecesManager,
        reversed: boolean = false
    ): BoardPoint[] {
        const moves: BoardPoint[] = [];

        if (reversed) {
            const first = this.position.backwardPosition();
            first && !friendlyPieces.getPieceAtPosition(first.name) && moves.push(first);

            const isBlocked = first ? friendlyPieces.getPieceAtPosition(first.name) != null : true;

            const second = this.position.backwardPosition()?.backwardPosition();

            this.firstMove &&
                second &&
                !friendlyPieces.getPieceAtPosition(second.name) &&
                !enemyPiece.getPieceAtPosition(second.name) &&
                !isBlocked &&
                moves.push(second);

            const left = this.position.backwardPosition()!.leftPosition();
            left && enemyPiece.getPieceAtPosition(left.name) && moves.push(left);

            const right = this.position.backwardPosition()!.rightPosition();
            right && enemyPiece.getPieceAtPosition(right.name) && moves.push(right);
        } else {
            const first = this.position.forwardPosition();

            const enemyBlock = first ? enemyPiece.getPieceAtPosition(first.name) != null : true;

            first &&
                !friendlyPieces.getPieceAtPosition(first.name) &&
                !enemyBlock &&
                moves.push(first);

            const isBlocked = first ? friendlyPieces.getPieceAtPosition(first.name) != null : true;

            const second = this.position.forwardPosition()?.forwardPosition();
            this.firstMove &&
                second &&
                !friendlyPieces.getPieceAtPosition(second.name) &&
                !enemyPiece.getPieceAtPosition(second.name) &&
                !isBlocked &&
                moves.push(second);

            const left = this.position.forwardPosition()!.leftPosition();
            left && enemyPiece.getPieceAtPosition(left.name) && moves.push(left);

            const right = this.position.forwardPosition()!.rightPosition();
            right && enemyPiece.getPieceAtPosition(right.name) && moves.push(right);
        }

        return moves;
    }
}
