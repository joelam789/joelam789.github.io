"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game1 = void 0;
var Game1 = (function () {
    function Game1() {
    }
    Game1.prototype.onInit = function (game) {
        console.log("on game init: " + game.name);
        console.log("screen size: " + game.width + "x" + game.height);
    };
    Game1.prototype.sortObjects = function (obj) {
        obj.zOrder = obj.y;
    };
    return Game1;
}());
exports.Game1 = Game1;

//# sourceMappingURL=demo.js.map
