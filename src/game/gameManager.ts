import { type BoardPoint, type GameBoard, totalSize } from './board';
import { King } from './board/pieces/individuals';
import type { Piece } from './board/pieces/piece';
import type { TurnsManager } from './turnsManager';

export class GameManager {
    public constructor(public board: GameBoard, public turnsManager: TurnsManager) {}

    public update(delta: number, ctx: CanvasRenderingContext2D) {
        this.board.update(delta, ctx);
        this.turnsManager.update(delta, ctx);

        if (this.board.selected) {
            const piece = this.turnsManager.whiteManager.getPieceAtPosition(
                this.board.selected.name
            );

            if (!piece) return;

            this.board.drawAvailableMoves(
                ctx,
                piece.availableMoves(
                    this.turnsManager.whiteManager,
                    this.turnsManager.blackManager
                ),
                totalSize
            );
        }
    }

    public onClick(x: number, y: number) {
        if (!this.turnsManager.isWhiteTurn()) return;

        const selected = this.board.selected;
        const newSelection = this.board.onClick(x, y);

        if (!selected || !newSelection) return;

        this.handleMove(selected, newSelection);
    }

    public handleMove(selected: BoardPoint, newSelection: BoardPoint) {
        const piece = this.turnsManager.whiteManager.getPieceAtPosition(selected.name);

        if (!piece) return;

        const availableMoves = piece.availableMoves(
            this.turnsManager.whiteManager,
            this.turnsManager.blackManager
        );

        if (availableMoves.includes(newSelection)) {
            this.turnsManager.nextTurn();

            this.board.selected = null;
            piece.move(newSelection.name);

            const pieceAtPlace = this.turnsManager.blackManager.getPieceAtPosition(
                newSelection.name
            );
            pieceAtPlace && this.capturePiece(pieceAtPlace);
        }
    }

    public capturePiece(piece: Piece) {
        this.turnsManager.blackManager.removePieceAtPosition(piece.position.name);
        setTimeout(() => {
            if (piece instanceof King) {
                alert('White won!');
                location.reload();
            }
        }, 100);
    }
}
