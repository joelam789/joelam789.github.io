"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpritePlayer = void 0;
var SpritePlayer = (function () {
    function SpritePlayer() {
    }
    SpritePlayer.prototype.walkOnTile = function (spr, dir, speed) {
        var _this = this;
        if (speed === void 0) { speed = 2; }
        var rpg = spr.scene.sys("rpg");
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
        if (rpg && !rpg.isOccupiedTile(spr.scene, [spr.name], newTile.x, newTile.y)
            && gamemap.getTileCost(newTile.x, newTile.y) === 0) {
            state.moving = true;
            state.next = { x: posX, y: posY };
            rpg.occupyTile(spr, newTile.x, newTile.y);
            motion.moveTo(spr, posX, posY, speed, function () {
                state.moving = false;
                state.next = null;
                var oldTile = gamemap.pixelToTile(posX - dx, posY - dy);
                rpg.leaveTile(spr, oldTile.x, oldTile.y);
                var newInput = rpg.checkMovementControl();
                if (newInput) {
                    state.path = [];
                    state.target = null;
                }
                else
                    _this.walkOneStep(spr, speed);
            });
        }
        else
            this.walkOneStep(spr, speed);
    };
    SpritePlayer.prototype.walkOneStep = function (spr, speed) {
        if (speed === void 0) { speed = 2; }
        var rpg = spr.scene.sys("rpg");
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
                && !rpg.isOccupiedTile(spr.scene, [spr.name], step.x, step.y)) {
                var pos = gamemap.tileToPixel(step.x, step.y);
                var nextdir = rpg.getDirection({ x: posX, y: posY }, pos);
                this.walkOnTile(spr, nextdir, speed);
            }
            else {
                if (state.path.length > 0 && state.target) {
                    var last = gamemap.tileToPixel(state.target.x, state.target.y);
                    this.walkTo(spr, last.x, last.y, speed);
                }
                else
                    this.stopWalking(spr);
            }
        }
        else
            this.stopWalking(spr);
    };
    SpritePlayer.prototype.walkToTile = function (spr, x, y, speed) {
        var _a;
        if (speed === void 0) { speed = 2; }
        var state = spr.get("movement");
        var gamemap = spr.scene.get("stage").gamemap;
        var currentX = state.next && state.next.x >= 0 ? state.next.x : spr.get("stage").x;
        var currentY = state.next && state.next.y >= 0 ? state.next.y : spr.get("stage").y;
        var start = gamemap.pixelToTile(currentX, currentY);
        var end = { x: x, y: y };
        var path = gamemap.findPath(start.x, start.y, end.x, end.y, false, function (cx, cy, val) {
            return spr.scene.sys("rpg").isOccupiedTile(spr.scene, [spr.name], cx, cy) ? -1 : val;
        });
        if (path && path.length > 0) {
            state.path = [];
            (_a = state.path).push.apply(_a, path);
            state.target = { x: end.x, y: end.y };
            if (!state.moving)
                this.walkOneStep(spr, speed);
        }
        else {
            state.path = [];
            state.target = { x: end.x, y: end.y };
            this.stopWalking(spr);
        }
    };
    SpritePlayer.prototype.walkTo = function (spr, x, y, speed) {
        if (speed === void 0) { speed = 2; }
        var rpg = spr.scene.sys("rpg");
        if (rpg && rpg.isTalking())
            return;
        var state = spr.get("movement");
        var gamemap = spr.scene.get("stage").gamemap;
        var profile = spr.scene.game.get("rpg");
        if (profile && profile.controllable === false)
            return;
        var tile = gamemap.pixelToTile(x, y);
        this.walkToTile(spr, tile.x, tile.y, speed);
    };
    SpritePlayer.prototype.stopWalking = function (spr, dir) {
        if (dir === void 0) { dir = ""; }
        var rpg = spr.scene.sys("rpg");
        var state = spr.get("movement");
        var anima = spr.get("display").animation;
        var gamemap = spr.scene.get("stage").gamemap;
        var posX = spr.get("stage").x;
        var posY = spr.get("stage").y;
        var plot = null;
        if (state) {
            state.path = [];
            state.moving = false;
            var newdir = "";
            var tile = null;
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
            if (state.target) {
                tile = rpg.getNextTile(spr);
                if (tile && tile.x == state.target.x && tile.y == state.target.y)
                    plot = rpg.getPlotOnTile(spr.scene, tile.x, tile.y);
                state.target = null;
            }
            if (plot) {
                var npc = rpg.getPlotNpc(plot);
                var npcWalking = npc && rpg.isNpcWalking(npc);
                if (npc && tile && !rpg.isNpcWalking(npc)) {
                    rpg.startNpcWaiting(npc);
                    var npcAnima = npc.get("display").animation;
                    var npcTile = rpg.getCurrentTile(npc);
                    var playerTile = rpg.getCurrentTile(spr);
                    var npcDir = npcTile ? rpg.getDirection(npcTile, playerTile) : null;
                    if (npcDir && npcAnima)
                        npcAnima.set(npcDir);
                }
                if (!npc || (npc && !npcWalking))
                    plot.active = true;
            }
        }
    };
    SpritePlayer.prototype.onUpdate = function (sprite) {
    };
    SpritePlayer.prototype.onSceneActivate = function (sprite) {
        var rpg = sprite.scene.sys("rpg");
        if (rpg) {
            rpg.alignToTile(sprite);
            rpg.occupyCurrentTile(sprite);
        }
        var state = sprite.get("movement");
        if (state) {
            state.moving = false;
            state.next = null;
        }
    };
    return SpritePlayer;
}());
exports.SpritePlayer = SpritePlayer;

//# sourceMappingURL=player.js.map
