"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteBoy = void 0;
var SpriteBoy = (function () {
    function SpriteBoy() {
    }
    SpriteBoy.prototype.prepareSpriteAsync = function (sprite, callback) {
        var spineConfig = sprite.components["spine"];
        sprite.game.lib("image").loadImageByType(spineConfig.png, 1, function (imgObj) {
            if (!imgObj)
                callback(null);
            sprite.game.lib("json").loadString(spineConfig.atlas, function (atlasObj) {
                if (!atlasObj)
                    callback(null);
                sprite.game.lib("json").loadJson(spineConfig.json, function (jsonObj) {
                    if (!jsonObj)
                        callback(null);
                    var rawSkeletonData = jsonObj;
                    var rawAtlasData = atlasObj;
                    var spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, function (line, addTextureFunc) {
                        addTextureFunc(imgObj);
                    });
                    var spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
                    var spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);
                    var spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
                    var spineSpr = new PIXI.spine.Spine(spineData);
                    if (spineSpr.state.hasAnimation('walk')) {
                        spineSpr.state.setAnimation(0, 'walk', true);
                    }
                    callback(spineSpr);
                });
            });
        });
    };
    return SpriteBoy;
}());
exports.SpriteBoy = SpriteBoy;

//# sourceMappingURL=boy.js.map
