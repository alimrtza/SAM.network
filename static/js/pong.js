import kaboom from "./kaboom.js";

kaboom({
    canvas: document.getElementById("canvas"),
    width: 400,
    height: 700, 
    stretch: true, // stretches to fill the screen
    letterbox: true, // adds black bars to maintain aspect ratio
    clearColor: [0, 0, 0, 1],
    background: [0, 0, 0],
    global: true,
});

scene("menu", () => {    
    add([
        text("Pong", { size: 48}),
        pos(center()),
        anchor("center"),
    ]);
    const button = add([
        rect(200, 50),
        pos(width() / 2, height() / 2 + 85),
        anchor("center"),
        color(0, 255, 0),
        area(),
        anchor("center"),
        "button",
    ]);   
    button.add([
        text("Play", { size: 24 }),
        anchor("center"),
    ]);
    button.onClick(() => {
        go("game");
    });
    button.onUpdate(() => {
        if (button.isHovering()) {
            button.color = rgb(0, 200, 0);
        } else {
            button.color = rgb(0, 255, 0);
        }
    });
});

scene("game", () => {
    add([
        rect(150, 50),
        pos(0, 0),
        color(0, 100, 0),
    ]);
});

go("menu");