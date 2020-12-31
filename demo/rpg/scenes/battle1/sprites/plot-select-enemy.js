"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotSelectEnemy = void 0;
var PlotSelectEnemy = (function () {
    function PlotSelectEnemy() {
    }
    PlotSelectEnemy.prototype.onUpdate = function (sprite) {
        var scene, tween, motion, profile, sceneInfo, menu1, menuItems;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scene = sprite.scene;
                    tween = scene.sys("tween");
                    motion = scene.sys("motion");
                    profile = scene.game.get("rpg");
                    sceneInfo = scene.get("rpg");
                    console.log("plot started - " + sprite.name);
                    menu1 = scene.spr("list-box1").code;
                    menuItems = [];
                    menuItems.push.apply(menuItems, sceneInfo.enemyTeam);
                    menuItems.push("Go Back");
                    menu1.show(sprite, menuItems);
                    console.log("Please select an enemy");
                    _a.label = 1;
                case 1:
                    if (!true) return [3, 3];
                    return [4, sprite.plot.wait()];
                case 2:
                    _a.sent();
                    console.log("Selected - " + menu1.selected);
                    if (menu1.selected == 1) {
                        menu1.close();
                        sceneInfo.fighter = "fighter1";
                        sceneInfo.target = "enemy1";
                        scene.spr("plot-fight").active = true;
                        return [3, 3];
                    }
                    else if (menu1.selected == menuItems.length) {
                        menu1.cleanup();
                        scene.spr(sceneInfo.previous).active = true;
                        return [3, 3];
                    }
                    else {
                        console.log("Please select a correct enemy");
                    }
                    return [3, 1];
                case 3:
                    sprite.active = false;
                    return [2];
            }
        });
    };
    return PlotSelectEnemy;
}());
exports.PlotSelectEnemy = PlotSelectEnemy;

//# sourceMappingURL=plot-select-enemy.js.map
