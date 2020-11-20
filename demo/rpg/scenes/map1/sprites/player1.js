"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map1Player1 = void 0;
var Map1Player1 = (function () {
    function Map1Player1() {
    }
    Map1Player1.prototype.onUpdate = function (sprite) {
    };
    Map1Player1.prototype.onSceneActivate = function (sprite) {
        console.log("Player - onSceneActivate: " + sprite.name);
        sprite.base.onSceneActivate(sprite);
    };
    return Map1Player1;
}());
exports.Map1Player1 = Map1Player1;

//# sourceMappingURL=player1.js.map
