"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene1 = void 0;
var Scene1 = (function () {
    function Scene1() {
        this.scene = null;
        this.path = [];
    }
    Scene1.prototype.onInit = function (scene) {
        console.log("on scene init: " + scene.name);
    };
    Scene1.prototype.onActivate = function (scene) {
        this.scene = scene;
        console.log("on scene activate: " + scene.name);
    };
    Scene1.prototype.onUpdate = function (scene) {
    };
    return Scene1;
}());
exports.Scene1 = Scene1;

//# sourceMappingURL=map1.js.map
