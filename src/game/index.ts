import { GameBoard } from './board';
import { WhiteManager, BlackManager, PiecesTileSet } from './board/pieces';
import { GameManager } from './gameManager';
import { TurnsManager } from './turnsManager';

const tilesets = {
    white: new PiecesTileSet('/assets/pieces_tilesets/white.png'),
    black: new PiecesTileSet('/assets/pieces_tilesets/black.png')
};

let board: GameBoard;
let whiteManager: WhiteManager;
let blackManager: BlackManager;
let gameManager: GameManager;
let turnsManager: TurnsManager;
let loaded = false;

Promise.all([tilesets.white.waitForLoad(), tilesets.black.waitForLoad()]).then(() => {
    loaded = true;
    init();
});

export function init() {
    board = new GameBoard();
    whiteManager = new WhiteManager(board, tilesets.white);
    blackManager = new BlackManager(board, tilesets.black);
    turnsManager = new TurnsManager(whiteManager, blackManager);
    gameManager = new GameManager(board, turnsManager);
}

export function mainloop(delta: number, ctx: CanvasRenderingContext2D) {
    if (!loaded) return;

    gameManager.update(delta, ctx);
}

export function onClickCanvas(event: MouseEvent, canvas: HTMLCanvasElement) {
    const cx = event.clientX - canvas.offsetLeft;
    const cy = event.clientY - canvas.offsetTop;

    if (cx < 30 || cx > 30 + 720) return;
    if (cy < 30 || cy > 30 + 720) return;

    gameManager.onClick(cx, cy);
}
