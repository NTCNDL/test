(function () {

    var ps = "absolute";

    function Snake(option) {
        option = option instanceof Object ? option : {};
        this.width = option.width || 20;
        this.height = option.height || 20;
        this.body = [
            {x: 3, y: 2, color: "red"},
            {x: 2, y: 2, color: "blue"},
            {x: 1, y: 2, color: "blue"},
        ];
        this.direction = "right";
        this.elements = [];
    }

    Snake.prototype.render = function (map) {
        for (var i = 0, len = this.body.length; i < len; i++) {
            var piece = this.body[i];
            var ele = document.createElement("div");
            ele.style.width = this.width + "px";
            ele.style.height = this.height + "px";
            ele.style.left = piece.x * this.width + "px";
            ele.style.top = piece.y * this.height + "px";
            ele.style.backgroundColor = piece.color;
            ele.style.position = ps;
            map.appendChild(ele);
            this.elements.push(ele);
        }
    };

    Snake.prototype.move = function () {
        for (var i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x;
            this.body[i].y = this.body[i - 1].y;
        }
        var header = this.body[0];
        switch (this.direction) {
            case "right":
                header.x += 1;
                break;
            case "left":
                header.x -= 1;
                break;
            case "top":
                header.y -= 1;
                break;
            case "bottom":
                header.y += 1;
                break;
        }
    };

    Snake.prototype.remove = function (map) {
        for (var i = this.elements.length - 1; i >= 0; i--) {
            map.removeChild(this.elements[i]);
        }
        this.elements = [];
    };

    window.Snake = Snake;

})();