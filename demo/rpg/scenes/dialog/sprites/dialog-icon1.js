"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneDialogSpriteDialogIcon1 = void 0;
var SceneDialogSpriteDialogIcon1 = (function () {
    function SceneDialogSpriteDialogIcon1() {
    }
    SceneDialogSpriteDialogIcon1.prototype.onActivate = function (spr) {
        var chatbox = spr.scene.sprites["dialog-box1"];
        if (chatbox && chatbox.active) {
            spr.scene.timeout(500, function () {
                spr.active = false;
                spr.scene.timeout(300, function () {
                    spr.active = chatbox.active && chatbox.custom.status == "done";
                });
            });
        }
    };
    return SceneDialogSpriteDialogIcon1;
}());
exports.SceneDialogSpriteDialogIcon1 = SceneDialogSpriteDialogIcon1;

//# sourceMappingURL=dialog-icon1.js.map
