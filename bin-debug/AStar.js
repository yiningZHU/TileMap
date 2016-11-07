// TypeScript file
var AStar = (function () {
    function AStar() {
        this._open = [];
        this._close = [];
        this._path = [];
        this._heuristic = this.diagonal; //有三个预估函数
        //相当于设置两个常量1和1.41
        this._straightCost = 1.0; //［？］：是1还不是很清楚它的作用－》明白了
        this._diagCost = Math.SQRT2; //2的平方根：1.41
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
        var nownode = this._startNode;
        while (nownode != this._endNode) {
            //开始检查当前节点周围的点
            //start为什么是这个参数？：因为不知道当前节点是否在地图的边缘，取当前节点
            //减去1和0比较大的一个；若在边缘，则会丛0开始；如果不在边缘，则从当前节点
            //前一个开始检查
            var startX = Math.max(0, nownode.x - 1);
            var startY = Math.max(0, nownode.y - 1);
            //同理，因为不知道是否在地图的边缘处
            var endX = Math.min(this._grid._Column - 1, nownode.x + 1);
            var endY = Math.min(this._grid._Raw - 1, nownode.y + 1);
            //开始查找最佳路径
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid.getTNode(i, j);
                    //当前节点如果和测试节点相同则无视这个节点
                    if (test == nownode || test.walkable)
                        continue;
                    var cost = this._straightCost;
                    //只要检测的节点和当前节点处在相同的X或者Y轴
                    //那么它的代价就是1；否则就求他的对角代价
                    if (!((nownode.x == test.x) || (nownode.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g = nownode.g + cost;
                    var h = this._heuristic(test);
                    var f = g + h;
                    //测试节点在待查和已查列表中，检查当前节点的代价和测试节点的代价
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = nownode;
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
            //这样当前节点久检查完毕，加到已查列表中
            this._close.push(nownode);
            if (this._open.length == 0) {
                console.log("NO TRACE FOUND!");
                return false;
            }
            this._open.sort(function (a, b) {
                return a.f - b.f;
            });
            nownode = this._open.shift();
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
    //［稍微有点不懂］遍历待查列表
    p.isOpen = function (node) {
        for (var i = 0; i < this._open.length; i++) {
            if (this._open[i] == node) {
                return true;
            }
        }
        return false;
    };
    //［］遍历已查列表
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
    p.validNode = function (node, nownode) {
        if (nownode == node || !node.walkable)
            return false;
        if (!this._grid._nodes[nownode.x][node.y].walkable)
            return false;
        if (!this._grid._nodes[node.x][nownode.y].walkable)
            return false;
        return true;
    };
    return AStar;
}());
egret.registerClass(AStar,'AStar');
//# sourceMappingURL=AStar.js.map