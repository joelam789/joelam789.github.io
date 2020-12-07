"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneDialogSpriteAnswerBox1 = void 0;
var SceneDialogSpriteAnswerBox1 = (function () {
    function SceneDialogSpriteAnswerBox1() {
        this.selected = 0;
        this.answering = false;
        this.textRelativeX = 50;
        this.textRelativeY = 20;
        this.iconRelativeX = 30;
        this.iconRelativeY = 28;
    }
    SceneDialogSpriteAnswerBox1.prototype.show = function (spr, lines, left, top, gap) {
        if (left === void 0) { left = 150; }
        if (top === void 0) { top = 40; }
        if (gap === void 0) { gap = 80; }
        var scene = spr.scene;
        var chatmsg = scene.sprites["dialog-msg1"];
        if (chatmsg && chatmsg.custom) {
            chatmsg.custom.more = false;
            chatmsg.custom.history = "";
        }
        var chatbox = spr.scene.sprites["dialog-box1"];
        if (chatbox && chatbox.custom)
            chatbox.custom.status = "wait";
        var idx = 0, posX = left, posY = top;
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            idx++;
            var item = scene.getFreeSprite("answer-box1");
            var text = scene.getFreeSprite("answer-msg1");
            var itemDisplay = item.get("display").object;
            var textDisplay = text.get("display").object;
            itemDisplay.x = posX;
            itemDisplay.y = posY;
            if (!item.custom)
                item.custom = {};
            item.custom.flag = idx;
            item.active = true;
            textDisplay.x = posX + this.textRelativeX;
            textDisplay.y = posY + this.textRelativeY;
            textDisplay.text = line;
            text.active = true;
            if (idx == 1) {
                var icon = scene.sprites["answer-icon1"];
                if (!icon.custom)
                    icon.custom = {};
                icon.custom.flag = idx;
                var iconDisplay = icon.get("display").object;
                iconDisplay.x = posX + this.iconRelativeX;
                iconDisplay.y = posY + this.iconRelativeY;
                icon.active = true;
            }
            posY += gap;
        }
        this.answering = true;
    };
    SceneDialogSpriteAnswerBox1.prototype.close = function () {
        var spr = this.owner;
        var pool = spr.scene.pools["answer-box1"];
        for (var _i = 0, pool_1 = pool; _i < pool_1.length; _i++) {
            var item = pool_1[_i];
            item.active = false;
            if (item.custom)
                item.custom.flag = 0;
        }
        var pool2 = spr.scene.pools["answer-msg1"];
        for (var _a = 0, pool2_1 = pool2; _a < pool2_1.length; _a++) {
            var item = pool2_1[_a];
            item.active = false;
        }
        var icon = spr.scene.sprites["answer-icon1"];
        icon.custom.flag = 0;
        icon.active = false;
        this.answering = false;
    };
    SceneDialogSpriteAnswerBox1.prototype.getChoice = function () {
        return this.selected;
    };
    SceneDialogSpriteAnswerBox1.prototype.isAnswering = function () {
        return this.answering;
    };
    SceneDialogSpriteAnswerBox1.prototype.moveCursor = function (dir) {
        if (dir === void 0) { dir = "down"; }
        var spr = this.owner;
        var icon = spr.scene.sprites["answer-icon1"];
        if (!icon || !icon.active)
            return;
        var delta = 0;
        if (dir == "down")
            delta++;
        else if (dir == "up")
            delta--;
        if (delta == 0)
            return;
        var idx = 0, gap = 0, firstY = 0, lastY = 0;
        var pool = spr.scene.pools["answer-box1"];
        for (var _i = 0, pool_2 = pool; _i < pool_2.length; _i++) {
            var item = pool_2[_i];
            if (item.active && item.custom && item.custom.flag > 0) {
                idx++;
                var itemDisplay = item.get("display").object;
                if (idx == 1)
                    firstY = itemDisplay.y + this.iconRelativeY;
                if (idx == 2)
                    gap = itemDisplay.y - lastY;
                lastY = itemDisplay.y;
            }
        }
        lastY += this.iconRelativeY;
        var iconDisplay = icon.get("display").object;
        if (delta < 0) {
            var newY = iconDisplay.y - gap;
            if (newY < firstY) {
                newY = lastY;
                iconDisplay.y = newY;
                icon.custom.flag = idx;
            }
            else {
                iconDisplay.y = newY;
                icon.custom.flag -= 1;
            }
        }
        else if (delta > 0) {
            var newY = iconDisplay.y + gap;
            if (newY > lastY) {
                newY = firstY;
                iconDisplay.y = newY;
                icon.custom.flag = 1;
            }
            else {
                iconDisplay.y = newY;
                icon.custom.flag += 1;
            }
        }
    };
    SceneDialogSpriteAnswerBox1.prototype.selectAnswer = function (spr) {
        var flag = spr && spr.custom ? spr.custom.flag : 0;
        this.selected = flag;
        this.close();
        var chatmsg = spr.scene.sprites["dialog-msg1"];
        if (chatmsg)
            chatmsg.code.onDisplayDone(false);
        var chatbox = spr.scene.sprites["dialog-box1"];
        if (chatbox)
            chatbox.code.next();
    };
    SceneDialogSpriteAnswerBox1.prototype.onPointerup = function (spr, event) {
        this.selectAnswer(spr);
    };
    return SceneDialogSpriteAnswerBox1;
}());
exports.SceneDialogSpriteAnswerBox1 = SceneDialogSpriteAnswerBox1;

//# sourceMappingURL=answer-box1.js.map
