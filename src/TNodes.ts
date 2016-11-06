// TypeScript file

//参照书上的Node类型
class TNode
{
    x:number;
    y:number;
    f:number;
    g:number;
    h:number;
    walkable:boolean;
    parent:TNode;

    constructor(x:number,y:number)
    {
        this.x = x;
        this.y = y;
    }
}