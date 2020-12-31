"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteNpc = void 0;
var SpriteNpc = (function () {
    function SpriteNpc() {
    }
    SpriteNpc.prototype.walkOnTile = function (spr, dir, speed, callback) {
        var _this = this;
        if (speed === void 0) { speed = 2; }
        if (callback === void 0) { callback = null; }
        var rpg = spr.scene.sys("rpg-map");
        var state = spr.get("movement");
        var anima = spr.get("display").animation;
        var motion = spr.scene.systems["motion"];
        var gamemap = spr.scene.get("stage").gamemap;
        if (!state || !anima || !motion || !gamemap)
            return;
        if (state.moving === true)
            return;
        var dx = 0, dy = 0;
        switch (dir) {
            case "up":
                anima.set("run_up");
                dy = -32;
                break;
            case "down":
                anima.set("run_down");
                dy = 32;
                break;
            case "left":
                anima.set("run_left");
                dx = -32;
                break;
            case "right":
                anima.set("run_right");
                dx = 32;
                break;
            default: return;
        }
        var posX = spr.get("stage").x + dx;
        var posY = spr.get("stage").y + dy;
        var newTile = gamemap.pixelToTile(posX, posY);
        if (rpg && !rpg.isOccupiedTile(spr.scene, null, newTile.x, newTile.y)
            && gamemap.getTileCost(newTile.x, newTile.y) === 0) {
            state.moving = true;
            state.next = { x: posX, y: posY };
            rpg.occupyTile(spr, newTile.x, newTile.y);
            motion.moveTo(spr, posX, posY, speed, function () {
                state.moving = false;
                state.next = null;
                var oldTile = gamemap.pixelToTile(posX - dx, posY - dy);
                rpg.leaveTile(spr, oldTile.x, oldTile.y);
                _this.walkOneStep(spr, speed, callback);
            });
        }
        else
            this.walkOneStep(spr, speed, callback);
    };
    SpriteNpc.prototype.walkOneStep = function (spr, speed, callback) {
        if (speed === void 0) { speed = 2; }
        if (callback === void 0) { callback = null; }
        var rpg = spr.scene.sys("rpg-map");
        var state = spr.get("movement");
        var anima = spr.get("display").animation;
        var gamemap = spr.scene.get("stage").gamemap;
        if (!state || !anima || !gamemap)
            return;
        if (state.moving === true)
            return;
        var posX = spr.get("stage").x;
        var posY = spr.get("stage").y;
        if (state.path.length > 0) {
            var step = state.path.shift();
            if (gamemap.getTileCost(step.x, step.y) === 0
                && !rpg.isOccupiedTile(spr.scene, null, step.x, step.y)) {
                var pos = gamemap.tileToPixel(step.x, step.y);
                var nextdir = rpg.getDirection({ x: posX, y: posY }, pos);
                this.walkOnTile(spr, nextdir, speed, callback);
            }
            else {
                this.stopWalking(spr, "", callback);
            }
        }
        else
            this.stopWalking(spr, "", callback);
    };
    SpriteNpc.prototype.walkToTile = function (spr, x, y, speed, callback) {
        var _a;
        if (speed === void 0) { speed = 2; }
        if (callback === void 0) { callback = null; }
        var state = spr.get("movement");
        var gamemap = spr.scene.get("stage").gamemap;
        var currentX = state.next && state.next.x >= 0 ? state.next.x : spr.get("stage").x;
        var currentY = state.next && state.next.y >= 0 ? state.next.y : spr.get("stage").y;
        var start = gamemap.pixelToTile(currentX, currentY);
        var end = { x: x, y: y };
        var path = gamemap.findPath(start.x, start.y, end.x, end.y, false, function (cx, cy, val) {
            return spr.scene.sys("rpg-map").isOccupiedTile(spr.scene, null, cx, cy) ? -1 : val;
        });
        if (path && path.length > 0) {
            state.path = [];
            (_a = state.path).push.apply(_a, path);
            state.target = { x: end.x, y: end.y };
            if (!state.moving)
                this.walkOneStep(spr, speed, callback);
        }
        else {
            var dir = spr.scene.sys("rpg-map").getDirection(start, end);
            if (dir)
                spr.get("display").animation.set(dir);
            if (callback)
                callback();
        }
    };
    SpriteNpc.prototype.stopWalking = function (spr, dir, callback) {
        if (dir === void 0) { dir = ""; }
        if (callback === void 0) { callback = null; }
        var rpg = spr.scene.sys("rpg-map");
        var state = spr.get("movement");
        var anima = spr.get("display").animation;
        var gamemap = spr.scene.get("stage").gamemap;
        var posX = spr.get("stage").x;
        var posY = spr.get("stage").y;
        if (state) {
            state.path = [];
            state.moving = false;
            var newdir = "";
            if (state.target) {
                var pos = gamemap.pixelToTile(posX, posY);
                newdir = rpg.getDirection(pos, state.target);
            }
            if (anima) {
                if (dir)
                    anima.set(dir);
                else if (newdir)
                    anima.set(newdir);
                else {
                    var parts = anima.current.split("_");
                    if (parts && parts.length >= 2)
                        anima.set(parts[1]);
                }
            }
            if (state.target)
                state.target = null;
            if (callback)
                callback();
        }
    };
    SpriteNpc.prototype.walkOnMap = function (spr) {
        var _this = this;
        var rpg = spr.scene.sys("rpg-map");
        var state = spr.get("movement");
        var gamemap = spr.scene.get("stage").gamemap;
        if (rpg && state && gamemap && !state.waiting && state.auto === true) {
            spr.scene.timeout(1000 * (Math.floor(Math.random() * 3) + 1), function () {
                if (state.waiting === true) {
                    _this.walkOnMap(spr);
                    return;
                }
                var currentX = spr.get("stage").x;
                var currentY = spr.get("stage").y;
                var start = gamemap.pixelToTile(currentX, currentY);
                var steps = Math.floor(Math.random() * 2) + 1;
                var range = gamemap.findRange(start.x, start.y, steps, false, function (cx, cy, val) {
                    if (cx < state.start.x - 2 || cx > state.start.x + 2)
                        return -1;
                    if (cy < state.start.y - 2 || cy > state.start.y + 2)
                        return -1;
                    if (spr.scene.sys("rpg-map").isOccupiedTile(spr.scene, null, cx, cy))
                        return -1;
                    return val >= 0 ? 1 : -1;
                });
                if (range && range.length > 0) {
                    var idx = Math.floor(Math.random() * range.length);
                    _this.walkToTile(spr, range[idx].x, range[idx].y, 2, function () { return _this.walkOnMap(spr); });
                }
                else {
                    _this.walkOnMap(spr);
                }
            });
        }
        else {
            spr.scene.timeout(1000 * (Math.floor(Math.random() * 3) + 1), function () { return _this.walkOnMap(spr); });
        }
    };
    SpriteNpc.prototype.wait = function (spr, waiting) {
        if (waiting === void 0) { waiting = true; }
        var state = spr.get("movement");
        if (state)
            state.waiting = waiting;
    };
    SpriteNpc.prototype.onUpdate = function (sprite) {
    };
    SpriteNpc.prototype.onSceneActivate = function (sprite) {
        var mapState = sprite.scene.get("rpg");
        if (mapState && mapState.times == 1) {
            var rpg = sprite.scene.sys("rpg-map");
            var gamemap = sprite.scene.get("stage").gamemap;
            var tile = sprite.get("tile");
            if (tile && gamemap) {
                var pos = gamemap.tileToPixel(tile.x, tile.y);
                sprite.get("stage").x = pos.x;
                sprite.get("stage").y = pos.y;
            }
            if (rpg) {
                rpg.alignToTile(sprite);
                rpg.occupyCurrentTile(sprite);
            }
            var state = sprite.get("movement");
            if (state)
                state.waiting = false;
            if (gamemap && state && state.auto === true) {
                var currentX = sprite.get("stage").x;
                var currentY = sprite.get("stage").y;
                var start = gamemap.pixelToTile(currentX, currentY);
                state.start = {
                    x: start.x,
                    y: start.y
                };
                this.walkOnMap(sprite);
            }
        }
        else {
            var rpg = sprite.scene.sys("rpg-map");
            if (rpg)
                rpg.occupyCurrentTile(sprite);
            var state = sprite.get("movement");
            if (state)
                state.waiting = false;
            if (state && state.auto === true) {
                this.walkOnMap(sprite);
            }
        }
    };
    return SpriteNpc;
}());
exports.SpriteNpc = SpriteNpc;

//# sourceMappingURL=npc.js.map
