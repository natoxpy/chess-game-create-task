import type { BlackManager, WhiteManager } from './board/pieces';

export class TurnsManager {
    currentTurn: 'black' | 'white' = 'white';
    blackMoving = false;

    constructor(public whiteManager: WhiteManager, public blackManager: BlackManager) {}

    public update(delta: number, ctx: CanvasRenderingContext2D) {
        this.whiteManager.update(delta, ctx);
        this.blackManager.update(delta, ctx);

        !this.isWhiteTurn() && this.moveBlackTurn();
    }

    public moveBlackTurn() {
        if (this.blackMoving) return;

        this.blackMoving = true;

        setTimeout(() => {
            this.nextTurn();
            this.blackManager.makeRandomMove(this.whiteManager);
            this.blackMoving = false;
        }, 500 + Math.random() * 1000);
    }

    public getCurrentTurn() {
        return this.currentTurn;
    }

    public isWhiteTurn() {
        return this.currentTurn === 'white';
    }

    public nextTurn() {
        this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
    }
}
