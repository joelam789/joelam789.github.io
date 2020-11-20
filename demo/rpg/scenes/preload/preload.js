"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenePreload = void 0;
var ScenePreload = (function () {
    function ScenePreload() {
        this.nextSceneName = "map1";
        this.preloadScenes = ["info", "dialog", "map1"];
        this.preloadPackFiles = ["pack2.pack", "pack3.pack"];
    }
    ScenePreload.prototype.onInit = function (scene) {
        console.log("on scene init: " + scene.name);
    };
    ScenePreload.prototype.onActivate = function (scene) {
        var _this = this;
        console.log("on scene activate: " + scene.name);
        var message = scene.spr("label1");
        var progressbar = scene.spr("progress1");
        progressbar.get("display").object.scale.x = 10;
        var preload = scene.game.lib("preload");
        preload.loadPacks(this.preloadPackFiles, function () {
            console.log("finished loading packages");
            scene.game.loadScenes(_this.preloadScenes, function () {
                console.log("finished loading scenes");
                var needClickToContinue = navigator.userAgent.indexOf('iPad') >= 0 || navigator.userAgent.indexOf('iPhone') >= 0;
                needClickToContinue = true;
                if (needClickToContinue) {
                    scene.components.event["onPointerdown"] = function () { return scene.game.scene = scene.game.scenes[_this.nextSceneName]; };
                    message.get("display").object.text += " (click here to continue)";
                }
                else
                    scene.game.scene = scene.game.scenes[_this.nextSceneName];
            }, function (percentage) {
                var progress = 0.5 + percentage / 200.0;
                progressbar.get("display").object.scale.x = 420 * progress;
                message.get("display").object.text = "Loading scenes ... " + Math.round(progress * 100) + "%";
            });
        }, function (current, total) {
            if (current > 0 && total > 0) {
                var progress = current / total / 2.0;
                progressbar.get("display").object.scale.x = 420 * progress;
                message.get("display").object.text = "Loading packages ... " + Math.round(progress * 100) + "%";
            }
        });
    };
    return ScenePreload;
}());
exports.ScenePreload = ScenePreload;

//# sourceMappingURL=preload.js.map
