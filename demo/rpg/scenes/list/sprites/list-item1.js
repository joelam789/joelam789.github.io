"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneListSpriteItem1 = void 0;
var SceneListSpriteItem1 = (function () {
    function SceneListSpriteItem1() {
    }
    SceneListSpriteItem1.prototype.onPointerdown = function (spr, event) {
        var list = spr.scene.sprites["list-box1"];
        if (list)
            list.code.moveCursorTo(spr);
    };
    SceneListSpriteItem1.prototype.onPointerup = function (spr, event) {
        var list = spr.scene.sprites["list-box1"];
        if (list)
            list.code.selectItem(spr);
    };
    return SceneListSpriteItem1;
}());
exports.SceneListSpriteItem1 = SceneListSpriteItem1;

//# sourceMappingURL=list-item1.js.map
