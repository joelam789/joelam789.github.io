"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rpg = void 0;
var Rpg = (function () {
    function Rpg() {
        this.name = "rpg";
        this.stage = null;
        this.player = null;
        this.dialog = null;
        this.profile = null;
        this.keyboard = null;
        this.holdon = false;
    }
    Rpg.prototype.init = function (game) {
        this.profile = game.components.rpg;
        console.log("rpg system is loaded successfully");
        return true;
    };
    Rpg.prototype.activate = function (scene) {
        this.player = null;
        this.dialog = null;
        this.holdon = false;
        this.stage = scene.systems["stage"];
        this.keyboard = scene.systems["keyboard"];
        var rpg = scene.components["rpg"];
        if (rpg) {
            this.cleanupMap(scene);
            if (rpg.player)
                this.player = scene.sprites[rpg.player];
            if (this.stage && this.player) {
                var profile = scene.game.get("rpg");
                if (profile)
                    profile.controllable = true;
                this.stage.follow(scene, this.player.name);
            }
            if (rpg.dialog)
                this.dialog = scene.sprites[rpg.dialog];
        }
    };
    Rpg.prototype.update = function (scene, time) {
        this.handleKeyboard(scene);
    };
    Rpg.prototype.checkMovementControl = function () {
        if (!this.keyboard)
            return null;
        if (this.keyboard.states["ArrowUp"])
            return "up";
        else if (this.keyboard.states["ArrowDown"])
            return "down";
        else if (this.keyboard.states["ArrowLeft"])
            return "left";
        else if (this.keyboard.states["ArrowRight"])
            return "right";
        return "";
    };
    Rpg.prototype.checkActionControl = function () {
        if (!this.keyboard)
            return null;
        if (this.keyboard.states[" "])
            return "check";
        return "";
    };
    Rpg.prototype.cleanupMap = function (scene) {
        var rpg = scene.components["rpg"];
        if (!rpg)
            return;
        if (rpg.tempMarks) {
            rpg.tempMarks.forEach(function (value, key, map) { return value.length = 0; });
        }
        else {
            rpg.tempMarks = new Map();
        }
    };
    Rpg.prototype.occupyTile = function (spr, tileX, tileY) {
        var rpg = spr.scene.components["rpg"];
        var gamemap = spr.scene.get("stage").gamemap;
        if (gamemap && rpg && rpg.tempMarks) {
            var key = tileX + "_" + tileY;
            if (rpg.tempMarks.has(key)) {
                var list = rpg.tempMarks.get(key);
                if (list.indexOf(spr.name) < 0)
                    list.push(spr.name);
            }
            else {
                var list = [spr.name];
                rpg.tempMarks.set(key, list);
            }
        }
    };
    Rpg.prototype.leaveTile = function (spr, tileX, tileY) {
        var rpg = spr.scene.components["rpg"];
        var gamemap = spr.scene.get("stage").gamemap;
        if (gamemap && rpg && rpg.tempMarks) {
            var key = tileX + "_" + tileY;
            if (rpg.tempMarks.has(key)) {
                var list = rpg.tempMarks.get(key);
                var idx = list ? list.indexOf(spr.name) : -1;
                if (idx >= 0)
                    list.splice(idx, 1);
            }
        }
    };
    Rpg.prototype.occupyCurrentTile = function (spr) {
        var rpg = spr.scene.components["rpg"];
        var gamemap = spr.scene.get("stage").gamemap;
        if (gamemap && rpg && rpg.tempMarks) {
            var pos = spr.get("stage");
            var tile = gamemap.pixelToTile(pos.x, pos.y);
            this.occupyTile(spr, tile.x, tile.y);
        }
    };
    Rpg.prototype.isOccupiedTile = function (scene, exceptNames, tileX, tileY) {
        var rpg = scene.components["rpg"];
        var gamemap = scene.get("stage").gamemap;
        if (gamemap && rpg && rpg.tempMarks) {
            var key = tileX + "_" + tileY;
            if (rpg.tempMarks.has(key)) {
                var list = rpg.tempMarks.get(key);
                if (!list || list.length == 0)
                    return false;
                if (!exceptNames || exceptNames.length == 0)
                    return true;
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var item = list_1[_i];
                    if (exceptNames.indexOf(item) < 0)
                        return true;
                }
                return false;
            }
        }
        return false;
    };
    Rpg.prototype.alignToTile = function (spr) {
        var gamemap = spr.scene.get("stage").gamemap;
        if (gamemap) {
            var posX = spr.get("stage").x;
            var posY = spr.get("stage").y;
            var pos = gamemap.align(posX, posY);
            if (pos) {
                spr.get("stage").x = pos.x;
                spr.get("stage").y = pos.y;
            }
        }
    };
    Rpg.prototype.getDirection = function (pos, next) {
        if (pos.x == next.x) {
            if (pos.y > next.y)
                return "up";
            else if (pos.y < next.y)
                return "down";
        }
        else if (pos.y == next.y) {
            if (pos.x > next.x)
                return "left";
            else if (pos.x < next.x)
                return "right";
        }
        return null;
    };
    Rpg.prototype.getCurrentTile = function (spr) {
        var gamemap = spr.scene.get("stage").gamemap;
        if (gamemap) {
            var posX = spr.get("stage").x;
            var posY = spr.get("stage").y;
            return gamemap.pixelToTile(posX, posY);
        }
        return null;
    };
    Rpg.prototype.getNextTile = function (spr) {
        var anima = spr.get("display").animation;
        var gamemap = spr.scene.get("stage").gamemap;
        if (anima && gamemap) {
            var dx = 0, dy = 0;
            var dir = anima.current;
            if (dir.indexOf("_") >= 0) {
                var parts = anima.current.split("_");
                if (parts && parts.length >= 2)
                    dir = parts[1];
            }
            switch (dir) {
                case "up":
                    dy = -32;
                    break;
                case "down":
                    dy = 32;
                    break;
                case "left":
                    dx = -32;
                    break;
                case "right":
                    dx = 32;
                    break;
                default: return null;
            }
            var posX = spr.get("stage").x + dx;
            var posY = spr.get("stage").y + dy;
            return gamemap.pixelToTile(posX, posY);
        }
        return null;
    };
    Rpg.prototype.getPlotOnTile = function (scene, x, y) {
        for (var item in scene.sprites) {
            var spr = scene.sprites[item];
            if (spr && spr.template == "plot") {
                var rpg = spr.get("rpg");
                if (rpg) {
                    var tile = null;
                    if (rpg.tile)
                        tile = rpg.tile;
                    else if (rpg.npc) {
                        var npc = scene.sprites[rpg.npc];
                        var gamemap = scene.get("stage").gamemap;
                        if (npc && gamemap) {
                            var posX = npc.get("stage").x;
                            var posY = npc.get("stage").y;
                            tile = gamemap.pixelToTile(posX, posY);
                        }
                    }
                    if (tile && tile.x == x && tile.y == y)
                        return spr;
                }
            }
        }
        return null;
    };
    Rpg.prototype.getPlotNpc = function (plot) {
        var rpg = plot.get("rpg");
        if (rpg && rpg.npc) {
            var npc = plot.scene.sprites[rpg.npc];
            if (npc)
                return npc;
        }
        return null;
    };
    Rpg.prototype.startNpcWaiting = function (npc) {
        var state = npc.get("movement");
        if (state)
            state.waiting = true;
    };
    Rpg.prototype.stopNpcWaiting = function (scene) {
        var gamemap = scene.get("stage").gamemap;
        if (!gamemap)
            return null;
        for (var item in scene.sprites) {
            var spr = scene.sprites[item];
            if (spr && spr.template == "npc") {
                var state = spr.get("movement");
                if (state)
                    state.waiting = false;
            }
        }
        return null;
    };
    Rpg.prototype.isNpcWalking = function (npc) {
        var state = npc.get("movement");
        return state && (state.moving || state.walking);
    };
    Rpg.prototype.isTalking = function () {
        return this.dialog && this.dialog.active;
    };
    Rpg.prototype.isAnswering = function () {
        return this.dialog && this.dialog.active
            && this.dialog.code && this.dialog.code.isAnswering();
    };
    Rpg.prototype.selectAnswer = function () {
        if (this.dialog && this.dialog.active && this.dialog.code)
            this.dialog.code.selectAnswer();
    };
    Rpg.prototype.onSceneMapClick = function (scene, event) {
        var pos = event.data.getLocalPosition(scene.components["display"].object);
        var target = scene.systems["stage"].transform(pos);
        var rpg = scene.components["rpg"];
        var player = scene.sprites[rpg.player];
        if (player)
            player.code.walkTo(player, target.x, target.y);
    };
    Rpg.prototype.handleKeyboard = function (scene) {
        var _this = this;
        if (scene.paused)
            return;
        if (this.keyboard == undefined || this.keyboard == null)
            return;
        if (this.profile == undefined || this.profile == null)
            return;
        if (this.profile.controllable !== true)
            return;
        var jbuttons = window.vbuttons;
        if (jbuttons) {
            var isUp = jbuttons.up;
            var isDown = jbuttons.down;
            var isLeft = jbuttons.left;
            var isRight = jbuttons.right;
            if (isUp || isDown || isLeft || isRight) {
                this.keyboard.states["ArrowUp"] = isUp;
                this.keyboard.states["ArrowDown"] = isDown;
                this.keyboard.states["ArrowLeft"] = isLeft;
                this.keyboard.states["ArrowRight"] = isRight;
            }
            else {
                this.keyboard.states["ArrowUp"] = false;
                this.keyboard.states["ArrowDown"] = false;
                this.keyboard.states["ArrowLeft"] = false;
                this.keyboard.states["ArrowRight"] = false;
            }
            this.keyboard.states[" "] = jbuttons.b1 === true;
            this.keyboard.states["Escape"] = jbuttons.b2 === true;
        }
        var profile = scene.game.get("rpg");
        var playerAction = this.player && this.player.active ? this.player.code : null;
        if (playerAction) {
            var speed = profile ? profile.movespeed : 1;
            var dir = this.checkMovementControl();
            var act = this.checkActionControl();
            var walking = false;
            var talking = this.isTalking();
            if (dir && !talking) {
                var state = this.player.get("movement");
                if (state) {
                    state.path = [];
                    state.target = null;
                }
                playerAction.walkOnTile(this.player, dir, speed);
                walking = true;
            }
            if (talking && !this.holdon) {
                if (this.isAnswering()) {
                    if (dir && (dir == "up" || dir == "down")) {
                        this.dialog.code.moveCursor(dir);
                        this.holdon = true;
                        this.player.scene.timeout(200, function () { return _this.holdon = false; });
                    }
                    if (act && !this.holdon) {
                        this.selectAnswer();
                        this.holdon = true;
                        this.player.scene.timeout(200, function () { return _this.holdon = false; });
                    }
                }
            }
            if (act && !this.holdon) {
                if (talking) {
                    this.dialog.code.next();
                    this.holdon = true;
                    this.player.scene.timeout(500, function () { return _this.holdon = false; });
                }
                else if (!walking) {
                    var tile = this.getNextTile(this.player);
                    var plot = tile ? this.getPlotOnTile(this.player.scene, tile.x, tile.y) : null;
                    if (plot) {
                        var npc = this.getPlotNpc(plot);
                        var npcWalking = npc && this.isNpcWalking(npc);
                        if (npc && !npcWalking) {
                            this.startNpcWaiting(npc);
                            var anima = npc.get("display").animation;
                            var npcTile = this.getCurrentTile(npc);
                            var playerTile = this.getCurrentTile(this.player);
                            var npcDir = this.getDirection(npcTile, playerTile);
                            if (npcDir && anima)
                                anima.set(npcDir);
                        }
                        if (!npc || (npc && !npcWalking))
                            plot.active = true;
                    }
                }
            }
        }
    };
    return Rpg;
}());
exports.Rpg = Rpg;

//# sourceMappingURL=rpg.js.map
