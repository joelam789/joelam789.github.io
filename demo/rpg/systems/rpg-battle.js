"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpgBattle = void 0;
var RpgBattle = (function () {
    function RpgBattle() {
        this.name = "rpg-battle";
        this.entry = null;
        this.listbox = null;
        this.profile = null;
        this.keyboard = null;
        this.holdon = false;
    }
    RpgBattle.prototype.init = function (game) {
        this.profile = game.components.rpg;
        console.log("rpg-battle system is loaded successfully");
        return true;
    };
    RpgBattle.prototype.activate = function (scene) {
        var _this = this;
        this.listbox = null;
        this.holdon = false;
        this.keyboard = scene.systems["keyboard"];
        var rpg = scene.components["rpg"];
        if (rpg) {
            if (rpg.listbox)
                this.listbox = scene.sprites[rpg.listbox];
            if (rpg.entry)
                this.entry = scene.sprites[rpg.entry];
        }
        if (this.entry) {
            scene.timeout(500, function () { return _this.entry.active = true; });
        }
    };
    RpgBattle.prototype.update = function (scene, time) {
        this.handleKeyboard(scene);
    };
    RpgBattle.prototype.checkMovementControl = function () {
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
    RpgBattle.prototype.checkActionControl = function () {
        if (!this.keyboard)
            return null;
        if (this.keyboard.states[" "])
            return "check";
        return "";
    };
    RpgBattle.prototype.cleanup = function (scene) {
        var rpg = scene.components["rpg"];
        if (!rpg)
            return;
    };
    RpgBattle.prototype.isListing = function () {
        return this.listbox && this.listbox.active
            && this.listbox.code && this.listbox.code.isListing();
    };
    RpgBattle.prototype.selectItem = function () {
        if (this.listbox && this.listbox.active && this.listbox.code)
            this.listbox.code.selectItem();
    };
    RpgBattle.prototype.onSceneBattleClick = function (scene, event) {
        var pos = event.data.getLocalPosition(scene.components["display"].object);
        console.log("scene onPointerdown: " + scene.name + " - x=" + pos.x + " , y=" + pos.y);
    };
    RpgBattle.prototype.handleKeyboard = function (scene) {
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
        if (!profile)
            return;
        var dir = this.checkMovementControl();
        var act = this.checkActionControl();
        if ((dir || act) && !this.holdon) {
            if (this.isListing()) {
                if (dir && (dir == "up" || dir == "down")) {
                    this.listbox.code.moveCursor(dir);
                    this.holdon = true;
                    this.listbox.scene.timeout(200, function () { return _this.holdon = false; });
                }
                if (act && !this.holdon) {
                    this.selectItem();
                    this.holdon = true;
                    this.listbox.scene.timeout(200, function () { return _this.holdon = false; });
                }
            }
        }
    };
    return RpgBattle;
}());
exports.RpgBattle = RpgBattle;

//# sourceMappingURL=rpg-battle.js.map
