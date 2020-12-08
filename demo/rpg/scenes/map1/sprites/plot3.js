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
exports.Plot3 = void 0;
var Plot3 = (function () {
    function Plot3() {
    }
    Plot3.prototype.onUpdate = function (sprite) {
        var scene, stage, tween, motion, profile, state, dialog1, responseWords;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scene = sprite.scene;
                    stage = scene.sys("stage");
                    tween = scene.sys("tween");
                    motion = scene.sys("motion");
                    profile = scene.game.get("rpg");
                    console.log("plot started - " + sprite.name);
                    state = sprite.get("rpg");
                    dialog1 = scene.spr("dialog-box1").code;
                    if (!(state.times == 0)) return [3, 2];
                    dialog1.show(sprite, [
                        "Man:",
                        "",
                        "I am a farmer living in the forest.",
                        "Do you know what is Forest Farming?",
                        "That is what I am doing here to make a living."
                    ]);
                    return [4, sprite.plot.wait()];
                case 1:
                    _a.sent();
                    dialog1.close();
                    state.times += 1;
                    return [3, 6];
                case 2:
                    dialog1.show(sprite, [
                        "Man:",
                        "",
                        "Do you like farmers?"
                    ], 50, true);
                    return [4, sprite.plot.wait()];
                case 3:
                    _a.sent();
                    dialog1.list(sprite, [
                        "Yes.",
                        "No.",
                        "I won't tell you."
                    ]);
                    return [4, sprite.plot.wait()];
                case 4:
                    _a.sent();
                    responseWords = [
                        "I am glad to hear that.",
                        "You should get to know more about them.",
                        "Okay..."
                    ];
                    dialog1.show(sprite, [
                        "Man:",
                        "",
                        responseWords[dialog1.getChoice() - 1]
                    ]);
                    return [4, sprite.plot.wait()];
                case 5:
                    _a.sent();
                    dialog1.close();
                    _a.label = 6;
                case 6:
                    console.log("plot ended - " + sprite.name);
                    sprite.active = false;
                    return [2];
            }
        });
    };
    return Plot3;
}());
exports.Plot3 = Plot3;

//# sourceMappingURL=plot3.js.map
