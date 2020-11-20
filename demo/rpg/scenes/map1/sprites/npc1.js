"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map1Npc1 = void 0;
var Map1Npc1 = (function () {
    function Map1Npc1() {
    }
    Map1Npc1.prototype.onUpdate = function (sprite) {
    };
    Map1Npc1.prototype.onSceneActivate = function (sprite) {
        console.log("Npc - onSceneActivate: " + sprite.name);
        sprite.base.onSceneActivate(sprite);
    };
    return Map1Npc1;
}());
exports.Map1Npc1 = Map1Npc1;

//# sourceMappingURL=npc1.js.map
