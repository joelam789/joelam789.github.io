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
exports.Plot2 = void 0;
var Plot2 = (function () {
    function Plot2() {
    }
    Plot2.prototype.onUpdate = function (sprite) {
        var scene, stage, tween, motion, profile, dialog1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scene = sprite.scene;
                    stage = scene.sys("stage");
                    tween = scene.sys("tween");
                    motion = scene.sys("motion");
                    profile = scene.game.get("rpg");
                    console.log("plot started - " + sprite.name);
                    dialog1 = scene.spr("dialog-box1").code;
                    dialog1.show(sprite, [
                        "God:",
                        "",
                        "Welcome! My dear boy!",
                        "You will be the next new hero soon.",
                        "So please go and make yourself stronger.",
                    ]);
                    return [4, sprite.plot.wait()];
                case 1:
                    _a.sent();
                    dialog1.show(sprite, [
                        "神之声：",
                        "",
                        "孩子，你是被命运选中的英雄 ——"
                    ], 50, true);
                    return [4, sprite.plot.wait()];
                case 2:
                    _a.sent();
                    dialog1.show(sprite, [
                        " 天选之子！ "
                    ], 2, true);
                    return [4, sprite.plot.wait()];
                case 3:
                    _a.sent();
                    dialog1.show(sprite, [
                        "",
                        "没什么好害怕，神的意志和光辉将会与你同在。",
                        "只要无时无刻谨记神的教诲，神的力量会一直保护你。"
                    ]);
                    return [4, sprite.plot.wait()];
                case 4:
                    _a.sent();
                    dialog1.show(sprite, [
                        "評価項目:",
                        "",
                        "舞台となる惑星は、地球ではありません。",
                        "古風な雰囲気のある分かりやすい操作の見下ろし型アクション。",
                        "世界観が作りこまれているのに、肝心のメインストーリーがお粗末です。",
                    ]);
                    return [4, sprite.plot.wait()];
                case 5:
                    _a.sent();
                    dialog1.close(sprite);
                    console.log("plot ended - " + sprite.name);
                    sprite.active = false;
                    return [2];
            }
        });
    };
    return Plot2;
}());
exports.Plot2 = Plot2;

//# sourceMappingURL=plot2.js.map
