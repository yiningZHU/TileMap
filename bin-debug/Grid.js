// TypeScript file
var Grid = (function () {
    function Grid(Column, Raw) {
        this._nodes = [];
        this._Column = Column;
        this._Raw = Raw;
        this._nodes = new Array();
        for (var i = 0; i < this._Column; i++) {
            this._nodes[i] = new Array();
            for (var j = 0; j < this._Raw; j++) {
                this._nodes[i][j] = new TNode(i, j);
            }
        }
    }
    var d = __define,c=Grid,p=c.prototype;
    p.getTNode = function (x, y) {
        return this._nodes[x][y];
    };
    p.setStartNode = function (x, y) {
        this._startNode = this._nodes[x][y];
    };
    p.getStartNode = function () {
        return this._startNode;
    };
    p.setEndNode = function (x, y) {
        this._endNode = this._nodes[x][y];
    };
    p.getEndNode = function () {
        return this._endNode;
    };
    p.setWalkable = function (x, y, w) {
        this._nodes[x][y].walkable = w;
    };
    p.getColimn = function () {
        return this._Column;
    };
    p.getRaw = function () {
        return this._Raw;
    };
    return Grid;
}());
egret.registerClass(Grid,'Grid');
//# sourceMappingURL=Grid.js.map