class AStar
{
    private _openArray : Tile[];
    private _closedArray : Tile[];
    private _tileMap : TileMap;
    public _startTile : Tile;
    public _endTile : Tile;
    public _pathArray : Tile[];
    private _straightCost:number = 1.0;
    private _diagCost:number = Math.SQRT2;
    private _heuristic:Function = this.diagonal;
    constructor(){};

    public findPath(tileMap : TileMap):any
    {
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
    }

    private isOpen(tile : Tile):any
    {
        for(var i = 0 ; i < this._openArray.length ; i++){
            if( tile == this._openArray[i] ){
                return true;
            }
        }
        return false;
    }

    private isClosed(tile : Tile):any
    {
        for(var i = 0 ; i < this._closedArray.length ; i++)
        {
            if( tile == this._closedArray[i] )
            {
                return true;
            }
        }
        return false;
    }

    private findMinFInOpenArray():any
    {
        var i = 0;
        var temp : Tile;
        for(var j = 0 ; j < this._openArray.length ; j++)
        {
            if( this._openArray[i].tileData.f > this._openArray[j].tileData.f)
            {
                i = j;
            }
        }
        temp = this._openArray[i];
        for( j = i ; j < this._openArray.length - 1; j++)
        {
            this._openArray[j] = this._openArray[j + 1];
        }
        this._openArray.pop();
        return temp;
    }

    public search():any
    {
        var tile = this._startTile;
        
        while( tile != this._endTile)
        {
            var startX:number = Math.max(0, tile.tileData.x - 1);
            var endX:number = Math.min(this._tileMap.MapCols - 1, tile.tileData.x + 1);
            var startY:number = Math.max(0, tile.tileData.y - 1);
            var endY:number = Math.min(this._tileMap.MapRows - 1, tile.tileData.y + 1);
            for(var i:number = startX; i <= endX; i++)
            {
                for(var j:number = startY; j <= endY; j++)
                {
                    var test:Tile = this._tileMap.getTile(i, j);
                    if(test == tile ||!test.tileData.walkable ||!this._tileMap.getTile(tile.tileData.x, test.tileData.y).tileData.walkable ||!this._tileMap.getTile(test.tileData.x, tile.tileData.y).tileData.walkable)
                    {
                        continue;
                    }
                    var cost:number = this._straightCost;
                    if(!((tile.tileData.x == test.tileData.x) || (tile.tileData.y == test.tileData.y)))
                    {
                        cost = this._diagCost;
                    }
                    var g:number = tile.tileData.g + cost * test.tileData.costMultiplier;
                    var h:number = this._heuristic(test);
                    var f:number = g + h;
                    if(this.isOpen(test) || this.isClosed(test))
                    {
                       if(test.tileData.f > f)
                       {
                          test.tileData.f = f;
                          test.tileData.g = g;
                          test.tileData.h = h;
                          test.tileParent = tile;
                        }
                    }
                    else
                    {
                        test.tileData.f = f;
                        test.tileData.g = g;
                        test.tileData.h = h;
                        test.tileParent = tile;
                        this._openArray.push(test);
                    }

                }
            }
            this._closedArray.push(tile);
            if(this._openArray.length == 0)
            {
                console.log("no path found");
                return false
            }
            tile = this.findMinFInOpenArray();
        }
        this.buildPath();
        return true;

    }
    private buildPath():void
    {
    
        var tile:Tile = this._endTile;
        this._pathArray.push(tile);
        while(tile != this._startTile)
        {
            tile = tile.tileParent;
            this._pathArray.unshift(tile);
        }
    }


    private emanhattan(tile:Tile):number 
    {
        return Math.abs(tile.x - this._endTile.tileData.x) * this._straightCost +
        Math.abs(tile.y + this._endTile.tileData.y) * this._straightCost;
    }

    private euclidian(tile:Tile):number
    {
        var dx:number = tile.x - this._endTile.tileData.x;
        var dy:number = tile.y - this._endTile.tileData.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    }

    private diagonal(tile:Tile):number
    {
        var dx:number = Math.abs(tile.tileData.x - this._endTile.tileData.x);
        var dy:number = Math.abs(tile.tileData.y - this._endTile.tileData.y);
        var diag:number = Math.min(dx, dy);
        var straight:number = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    }

}