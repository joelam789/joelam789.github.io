"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpriteTriangle = void 0;
var SpriteTriangle = (function () {
    function SpriteTriangle() {
    }
    SpriteTriangle.prototype.prepareTexture = function (sprite) {
        var texId = sprite.scene.name + "." + (sprite.origin ? sprite.origin.name : sprite.name);
        var texObj = sprite.game.lib("image").getTexture(texId);
        if (texObj)
            return texObj;
        var canv = document.createElement('canvas');
        canv.width = 20;
        canv.height = 20;
        var ctx = canv.getContext('2d');
        ctx.clearRect(0, 0, 20, 20);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(20, 0);
        ctx.lineTo(10, 10);
        ctx.closePath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        texObj = PIXI.Texture.from(canv);
        sprite.game.lib("image").setTexture(texId, texObj);
        return texObj;
    };
    return SpriteTriangle;
}());
exports.SpriteTriangle = SpriteTriangle;

//# sourceMappingURL=icon-triangle.js.map
