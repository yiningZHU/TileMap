// TypeScript file
class Grid
{
    _startNode:TNode;
    _endNode:TNode;
    _nodes:TNode[][] = [];
    _Column:number;
    _Raw:number;

    constructor(Column:number,Raw:number)
    {
        this._Column = Column;
        this._Raw = Raw;
        this._nodes = new Array();

        for(var i=0 ; i<this._Column ; i++)
        {
            this._nodes[i] = new Array();
            for(var j=0 ; j<this._Raw ; j++)
            {
                this._nodes[i][j] = new TNode(i,j);
            }
        }
    }

    public getTNode(x:number,y:number):any
    {
        return this._nodes[x][y] as TNode;
    }

    public setStartNode(x:number,y:number):void
    {
        this._startNode = this._nodes[x][y] as TNode;
    }

    public getStartNode():TNode
    {
        return this._startNode as TNode;
    }

    public setEndNode(x:number,y:number):void
    {
        this._endNode = this._nodes[x][y] as TNode;
    }

    public getEndNode():TNode
    {
        return this._endNode as TNode;
    }

    public setWalkable(x:number,y:number,w:boolean):void
    {
        this._nodes[x][y].walkable = w;
    }

    public getColimn():number
    {
        return this._Column;
    }

    public getRaw():number
    {
        return this._Raw;
    }
}
