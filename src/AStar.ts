// TypeScript file
class AStar
{
    _open:TNode[] = [];
    _close:TNode[] = [];
    _grid:Grid;
    _startNode:TNode;
    _endNode:TNode;
    _path:TNode[] = [];
    _heuristic:Function = this.diagonal;
    _straightCost:number = 1.0;
    _diagCost:number = Math.SQRT2;

    constructor()
    {

    }

    public findPath(grid:Grid):boolean
    {
        this._grid = grid;
        this._open = new Array();
        this._close = new Array();

        this._startNode = grid._startNode;
        this._endNode = grid._endNode;

        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;

        return this.search();
    }

    public search():boolean
    {
        
        var node:TNode = this._startNode;
        while(node!=this._endNode)
        {
            var startX:number = Math.max(0,node.x-1);
            var endX:number = Math.min(this._grid._Column-1,node.x+1);
            var startY:number = Math.max(0,node.y-1);
            var endY:number = Math.min(this._grid._Raw-1,node.y+1);

            for(var i = startX ; i<= endX ; i++)
            {
                for(var j = startY ; j <= endY ; j++)
                {
                    var test:TNode = this._grid.getTNode(i,j);
                    if(test == node || test.walkable) continue
                    var cost:number = this._straightCost;
                    if(!((node.x == test.x) || (node.y == test.y)))
                    {
                        cost = this._diagCost;
                    }
                    var g:number = node.g + cost;
                    var h:number = this._heuristic(test);
                    var f:number = g+h;
                    if(this.isOpen(test) || this.isClosed(test))
                    {
                        if(test.f > f)
                        {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else
                    {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        this._open.push(test);
                    }
                }
            }
            this._close.push(node);
            if(this._open.length == 0)
            {
                //trace("no path found!");
                return false;
            }
            this._open.sort(function(a,b)//?
            {
                return a.f-b.f;
            });
            node = this._open.shift() as TNode;
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

    public isOpen(node:TNode):boolean
    {
        for(var i=0; i<this._open.length;i++)
        {
            if(this._open[i] == node)
            {
                return true;
            }
        }
        return false;
    }

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
}