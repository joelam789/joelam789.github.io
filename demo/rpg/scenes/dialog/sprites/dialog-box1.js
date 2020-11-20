"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneDialogSpriteDialogBox1 = void 0;
var SceneDialogSpriteDialogBox1 = (function () {
    function SceneDialogSpriteDialogBox1() {
    }
    SceneDialogSpriteDialogBox1.prototype.show = function (spr, lines, speed, more) {
        if (speed === void 0) { speed = 50; }
        if (more === void 0) { more = false; }
        var tween = spr.scene.sys("tween");
        var chatbox = spr.scene.sprites["dialog-box1"];
        var chatmsg = spr.scene.sprites["dialog-msg1"];
        var chaticon = spr.scene.sprites["dialog-icon1"];
        if (chatbox && chatmsg && chaticon) {
            var showing = chatbox.active;
            var display = chatbox.get("display").object;
            if (!chatbox.custom) {
                chatbox.custom = {};
                if (display) {
                    chatbox.custom.posY = display.y;
                    chatbox.custom.maxH = display.height;
                    chatbox.custom.minH = 40;
                }
            }
            if (!chatmsg.custom)
                chatmsg.custom = {};
            chatbox.custom.status = "open";
            chatbox.custom.plot = spr.name;
            var history_1 = chatmsg.custom.history ? chatmsg.custom.history : "";
            chatmsg.custom.current = lines.join("\n");
            chatmsg.get("text").content = history_1 + chatmsg.custom.current;
            chatmsg.get("display").object.text = history_1;
            chatmsg.custom.content = history_1 + chatmsg.custom.current;
            var canShowAnima = !showing && tween && display && chatbox.custom.posY
                && chatbox.custom.maxH && chatbox.custom.minH;
            if (canShowAnima) {
                display.y = chatbox.custom.posY + (chatbox.custom.maxH - chatbox.custom.minH) / 2;
                display.height = chatbox.custom.minH;
            }
            chatbox.active = true;
            chatmsg.active = chatmsg.custom.history ? true : false;
            chaticon.active = false;
            if (canShowAnima) {
                tween.get(display)
                    .to({ y: chatbox.custom.posY, height: chatbox.custom.maxH }, 120)
                    .call(function () {
                    chatmsg.active = true;
                    chatmsg.code.updateText(chatmsg, speed, more);
                });
            }
            else {
                chatmsg.active = true;
                spr.scene.timeout(150, function () { return chatmsg.code.updateText(chatmsg, speed, more); });
            }
        }
    };
    SceneDialogSpriteDialogBox1.prototype.next = function (spr) {
        var chatbox = spr.scene.sprites["dialog-box1"];
        var chatstate = chatbox && chatbox.custom ? chatbox.custom.status : "";
        if (chatstate == "done" || chatstate == "more") {
            var plotctx = spr.scene.sprites[chatbox.custom.plot];
            if (plotctx)
                plotctx.plot.signal();
        }
    };
    SceneDialogSpriteDialogBox1.prototype.close = function (spr) {
        var tween = spr.scene.sys("tween");
        var chatbox = spr.scene.sprites["dialog-box1"];
        var chatmsg = spr.scene.sprites["dialog-msg1"];
        var chaticon = spr.scene.sprites["dialog-icon1"];
        if (chatbox && chatmsg && chaticon) {
            chatmsg.active = false;
            chaticon.active = false;
            var showing = chatbox.active;
            var display_1 = chatbox.get("display").object;
            var canShowAnima = showing && tween && display_1 && chatbox.custom.posY
                && chatbox.custom.maxH && chatbox.custom.minH;
            if (canShowAnima) {
                tween.get(display_1)
                    .to({ y: chatbox.custom.posY + (chatbox.custom.maxH - chatbox.custom.minH) / 2,
                    height: chatbox.custom.minH }, 120)
                    .call(function () {
                    chatbox.active = false;
                    display_1.y = chatbox.custom.posY;
                    display_1.height = chatbox.custom.maxH;
                    var rpg = spr.scene.sys("rpg");
                    if (rpg)
                        rpg.stopNpcWaiting(spr.scene);
                });
            }
            else {
                chatbox.active = false;
                var rpg = spr.scene.sys("rpg");
                if (rpg)
                    rpg.stopNpcWaiting(spr.scene);
            }
        }
        else {
            var rpg = spr.scene.sys("rpg");
            if (rpg)
                rpg.stopNpcWaiting(spr.scene);
        }
    };
    SceneDialogSpriteDialogBox1.prototype.onPointerup = function (spr, event) {
        this.next(spr);
    };
    return SceneDialogSpriteDialogBox1;
}());
exports.SceneDialogSpriteDialogBox1 = SceneDialogSpriteDialogBox1;

//# sourceMappingURL=dialog-box1.js.map
