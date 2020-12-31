"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpgTransition = void 0;
var RpgTransition = (function () {
    function RpgTransition() {
        this.name = "rpg-transition";
        this._game = null;
        this._player = null;
        this._stage = null;
        this._bright = null;
        this._target = "";
    }
    RpgTransition.prototype.init = function (game) {
        this._game = game;
        this._stage = game.components["display"].object;
        var canv = document.createElement('canvas');
        canv.width = canv.height = 1;
        var ctx = canv.getContext('2d');
        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.fillRect(0, 0, 1, 1);
        this._bright = new PIXI.Sprite(PIXI.Texture.from(canv));
        this._bright.scale.set(game.width, game.height);
        var layers = game.components["display"].layers;
        var keys = layers ? Object.keys(layers) : [];
        if (keys.length > 0) {
            this._bright.parentGroup = new PIXI.display.Group(keys.length + 1, false);
            this._stage.addChild(new PIXI.display.Layer(this._bright.parentGroup));
        }
        return true;
    };
    RpgTransition.prototype.activate = function (scene) {
        this._player = null;
        var rpg = scene.components["rpg"];
        if (rpg) {
            if (rpg.player)
                this._player = scene.sprites[rpg.player];
        }
        var stage = scene.sys("stage");
        if (stage)
            stage.zoom(scene, false);
    };
    RpgTransition.prototype.isWorking = function () {
        return this._target && this._target.length > 0;
    };
    RpgTransition.prototype.callScene = function (sceneName, onReady, timeFadeOut, timeFadeIn) {
        var _this = this;
        var durationFadeOut = timeFadeOut ? timeFadeOut : 1000;
        var durationFadeIn = timeFadeIn ? timeFadeIn : 1000;
        if (this._target && this._target.length > 0)
            return;
        var tweenOut = this._game.scene.systems["tween"];
        if (tweenOut && sceneName && this._game.scene.name != sceneName) {
            this._target = sceneName;
            this._bright.alpha = 0.0;
            this._stage.addChild(this._bright);
            if (this._player) {
                var pos = { x: this._player.get("stage").x, y: this._player.get("stage").y };
                var stage = this._game.scene.sys("stage");
                pos = stage.transform(pos, false);
                stage.zoomTo(this._game.scene, 2.0, 2.0, pos.x, pos.y, durationFadeOut, function () {
                    console.log("done");
                });
            }
            tweenOut.get(this._bright).to({ alpha: 1.0 }, durationFadeOut).call(function () {
                if (_this._target && _this._target == sceneName) {
                    _this._game.loadScene(sceneName, function (scene) {
                        if (scene) {
                            if (onReady)
                                onReady(scene);
                            _this._stage.removeChild(_this._bright);
                            _this._game.scene = scene;
                            var tweenIn = _this._game.scene.systems["tween"];
                            if (tweenIn) {
                                _this._bright.alpha = 1.0;
                                _this._stage.addChild(_this._bright);
                                tweenIn.get(_this._bright).to({ alpha: 0.0 }, durationFadeIn).call(function () {
                                    _this._stage.removeChild(_this._bright);
                                });
                            }
                        }
                        _this._target = "";
                    });
                }
            });
        }
    };
    return RpgTransition;
}());
exports.RpgTransition = RpgTransition;

//# sourceMappingURL=rpg-transition.js.map
