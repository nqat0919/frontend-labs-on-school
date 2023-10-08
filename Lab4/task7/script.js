'use strict';
const coords = [];
const size = Number.parseInt($(':root').css('--size'));
let targetID = 1;
class Rect {
    constructor(x1, y1, x2, y2, name) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.name = name;
    }
    doOverlap(b) { 
        // no horizontal overlap
        if (this.x1 >= b.x2 || b.x1 >= this.x2) return false;

        // no vertical overlap
        if (this.y1 >= b.y2 || b.y1 >= this.y2) return false;

        return true;
    }
}

for (let i  = 1; i <= 250; i++) {
    const body_height = $('.container').height();
    const body_width = $('.container').width();
    let top = getRandom(body_height - size);
    let left = getRandom(body_width - size);
    let rect = new Rect(left, top, left + size, top + size, i);
    let check = coords.filter((iRect) => rect.doOverlap(iRect));
    while (!!check.length) {
        top = getRandom(body_height - size);
        left = getRandom(body_width - size);
        rect = new Rect(left, top, left + size, top + size, i);
        check = coords.filter((iRect) => rect.doOverlap(iRect));
    }
    const btn = document.createElement('button')
    $(btn).addClass('btn').data('button-id', i).text(i).css({
        "top": `${top}px`,
        "left": `${left}px`,
        "background-color": `${getRandomColor()}`
    });
    $('.container').append(btn)
    coords.push(rect)
}
$('.container').on('click', '.btn', function() {
    // console.log($(this).data('button-id'))
    if ($(this).data('button-id') == targetID) 
        $(this).remove() && $('.target span').text(++targetID);
    else
        $('.container').append(`<div class="game-over"><span>GAME OVER</span></div>`);
})

function getRandom(max) {
    return Math.trunc(Math.random() * max + 1);
}

function getRandomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
}
  