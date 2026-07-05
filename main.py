from flask import Flask, render_template, abort
app = Flask(__name__)

# Registry of games 
GAMES = {
    "snake" : {
        "name" : "Snake",
        "script" : "js/snake.js",
        "thumbnail" : "assets/imgs/snake.png",
        "module" : False
    },
    "Flap" : {
        "name" : "Flap",
        "script" : "js/flap.js",
        "thumbnail" : "assets/imgs/snake.png",
        "module" : True
    }
}

@app.route("/")
def index():
    return render_template("home.html", games=GAMES)

@app.route("/game/<slug>")
def game(slug):
    g = GAMES.get(slug)
    if not g:
        abort(404)
    return render_template("game.html", slug=slug, game_name=g["name"], script_file=g["script"], is_module=g["module"])

if __name__ == "__main__":
    app.run(debug=True)