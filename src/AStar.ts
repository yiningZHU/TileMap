// TypeScript file
class AStar
{
    _open:TNode[] = [];
    _close:TNode[] = [];
    _grid:Grid;
    _startNode:TNode;
    _endNode:TNode;
    _path:TNode[] = [];
    _heuristic:Function = this.diagonal;//有三个预估函数
    //相当于设置两个常量1和1.41
    _straightCost:number = 1.0;//［？］：是1还不是很清楚它的作用－》明白了
    _diagCost:number = Math.SQRT2;//2的平方根：1.41

    constructor()
    {

    }

    public findPath(grid:Grid):boolean
    {
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
    }

    public search():boolean
    {
        
        var nownode:TNode = this._startNode;
        while(nownode!=this._endNode)
        {
            //开始检查当前节点周围的点
            //start为什么是这个参数？：因为不知道当前节点是否在地图的边缘，取当前节点
            //减去1和0比较大的一个；若在边缘，则会丛0开始；如果不在边缘，则从当前节点
            //前一个开始检查
            var startX:number = Math.max(0,nownode.x-1);
            var startY:number = Math.max(0,nownode.y-1);
            //同理，因为不知道是否在地图的边缘处
            var endX:number = Math.min(this._grid._Column-1,nownode.x+1);
            var endY:number = Math.min(this._grid._Raw-1,nownode.y+1);

            //开始查找最佳路径
            for(var i = startX ; i<= endX ; i++)
            {
                for(var j = startY ; j <= endY ; j++)
                {
                    var test:TNode = this._grid.getTNode(i,j);

                    //当前节点如果和测试节点相同则无视这个节点
                    if(test == nownode || test.walkable) continue
                    var cost:number = this._straightCost;

                    //只要检测的节点和当前节点处在相同的X或者Y轴
                    //那么它的代价就是1；否则就求他的对角代价
                    if(!((nownode.x == test.x) || (nownode.y == test.y)))
                    {
                        cost = this._diagCost;
                    }

                    var g:number = nownode.g + cost;
                    var h:number = this._heuristic(test);
                    var f:number = g+h;

                    //测试节点在待查和已查列表中，检查当前节点的代价和测试节点的代价
                    if(this.isOpen(test) || this.isClosed(test))
                    {
                        if(test.f > f)
                        {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = nownode;
                        }
                    }
                    //不再列表中，则要将计算出来的代价赋给测试节点，并且将节点加到
                    //待查列表中
                    else
                    {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        this._open.push(test);
                    }
                }
            }

            //这样当前节点久检查完毕，加到已查列表中
            this._close.push(nownode);
            if(this._open.length == 0)
            {
                console.log("NO TRACE FOUND!");
                return false;
            }
            
            this._open.sort(function(a,b)//?
            {
                return a.f-b.f;
            });
            nownode = this._open.shift() as TNode;
        }
            this.buildPath();
            return true;
    }

    public buildPath():void
    {
        this._path = new Array();
        var node:TNode = this._endNode;
        this._path.push(node);
        while(node != this._startNode)
        {
            node = node.parent;
            this._path.unshift(node);
        }
    }

    //［稍微有点不懂］遍历待查列表
    public isOpen(node:TNode):boolean
    {
        for(var i = 0; i<this._open.length;i++)
        {
            if(this._open[i] == node)
            {
                return true;
            }
        }
        return false;
    }

    //［］遍历已查列表
    public isClosed(node:TNode):boolean
    {
        for(var i = 0; i <this._close.length;i++)
        {
            if(this._close[i] == node)
            {
                return true;
            }
        }
        return false;
    }

    private manhattan(node:TNode):number
    {
        return Math.abs(node.x - this._endNode.x)*this._straightCost
        +
        Math.abs(node.y + this._endNode.y)*this._straightCost;
    }

    private euclidian(node:TNode):number
    {
        var dx:number = node.x - this._endNode.x;
        var dy:number = node.y - this._endNode.y;
        return Math.sqrt(dx * dx + dy * dy)*this._straightCost;
    }

    //
    private diagonal(node:TNode):number
    {
        var dx:number = Math.abs(node.x - this._endNode.x);
        var dy:number = Math.abs(node.y - this._endNode.y);
        var diag:number = Math.min(dx,dy);
        var straight:number = dx + dy;
        return this._diagCost*diag + this._straightCost*(straight - 2*diag);
    }

    public visited():TNode[]
    {
        return this._close.concat(this._open);
    }

    public validNode(node: TNode, nownode: TNode): Boolean 
    {
		if ( nownode == node || !node.walkable) return false;

		if (!this._grid._nodes[nownode.x][node.y].walkable) return false;

		if (!this._grid._nodes[node.x][nownode.y].walkable) return false;

		return true;
	}
}