import type { PiecesManager } from '.';
import type { BoardPoint, BoardPointsType } from '..';
import { totalSize } from '../index';

export class Piece {
    constructor(public canvas: HTMLCanvasElement, public position: BoardPoint) {}

    update(delta: number, ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.canvas, this.position.x, this.position.y, totalSize, totalSize);
    }

    move(positionName: BoardPointsType) {
        this.position = this.position.board.getBoardPoint(positionName);
    }

    availableMoves(
        friendlyPieces: PiecesManager,
        enemyPieces: PiecesManager,
        reversed: boolean = false
    ): BoardPoint[] {
        return [];
    }

    appendDefined(
        array: BoardPoint[],
        value?: BoardPoint | null,
        friendlyPieces?: PiecesManager
    ): BoardPoint[] {
        if (friendlyPieces) {
            if (value && friendlyPieces.getPieceAtPosition(value.name)) return array;
        }

        if (value) array.push(value);

        return array;
    }

    moveToPosition(positionName: BoardPointsType, friendlyPieces: PiecesManager) {
        const position = this.position.board.getBoardPoint(positionName);

        if (!position) return;

        const piece = friendlyPieces.getPieceAtPosition(positionName);

        if (piece) {
            friendlyPieces.removePieceAtPosition(positionName);
        }

        this.move(positionName);
    }
}
