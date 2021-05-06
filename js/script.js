// 「.card」クラスの物全てを「cards」として定義する
const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;  /* 反転したカード？ 最初は反転していない状態 */
let first, second;  /* 1回目、２回目に引くカード ここではまだ定義しない */
let lockBoard = false; /* 固定したいカード？ 最初はまだ固定しない */

// 反転するファンクション
function flipCard() {
    if (lockBoard) return;
    if (this === first) return;

    this.classList.add('flip'); /* addじゃなくてtoggle?? */
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        first = this;
        return;
    }

    second = this;
    lockBoard = true;

    checkForMatch();
}

// 1枚目と２枚目が一致したら 選べないカードにする機能、一致しなかったらリセット機能
function checkForMatch() {
    let isMatch = first.dataset.face === second.dataset.face;
    //「name」? 「face」??どっちでも良いのか？？
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    first.removeEventListener('click', flipCard);
    second.removeEventListener('click', flipCard);
    resetBoard();

}

function unflipCards() {
    lockBorad = true;
    setTimeout(() => {
        first.classList.remove('flip');
        second.classList.remove('flip');

        resetBoard();
    }, 1500);
}


function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [first, second] = [null, null];
}


(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 30);
        card.style.order = ramdomPos;
    });
})();

// (function shuffle() {
//     cards.forEach(card => {
//         let newPosition = Math.floor(Math.random() * 30);
//         card.style.order = newPosition;
//     });
// })();

// 一つ一つのカードにイベントリスナーをつけて、「クリック」できる状態にする
cards.forEach(card => card.addEventListener('click', flipCard));