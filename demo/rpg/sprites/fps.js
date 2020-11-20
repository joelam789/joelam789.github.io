"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteFps = void 0;
var SpriteFps = (function () {
    function SpriteFps() {
    }
    SpriteFps.prototype.onUpdate = function (sprite) {
        var display = sprite.components["display"];
        if (display && display.object)
            display.object.text = Math.round(sprite.game.fps).toString();
    };
    return SpriteFps;
}());
exports.SpriteFps = SpriteFps;

//# sourceMappingURL=fps.js.map
