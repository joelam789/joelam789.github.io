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
                    chatbox.custom.minH = 60;
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
                    chatmsg.code.updateText(speed, more);
                });
            }
            else {
                chatmsg.active = true;
                spr.scene.timeout(150, function () { return chatmsg.code.updateText(speed, more); });
            }
        }
    };
    SceneDialogSpriteDialogBox1.prototype.next = function () {
        var spr = this.owner;
        var chatbox = spr.scene.sprites["dialog-box1"];
        var chatstate = chatbox && chatbox.custom ? chatbox.custom.status : "";
        if (chatstate == "done" || chatstate == "more") {
            var plotctx = spr.scene.sprites[chatbox.custom.plot];
            if (plotctx)
                plotctx.plot.signal();
        }
        else if (chatstate == "open") {
            var chatmsg = spr.scene.sprites["dialog-msg1"];
            if (chatmsg && chatmsg.custom && chatmsg.custom.content) {
                chatmsg.get("display").object.text = chatmsg.custom.content;
            }
        }
    };
    SceneDialogSpriteDialogBox1.prototype.close = function (needAnima) {
        if (needAnima === void 0) { needAnima = true; }
        var spr = this.owner;
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
            if (canShowAnima && needAnima) {
                tween.get(display_1)
                    .to({ y: chatbox.custom.posY + (chatbox.custom.maxH - chatbox.custom.minH) / 2,
                    height: chatbox.custom.minH }, 120)
                    .call(function () {
                    chatbox.active = false;
                    display_1.y = chatbox.custom.posY;
                    display_1.height = chatbox.custom.maxH;
                    var rpg = spr.scene.sys("rpg-map");
                    if (rpg)
                        rpg.stopNpcWaiting(spr.scene);
                });
            }
            else {
                chatbox.active = false;
                var rpg = spr.scene.sys("rpg-map");
                if (rpg)
                    rpg.stopNpcWaiting(spr.scene);
            }
        }
        else {
            var rpg = spr.scene.sys("rpg-map");
            if (rpg)
                rpg.stopNpcWaiting(spr.scene);
        }
    };
    SceneDialogSpriteDialogBox1.prototype.isAnswering = function () {
        var spr = this.owner;
        var answer1 = spr.scene.spr("answer-box1").code;
        return answer1 && answer1.isAnswering();
    };
    SceneDialogSpriteDialogBox1.prototype.getChoice = function () {
        var spr = this.owner;
        var answer1 = spr.scene.spr("answer-box1").code;
        return answer1 ? answer1.getChoice() : 0;
    };
    SceneDialogSpriteDialogBox1.prototype.moveCursor = function (dir) {
        var spr = this.owner;
        var answer1 = spr.scene.spr("answer-box1").code;
        if (answer1)
            answer1.moveCursor(dir);
    };
    SceneDialogSpriteDialogBox1.prototype.selectAnswer = function () {
        var spr = this.owner;
        var icon = spr.scene.spr("answer-icon1");
        var answer1 = spr.scene.spr("answer-box1").code;
        if (answer1 && icon)
            answer1.selectAnswer(icon);
    };
    SceneDialogSpriteDialogBox1.prototype.list = function (spr, options, left, top, gap) {
        if (left === void 0) { left = 150; }
        if (top === void 0) { top = 40; }
        if (gap === void 0) { gap = 80; }
        var answer1 = spr.scene.spr("answer-box1").code;
        if (answer1)
            answer1.show(spr, options, left, top, gap);
    };
    SceneDialogSpriteDialogBox1.prototype.onPointerup = function (spr, event) {
        this.next();
    };
    return SceneDialogSpriteDialogBox1;
}());
exports.SceneDialogSpriteDialogBox1 = SceneDialogSpriteDialogBox1;

//# sourceMappingURL=dialog-box1.js.map
