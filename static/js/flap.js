import kaboom from "./kaboom.js";

kaboom({
    canvas: document.getElementById("canvas"),
    width: 640,
    height: 480,
    scale: 1,
    clearColor: [0, 0, 0, 1],
    background: [135, 206, 235],
    global: true,
});

let pipes = [];

function spawnPipe() {
    const pipeHeight = rand(100, height() - 200);
    const gapSize = 150;
    const pipeSpeed = 200;

    const pipeTop = add([
        rect(80, pipeHeight),
        pos(width(), 0),
        color(0, 255, 0),
        area(),
        "pipe",
        move(LEFT, pipeSpeed),
        outline(4, rgb(255, 255, 255)),
    ]); 

    const pipeBottom = add([
        rect(80, height() - pipeHeight - gapSize),
        pos(width(), pipeHeight + gapSize),
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

scene("game", () => { 
    let score = 0;
    let display_text = "Score: " + score;

    const scoreText = add([
        text(display_text, { size: 24 }),
        pos(10, 10),
        color(255, 255, 255),
        z(2),   
    ]);

    const ground = add([
    rect(width(), 48),
    pos(0, height() - 48),
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
    
    loop(2, () => {
        spawnPipe();
    });

    setGravity(1200);

    const player = add([
        rect(40, 40),
        pos(150, 80),
        color(255, 200, 0),
        outline(2, rgb(255, 255, 255)),
        area(),
        body(),
        {
            jump_strength: 400,
        }
    ]);

    onKeyPress("space", () => {
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
        display_text = "Score: " + score;
        scoreText.text = display_text;
        destroy(zone);
    });
});

scene("gameover", () => {
    add([
        text("Game Over", { size: 48 }),
        pos(width() / 2, height() / 2),
        color(255, 0, 0),
        anchor("center"),  
    ]);
    onKeyPress("space", () => {
        go("game");
    });
});


// initial scene
add([
        text("Press Space to Start", { size: 24 }),
        pos(width() / 2, height() / 2),
        color(255, 255, 255),
        anchor("center"),
]);

onKeyPress("space", () => {
    go("game");
});