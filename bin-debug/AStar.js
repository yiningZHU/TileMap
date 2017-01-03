var AStar = (function () {
    function AStar() {
        this._straightCost = 1.0;
        this._diagCost = Math.SQRT2;
        this._heuristic = this.diagonal;
    }
    var d = __define,c=AStar,p=c.prototype;
    ;
    p.findPath = function (tileMap) {
        var h = 0;
        var g = 0;
        this._pathArray = [];
        this._tileMap = tileMap;
        this._openArray = [];
        this._closedArray = [];
        this._startTile = tileMap.startTile;
        this._endTile = tileMap.endTile;
        this._startTile.tileData.g = 0;
        this._startTile.tileData.h = this._heuristic(this._startTile);
        this._startTile.tileData.f = this._startTile.tileData.g + this._startTile.tileData.h;
        return this.search();
    };
    p.isOpen = function (tile) {
        for (var i = 0; i < this._openArray.length; i++) {
            if (tile == this._openArray[i]) {
                return true;
            }
        }
        return false;
    };
    p.isClosed = function (tile) {
        for (var i = 0; i < this._closedArray.length; i++) {
            if (tile == this._closedArray[i]) {
                return true;
            }
        }
        return false;
    };
    p.findMinFInOpenArray = function () {
        var i = 0;
        var temp;
        for (var j = 0; j < this._openArray.length; j++) {
            if (this._openArray[i].tileData.f > this._openArray[j].tileData.f) {
                i = j;
            }
        }
        temp = this._openArray[i];
        for (j = i; j < this._openArray.length - 1; j++) {
            this._openArray[j] = this._openArray[j + 1];
        }
        this._openArray.pop();
        return temp;
    };
    p.search = function () {
        var tile = this._startTile;
        while (tile != this._endTile) {
            var startX = Math.max(0, tile.tileData.x - 1);
            var endX = Math.min(this._tileMap.MapCols - 1, tile.tileData.x + 1);
            var startY = Math.max(0, tile.tileData.y - 1);
            var endY = Math.min(this._tileMap.MapRows - 1, tile.tileData.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._tileMap.getTile(i, j);
                    if (test == tile || !test.tileData.walkable || !this._tileMap.getTile(tile.tileData.x, test.tileData.y).tileData.walkable || !this._tileMap.getTile(test.tileData.x, tile.tileData.y).tileData.walkable) {
                        continue;
                    }
                    var cost = this._straightCost;
                    if (!((tile.tileData.x == test.tileData.x) || (tile.tileData.y == test.tileData.y))) {
                        cost = this._diagCost;
                    }
                    var g = tile.tileData.g + cost * test.tileData.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.tileData.f > f) {
                            test.tileData.f = f;
                            test.tileData.g = g;
                            test.tileData.h = h;
                            test.tileParent = tile;
                        }
                    }
                    else {
                        test.tileData.f = f;
                        test.tileData.g = g;
                        test.tileData.h = h;
                        test.tileParent = tile;
                        this._openArray.push(test);
                    }
                }
            }
            this._closedArray.push(tile);
            if (this._openArray.length == 0) {
                console.log("no path found");
                return false;
            }
            tile = this.findMinFInOpenArray();
        }
        this.buildPath();
        return true;
    };
    p.buildPath = function () {
        var tile = this._endTile;
        this._pathArray.push(tile);
        while (tile != this._startTile) {
            tile = tile.tileParent;
            this._pathArray.unshift(tile);
        }
    };
    p.emanhattan = function (tile) {
        return Math.abs(tile.x - this._endTile.tileData.x) * this._straightCost +
            Math.abs(tile.y + this._endTile.tileData.y) * this._straightCost;
    };
    p.euclidian = function (tile) {
        var dx = tile.x - this._endTile.tileData.x;
        var dy = tile.y - this._endTile.tileData.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    p.diagonal = function (tile) {
        var dx = Math.abs(tile.tileData.x - this._endTile.tileData.x);
        var dy = Math.abs(tile.tileData.y - this._endTile.tileData.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    return AStar;
}());
egret.registerClass(AStar,'AStar');
//# sourceMappingURL=AStar.js.map