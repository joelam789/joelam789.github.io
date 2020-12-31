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
exports.PlotFight = void 0;
var PlotFight = (function () {
    function PlotFight() {
    }
    PlotFight.prototype.onUpdate = function (sprite) {
        var scene, tween, motion, profile, fighter, fighterDisplay, fighterAnimation, enemy, enemyDisplay, enemyInfo, effect, effectDisplay, effectAnimation, hurt, hurtDisplay, damage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scene = sprite.scene;
                    tween = scene.sys("tween");
                    motion = scene.sys("motion");
                    profile = scene.game.get("rpg");
                    console.log("plot started - " + sprite.name);
                    fighter = scene.spr("fighter1");
                    fighterDisplay = fighter.get("display").object;
                    fighterAnimation = fighter.get("display").animation;
                    enemy = scene.spr("enemy1");
                    enemyDisplay = enemy.get("display").object;
                    enemyInfo = enemy.get("rpg");
                    effect = scene.spr("effect1");
                    effectDisplay = effect.get("display").object;
                    effectAnimation = effect.get("display").animation;
                    hurt = scene.spr("num1");
                    hurtDisplay = hurt.get("display").object;
                    motion.moveTo(fighter, fighterDisplay.x - 50, fighterDisplay.y, 10, function () { return sprite.plot.signal(); });
                    return [4, sprite.plot.wait()];
                case 1:
                    _a.sent();
                    fighterAnimation.reset("fight", true);
                    fighterAnimation.onComplete = function () { return sprite.plot.signal("end1"); };
                    fighterAnimation.play(false);
                    effect.active = true;
                    effectDisplay.x = enemyDisplay.x;
                    effectDisplay.y = enemyDisplay.y;
                    effectDisplay.loop = false;
                    effectDisplay.animationSpeed = 0.2;
                    effectAnimation.reset("style2", true);
                    effectAnimation.onComplete = function () {
                        sprite.plot.signal("end2");
                        effectAnimation.reset();
                        effectAnimation.onComplete = null;
                        effect.active = false;
                    };
                    effectAnimation.play(false);
                    enemyDisplay.tint = 0xff7777;
                    return [4, sprite.plot.wait(["end1", "end2"])];
                case 2:
                    _a.sent();
                    damage = Math.floor(Math.random() * 150) + 100;
                    enemyInfo.hp -= damage;
                    hurt.active = true;
                    hurtDisplay.x = enemyDisplay.x;
                    hurtDisplay.y = enemyDisplay.y - 80;
                    hurtDisplay.alpha = 0.8;
                    hurtDisplay.text = "-" + damage.toString();
                    hurtDisplay.style.fontSize = 28;
                    hurtDisplay.style.fill = "#ff0000";
                    tween.get(hurtDisplay)
                        .to({ y: enemyDisplay.y - 90, alpha: 1.0 }, 500)
                        .to({ y: enemyDisplay.y - 100, alpha: 0.0 }, 500)
                        .call(function () {
                        hurtDisplay.active = false;
                    });
                    motion.moveTo(enemy, enemyDisplay.x - 20, enemyDisplay.y, 5, function () {
                        motion.moveTo(enemy, enemyDisplay.x + 20, enemyDisplay.y, 5, function () {
                            enemyDisplay.tint = 0xffffff;
                            sprite.plot.signal("end1");
                        });
                    });
                    fighterAnimation.reset("stand", true);
                    fighterAnimation.onComplete = null;
                    fighterAnimation.play(true);
                    return [4, sprite.plot.wait("end1")];
                case 3:
                    _a.sent();
                    if (enemyInfo.hp <= 0) {
                        tween.blink(enemyDisplay, 1000, 10, function () {
                            enemy.active = false;
                            sprite.plot.signal("end1");
                        });
                    }
                    motion.moveTo(fighter, fighterDisplay.x + 50, fighterDisplay.y, 10, function () { return sprite.plot.signal("end2"); });
                    if (!(enemyInfo.hp <= 0)) return [3, 5];
                    return [4, sprite.plot.wait(["end1", "end2"])];
                case 4:
                    _a.sent();
                    return [3, 8];
                case 5: return [4, sprite.plot.wait("end2")];
                case 6:
                    _a.sent();
                    return [4, sprite.plot.wait(1000)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    console.log("plot ended - " + sprite.name);
                    sprite.active = false;
                    if (enemyInfo.hp <= 0)
                        scene.spr("plot-win").active = true;
                    else
                        scene.spr("plot-enemy-fight").active = true;
                    return [2];
            }
        });
    };
    return PlotFight;
}());
exports.PlotFight = PlotFight;

//# sourceMappingURL=plot-fight.js.map
