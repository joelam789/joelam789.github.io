"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneInfoSpriteFps1 = void 0;
var SceneInfoSpriteFps1 = (function () {
    function SceneInfoSpriteFps1() {
    }
    SceneInfoSpriteFps1.prototype.onSceneActivate = function (sprite) {
        var bgcolor = sprite.scene.get("display").bgcolor;
        console.log(bgcolor);
        if (bgcolor == "#ffffff")
            sprite.get("display").object.style.fill = "#000000";
        else
            sprite.get("display").object.style.fill = "#ffffff";
    };
    return SceneInfoSpriteFps1;
}());
exports.SceneInfoSpriteFps1 = SceneInfoSpriteFps1;

//# sourceMappingURL=fps1.js.map
