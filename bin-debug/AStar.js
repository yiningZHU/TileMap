// TypeScript file
var AStar = (function () {
    function AStar() {
        this._open = [];
        this._close = [];
        this._path = [];
        this._heuristic = this.diagonal;
        this._straightCost = 1.0;
        this._diagCost = Math.SQRT2;
    }
    var d = __define,c=AStar,p=c.prototype;
    p.findPath = function (grid) {
        this._grid = grid;
        this._open = new Array();
        this._close = new Array();
        //赋予起始点
        this._startNode = grid._startNode;
        this._endNode = grid._endNode;
        //起始点的特定代价为零
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    };
    p.search = function () {
        var node = this._startNode;
        while (node != this._endNode) {
            //开始检查当前节点周围的点
            //start为为什么：
            var startX = Math.max(0, node.x - 1);
            var startY = Math.max(0, node.y - 1);
            var endX = Math.min(this._grid._Column - 1, node.x + 1);
            var endY = Math.min(this._grid._Raw - 1, node.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid.getTNode(i, j);
                    if (test == node || test.walkable)
                        continue;
                    var cost = this._straightCost;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g = node.g + cost;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        this._open.push(test);
                    }
                }
            }
            this._close.push(node);
            if (this._open.length == 0) {
                //trace("no path found!");
                return false;
            }
            this._open.sort(function (a, b) {
                return a.f - b.f;
            });
            node = this._open.shift();
        }
        this.buildPath();
        return true;
    };
    p.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    };
    p.isOpen = function (node) {
        for (var i = 0; i < this._open.length; i++) {
            if (this._open[i] == node) {
                return true;
            }
        }
        return false;
    };
    p.isClosed = function (node) {
        for (var i = 0; i < this._close.length; i++) {
            if (this._close[i] == node) {
                return true;
            }
        }
        return false;
    };
    p.manhattan = function (node) {
        return Math.abs(node.x - this._endNode.x) * this._straightCost
            +
                Math.abs(node.y + this._endNode.y) * this._straightCost;
    };
    p.euclidian = function (node) {
        var dx = node.x - this._endNode.x;
        var dy = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    //
    p.diagonal = function (node) {
        var dx = Math.abs(node.x - this._endNode.x);
        var dy = Math.abs(node.y - this._endNode.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    p.visited = function () {
        return this._close.concat(this._open);
    };
    return AStar;
}());
egret.registerClass(AStar,'AStar');
