"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneDialogSpriteDialogMsg1 = void 0;
var SceneDialogSpriteDialogMsg1 = (function () {
    function SceneDialogSpriteDialogMsg1() {
    }
    SceneDialogSpriteDialogMsg1.prototype.updateText = function (speed, more) {
        var _this = this;
        if (speed === void 0) { speed = 50; }
        if (more === void 0) { more = false; }
        var textSpeed = speed;
        if (!textSpeed || textSpeed < 1)
            textSpeed = 1;
        if (textSpeed > 100)
            textSpeed = 100;
        var spr = this.owner;
        if (spr.custom && spr.custom.content) {
            var displayText = spr.get("display").object.text;
            var len = displayText.length;
            if (spr.custom.content.length > len) {
                spr.get("display").object.text = spr.custom.content.substr(0, len + 1);
                spr.scene.timeout(10 * (100 / textSpeed), function () { return _this.updateText(textSpeed, more); });
            }
            else if (spr.custom.content.length == len) {
                spr.custom.more = more;
                spr.custom.history = more ? spr.custom.history + spr.custom.current : "";
                spr.custom.content = "";
                this.onDisplayDone();
            }
        }
    };
    SceneDialogSpriteDialogMsg1.prototype.onDisplayDone = function (showIcon) {
        if (showIcon === void 0) { showIcon = true; }
        var spr = this.owner;
        var chatbox = spr.scene.sprites["dialog-box1"];
        var chaticon = spr.scene.sprites["dialog-icon1"];
        if (chatbox && chaticon) {
            if (spr.custom && spr.custom.more) {
                chatbox.custom.status = "more";
                chatbox.code.next();
            }
            else {
                if (showIcon)
                    chaticon.active = true;
                chatbox.custom.status = "done";
            }
        }
    };
    return SceneDialogSpriteDialogMsg1;
}());
exports.SceneDialogSpriteDialogMsg1 = SceneDialogSpriteDialogMsg1;

//# sourceMappingURL=dialog-msg1.js.map
