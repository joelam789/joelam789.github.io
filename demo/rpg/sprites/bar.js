"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteBar = void 0;
var SpriteBar = (function () {
    function SpriteBar() {
    }
    SpriteBar.prototype.prepareTexture = function (sprite) {
        var texId = sprite.scene.name + "." + (sprite.origin ? sprite.origin.name : sprite.name);
        var texObj = sprite.game.lib("image").getTexture(texId);
        if (texObj)
            return texObj;
        var bgcolor = -1;
        var colorCode = "#FFFFFF";
        if (sprite.components["custom-display"] && sprite.components["custom-display"].color) {
            colorCode = sprite.components["custom-display"].color.toString();
            if (colorCode.length > 1 && colorCode.charAt(0) == '#') {
                bgcolor = parseInt(colorCode.substring(1), 16);
            }
        }
        var canv = document.createElement('canvas');
        canv.width = canv.height = 1;
        var ctx = canv.getContext('2d');
        ctx.fillStyle = colorCode;
        ctx.fillRect(0, 0, 1, 1);
        texObj = PIXI.Texture.from(canv);
        sprite.game.lib("image").setTexture(texId, texObj);
        return texObj;
    };
    return SpriteBar;
}());
exports.SpriteBar = SpriteBar;

//# sourceMappingURL=bar.js.map
