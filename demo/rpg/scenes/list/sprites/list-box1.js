"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneListSpriteListBox1 = void 0;
var SceneListSpriteListBox1 = (function () {
    function SceneListSpriteListBox1() {
        this.plotName = "";
        this.selected = 0;
        this.listing = false;
        this.textRelativeX = 50;
        this.textRelativeY = 10;
        this.iconRelativeX = 30;
        this.iconRelativeY = 18;
    }
    SceneListSpriteListBox1.prototype.show = function (spr, items, left, top, width, gap) {
        if (left === void 0) { left = 260; }
        if (top === void 0) { top = 40; }
        if (width === void 0) { width = 180; }
        if (gap === void 0) { gap = 30; }
        var scene = spr.scene;
        var idx = 0, posX = left, posY = top;
        var box = spr.scene.sprites["list-box1"];
        if (box) {
            var boxDisplay = box.get("display").object;
            boxDisplay.x = posX;
            boxDisplay.y = posY;
            boxDisplay.width = width;
            if (items && items.length > 0) {
                boxDisplay.height = gap * (items.length + 2) - (gap / 2);
            }
            box.active = true;
        }
        posY += gap / 2;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var line = items_1[_i];
            idx++;
            var item = scene.getFreeSprite("list-item1");
            var text = scene.getFreeSprite("list-label1");
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
                var icon = scene.sprites["list-cursor1"];
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
        this.plotName = spr.name;
        this.listing = true;
    };
    SceneListSpriteListBox1.prototype.cleanup = function () {
        var spr = this.owner;
        var pool = spr.scene.pools["list-item1"];
        for (var _i = 0, pool_1 = pool; _i < pool_1.length; _i++) {
            var item = pool_1[_i];
            item.active = false;
            if (item.custom)
                item.custom.flag = 0;
        }
        var pool2 = spr.scene.pools["list-label1"];
        for (var _a = 0, pool2_1 = pool2; _a < pool2_1.length; _a++) {
            var item = pool2_1[_a];
            item.active = false;
        }
        var icon = spr.scene.sprites["list-cursor1"];
        if (icon.custom)
            icon.custom.flag = 0;
        icon.active = false;
        if (this.plotName)
            this.plotName = "";
    };
    SceneListSpriteListBox1.prototype.close = function () {
        this.cleanup();
        var spr = this.owner;
        var box = spr.scene.sprites["list-box1"];
        box.active = false;
        this.listing = false;
    };
    SceneListSpriteListBox1.prototype.getChoice = function () {
        return this.selected;
    };
    SceneListSpriteListBox1.prototype.isListing = function () {
        return this.listing;
    };
    SceneListSpriteListBox1.prototype.moveCursorTo = function (spr) {
        if (!spr || !spr.active)
            return;
        var icon = spr.scene.sprites["list-cursor1"];
        if (!icon || !icon.active)
            return;
        var iconDisplay = icon.get("display").object;
        var item = spr;
        var itemDisplay = item.get("display").object;
        iconDisplay.x = itemDisplay.x + this.iconRelativeX;
        iconDisplay.y = itemDisplay.y + this.iconRelativeY;
        icon.custom.flag = item.custom.flag;
    };
    SceneListSpriteListBox1.prototype.moveCursor = function (dir) {
        if (dir === void 0) { dir = "down"; }
        var spr = this.owner;
        var icon = spr.scene.sprites["list-cursor1"];
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
        var pool = spr.scene.pools["list-item1"];
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
    SceneListSpriteListBox1.prototype.selectItem = function (spr) {
        if (spr === void 0) { spr = null; }
        var target = spr;
        if (!target) {
            target = this.owner.scene.sprites["list-cursor1"];
        }
        var flag = target && target.custom ? target.custom.flag : 0;
        this.selected = flag;
        if (target && this.plotName) {
            target.scene.sprites[this.plotName].plot.signal();
        }
        console.log("ListBox1 - onPointerup", target.name, this.selected);
    };
    SceneListSpriteListBox1.prototype.onPointerup = function (spr, event) {
    };
    return SceneListSpriteListBox1;
}());
exports.SceneListSpriteListBox1 = SceneListSpriteListBox1;

//# sourceMappingURL=list-box1.js.map
