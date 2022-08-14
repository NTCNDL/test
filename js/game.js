(function () {
    var that;

    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        this.food.render(this.map);
        this.snake.render(this.map);

        runSnake();
        bindKey();
    };

    function bindKey() {
        document.onkeydown = function (e) {
            e = e || window.event;
            switch (e.keyCode) {
                case 37:
                    that.snake.direction = "left";
                    break;
                case 38:
                    that.snake.direction = "top";
                    break;
                case 39:
                    that.snake.direction = "right";
                    break;
                case 40:
                    that.snake.direction = "bottom";
                    break;
            }
        };
    }

    function runSnake() {
        var timer = setInterval(function () {
            that.snake.move();
            that.snake.remove(that.map);
            that.snake.render(that.map);

            var maxX = that.map.clientWidth / that.snake.width;
            var maxY = that.map.clientHeight / that.snake.height;

            var headerX = that.snake.body[0].x;
            var headerY = that.snake.body[0].y;

            var foodX = that.food.x;
            var foodY = that.food.y;

            var hX = headerX * that.snake.width;
            var hY = headerY * that.snake.height;

            if (foodX === hX && foodY === hY) {
                that.food.remove(that.map, 0);
                that.food.render(that.map);

                var last = that.snake.body[that.snake.body.length - 1];
                that.snake.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                });
            }

            if (headerX < 0 || headerX >= maxX || headerY < 0 || headerY >= maxY) {
                clearInterval(timer);
                alert("游戏结束");
            }
        }, 150);
    }

    window.Game = Game;
})();
