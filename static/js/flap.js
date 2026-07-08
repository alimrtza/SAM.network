// fix the pipe height code
// destroy pipes when they go off screen
// empty pipe array when game restarts
// arrange the code game


import kaboom from "./kaboom.js";

kaboom({
    canvas: document.getElementById("canvas"),
    width: 400,
    height: 700,
    scale: 1,
    clearColor: [0, 0, 0, 1],
    background: [135, 206, 235],
    global: true,
});

let pipes = [];
let score = 0;
let groundHeight = 48;
let pipeSpawnInterval = 1.5; // seconds

function spawnPipe() {
    const totalPipeHeight = height() - groundHeight;
    const gapSize = 150;
    const pipeSpeed = 200;
    const minPipeHeight = 50;
    const topPipeHeight = rand(minPipeHeight, totalPipeHeight - gapSize - minPipeHeight);
    const bottomPipeHeight = totalPipeHeight - topPipeHeight - gapSize;

    const pipeTop = add([
        rect(80, topPipeHeight),
        pos(width(), 0),
        color(0, 255, 0),
        area(),
        "pipe",
        move(LEFT, pipeSpeed),
        outline(4, rgb(255, 255, 255)),
    ]); 

    const pipeBottom = add([
        rect(80, bottomPipeHeight),
        pos(width(), topPipeHeight + gapSize),
        color(0, 255, 0),
        area(),
        "pipe",
        move(LEFT, pipeSpeed),
        outline(4, rgb(255, 255, 255)),
    ]);

    const scoreZone = add([
        rect(1, height()),
        pos(width() + 80, 0),
        area(),
        "scoreZone",
        move(LEFT, pipeSpeed),
        opacity(0),
    ]); 

    pipes.push(pipeTop, pipeBottom);
};

function destroyPipe() { 
    for (let pipe of pipes) {
        if (pipe.pos.x + pipe.width < 0) {
            destroy(pipe);
            pipes.shift();
            pipes.shift();
        }
    }
}

scene ("menu", () => {
    add([
            text("Press Space to Start", { size: 24 }),
            pos(width() / 2, height() / 2),
            color(255, 255, 255),
            anchor("center"),
    ]);

    onKeyPress("space", () => {
        go("game");
    });

    onTouchStart(() => {
        go("game");
    });
});


scene("game", () => { 
    pipes = [];
    setGravity(1200);
    score = 0;
    let display_text = score;

    const scoreText = add([
        text(display_text, { size: 42 }),
        pos(width() / 2, 30),
        color(255, 255, 255),
        z(2),   
    ]);

    const ground = add([
    rect(width(), groundHeight),
    pos(0, height() - groundHeight),
    area(),
    body({ isStatic: true }),
    "boundary",
    color(0, 255, 0),
    outline(4, rgb(255, 255, 255)),
    z(1),
    ]);

    const ceiling = add([
        rect(width(), 1),
        pos(0, 0),  
        area(),
        body({ isStatic: true }),
        "boundary",
    ]);

    const player = add([
        rect(40, 40),
        pos(150, 80),
        color(255, 255, 0),
        outline(2, rgb(255, 255, 255)),
        anchor("center"),
        rotate(0),
        area(),
        body(),
        {
            jump_strength: 400,
        }
    ]);

    onKeyPress("space", () => {
        player.jump(player.jump_strength);     
    });

    onTouchStart(() => {
        player.jump(player.jump_strength);
    });

    player.onCollide("boundary", () => {
        go("gameover");
    });
    player.onCollide("pipe", () => {
        go("gameover");
    });
    
    player.onCollide("scoreZone", (zone) => {
        score += 1;
        display_text = score;
        scoreText.text = display_text;
        destroy(zone);
    });

    loop(pipeSpawnInterval, () => {
        spawnPipe();
        destroyPipe();
    });
});

scene("gameover", () => {
    add([
        text("Game Over", { size: 48 }),
        pos(width() / 2, height() / 2),
        color(255, 0, 0),
        anchor("center"),  
    ]);
    add([
        text("Press Space to Restart", { size: 24 }),
        pos(width() / 2, height() / 2 + 60),
        color(255, 255, 255),
        anchor("center"),
    ]);
    add([ 
        text("Your score: " + score, { size: 24 }),
        pos(width() / 2, height() / 2 + 100),
        color(255, 255, 255),
        anchor("center"),
    ]);
    onKeyPress("space", () => {
        go("game");
    });
    onTouchStart(() => {
        go("game");
    });
});

go("menu");