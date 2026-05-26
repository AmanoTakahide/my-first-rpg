// ==========================================
// 1. 基本設定（ゲーム全体のルールとなる定数）
// ==========================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GRID_SIZE = 32; // 1マスのサイズ（32ピクセル）

// ==========================================
// 2. ゲームのデータ（キャラクターやメッセージの状態）
// ==========================================
const player = {
    x: 4,
    y: 8,
    char: "👆🏻"
};

const kintamaRight = {
    x: 4,
    y: 1,
    char: "🌕",
    isAlive: true
};

const kintamaLeft = {
    x: 5,
    y: 1,
    char: "🌕",
    isAlive: true
};

let message = "玉に近づいて狩れ！";

// ==========================================
// 3. 描画処理（画面のパラパラ漫画を描き直す関数）
// ==========================================
function draw() {
    // 画面を一回真っ白に消す
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景のグリッド線を引く
    ctx.strokeStyle = "#222";
    for (let i = 0; i <= canvas.width; i += GRID_SIZE) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // 金玉が生きていれば画面に描く
    if (kintamaRight.isAlive) {
        ctx.font = "24px sans-serif";
        ctx.fillText(kintamaRight.char, kintamaRight.x * GRID_SIZE + 4, kintamaRight.y * GRID_SIZE + 26);
    }

    // 金玉が生きていれば画面に描く
    if (kintamaLeft.isAlive) {
        ctx.font = "24px sans-serif";
        ctx.fillText(kintamaLeft.char, kintamaLeft.x * GRID_SIZE + 4, kintamaLeft.y * GRID_SIZE + 26);
    }

    // ゆうしゃを画面に描く
    ctx.font = "24px sans-serif";
    ctx.fillText(player.char, player.x * GRID_SIZE + 4, player.y * GRID_SIZE + 26);

    // 下部のメッセージを描く
    ctx.fillStyle = "white";
    ctx.font = "14px sans-serif";
    ctx.fillText(message, 10, canvas.height - 15);
}

// ==========================================
// 4. 移動・戦闘処理（プレイヤーが動いたときのルール）
// ==========================================
function move(direction) {
    // 金玉がすでに倒されていたら、これ以上動けない
    //if (!kintamaRight.isAlive) return;

    let nextX = player.x;
    let nextY = player.y;

    // 行き先のマスを計算（画面の外（0〜9マス）に出ないように制限）
    if (direction === 'up' && player.y > 0) nextY--;
    if (direction === 'down' && player.y < 8) nextY++;
    if (direction === 'left' && player.x > 0) nextX--;
    if (direction === 'right' && player.x < 9) nextX++;

    // 当たり判定：移動先が金玉と同じマスなら戦闘発生！
    if (nextX === kintamaRight.x && nextY === kintamaRight.y) {
        kintamaRight.isAlive = false;
        message = "⚔️ 一撃必殺！右玉を倒した！";
    } else if (nextX === kintamaLeft.x && nextY === kintamaLeft.y) {
        kintamaLeft.isAlive = false;
        message = "⚔️ 一撃必殺！左玉を倒した！";
    } else {
        // 金玉のマスじゃなければ、ゆうしゃの位置を更新
        player.x = nextX;
        player.y = nextY;
    }

    // 新しい状態に画面を描き直す
    draw();
}

// ==========================================
// 5. キーボード操作の受付設定（PC用）
// ==========================================
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'w') move('up');
    if (e.key === 'ArrowDown' || e.key === 's') move('down');
    if (e.key === 'ArrowLeft' || e.key === 'a') move('left');
    if (e.key === 'ArrowRight' || e.key === 'd') move('right');
});

// ==========================================
// 6. ゲーム起動（最初に一回だけ画面を描く）
// ==========================================
draw();