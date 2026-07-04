from flask import Flask, render_template, abort
app = Flask(__name__)

# Registry of games 
GAMES = {
    "snake" : {
        "name" : "Snake",
        "script" : "js/snake.js",
        "thumbnail" : "assets/imgs/snake.png"
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
    return render_template("game.html", slug=slug, game_name=g["name"], script_file=g["script"])

@app.route("/leaderboard")
def leaderboard(): 
    return render_template("leaderboard.html")


if __name__ == "__main__":
    app.run(debug=True)