"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteFighter = void 0;
var SpriteFighter = (function () {
    function SpriteFighter() {
    }
    SpriteFighter.prototype.onSceneActivate = function (sprite) {
        console.log("onSceneActivate - " + sprite.name);
    };
    return SpriteFighter;
}());
exports.SpriteFighter = SpriteFighter;

//# sourceMappingURL=fighter.js.map
