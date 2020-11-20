"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpritePanel = void 0;
var SpritePanel = (function () {
    function SpritePanel() {
    }
    SpritePanel.prototype.onPointerdown = function (sprite, event) {
        console.log("[base] sprite onPointerdown: " + sprite.name);
    };
    return SpritePanel;
}());
exports.SpritePanel = SpritePanel;

//# sourceMappingURL=panel.js.map
