// TypeScript file

class TileMap extends egret.DisplayObjectContainer
{
    public static TILE_SIZE = 64;
    _people:Player;
    _astar:AStar;
    _i:number;
    moveX:number[]=[];
    moveY:number[]=[];
    constructor (people:Player)
    {
        super();
        this.init();
        this._people = people;
        this._i = 0;  
    }

    private init()
    {
        var config : TileData[]=
        [
            {x:0,y:0,walkable:true,image:"road_jpg"},
            {x:0,y:1,walkable:true,image:"road_jpg"},
            {x:0,y:2,walkable:true,image:"road_jpg"},
            {x:0,y:3,walkable:true,image:"road_jpg"},
            {x:0,y:4,walkable:true,image:"road_jpg"},
            {x:0,y:5,walkable:true,image:"road_jpg"},
            {x:0,y:6,walkable:true,image:"road_jpg"},
            {x:0,y:7,walkable:true,image:"road_jpg"},
            {x:0,y:8,walkable:true,image:"road_jpg"},

            {x:1,y:0,walkable:true,image:"box_jpg"},
            {x:1,y:1,walkable:true,image:"box_jpg"},
            {x:1,y:2,walkable:true,image:"box_jpg"},
            {x:1,y:3,walkable:true,image:"box_jpg"},
            {x:1,y:4,walkable:true,image:"road_jpg"},
            {x:1,y:5,walkable:true,image:"road_jpg"},
            {x:1,y:6,walkable:true,image:"road_jpg"},
            {x:1,y:7,walkable:true,image:"road_jpg"},
            {x:1,y:8,walkable:true,image:"road_jpg"},

            {x:2,y:0,walkable:true,image:"road_jpg"},
            {x:2,y:1,walkable:true,image:"road_jpg"},
            {x:2,y:2,walkable:true,image:"road_jpg"},
            {x:2,y:3,walkable:true,image:"road_jpg"},
            {x:2,y:4,walkable:true,image:"road_jpg"},
            {x:2,y:5,walkable:true,image:"road_jpg"},
            {x:2,y:6,walkable:true,image:"road_jpg"},
            {x:2,y:7,walkable:true,image:"road_jpg"},
            {x:2,y:8,walkable:true,image:"road_jpg"},

            {x:3,y:0,walkable:true,image:"road_jpg"},
            {x:3,y:1,walkable:true,image:"road_jpg"},
            {x:3,y:2,walkable:true,image:"road_jpg"},
            {x:3,y:3,walkable:true,image:"road_jpg"},
            {x:3,y:4,walkable:true,image:"road_jpg"},
            {x:3,y:5,walkable:true,image:"road_jpg"},
            {x:3,y:6,walkable:true,image:"road_jpg"},
            {x:3,y:7,walkable:true,image:"road_jpg"},
            {x:3,y:8,walkable:true,image:"road_jpg"},

            {x:4,y:0,walkable:true,image:"road_jpg"},
            {x:4,y:1,walkable:true,image:"road_jpg"},
            {x:4,y:2,walkable:true,image:"road_jpg"},
            {x:4,y:3,walkable:true,image:"road_jpg"},
            {x:4,y:4,walkable:true,image:"road_jpg"},
            {x:4,y:5,walkable:true,image:"road_jpg"},
            {x:4,y:6,walkable:true,image:"road_jpg"},
            {x:4,y:7,walkable:true,image:"road_jpg"},
            {x:4,y:8,walkable:true,image:"road_jpg"},

            {x:5,y:0,walkable:true,image:"road_jpg"},
            {x:5,y:1,walkable:true,image:"road_jpg"},
            {x:5,y:2,walkable:true,image:"road_jpg"},
            {x:5,y:3,walkable:true,image:"road_jpg"},
            {x:5,y:4,walkable:true,image:"road_jpg"},
            {x:5,y:5,walkable:true,image:"road_jpg"},
            {x:5,y:6,walkable:true,image:"road_jpg"},
            {x:5,y:7,walkable:true,image:"road_jpg"},
            {x:5,y:8,walkable:true,image:"road_jpg"},

            {x:6,y:0,walkable:true,image:"road_jpg"},
            {x:6,y:1,walkable:true,image:"road_jpg"},
            {x:6,y:2,walkable:true,image:"road_jpg"},
            {x:6,y:3,walkable:true,image:"road_jpg"},
            {x:6,y:4,walkable:true,image:"road_jpg"},
            {x:6,y:5,walkable:true,image:"road_jpg"},
            {x:6,y:6,walkable:true,image:"road_jpg"},
            {x:6,y:7,walkable:true,image:"road_jpg"},
            {x:6,y:8,walkable:true,image:"road_jpg"},

            {x:7,y:0,walkable:true,image:"road_jpg"},
            {x:7,y:1,walkable:true,image:"road_jpg"},
            {x:7,y:2,walkable:true,image:"road_jpg"},
            {x:7,y:3,walkable:true,image:"box_jpg"},
            {x:7,y:4,walkable:true,image:"box_jpg"},
            {x:7,y:5,walkable:true,image:"road_jpg"},
            {x:7,y:6,walkable:true,image:"road_jpg"},
            {x:7,y:7,walkable:true,image:"road_jpg"},
            {x:7,y:8,walkable:true,image:"road_jpg"},

            {x:8,y:0,walkable:true,image:"road_jpg"},
            {x:8,y:1,walkable:true,image:"road_jpg"},
            {x:8,y:2,walkable:true,image:"road_jpg"},
            {x:8,y:3,walkable:true,image:"road_jpg"},
            {x:8,y:4,walkable:true,image:"road_jpg"},
            {x:8,y:5,walkable:true,image:"road_jpg"},
            {x:8,y:6,walkable:true,image:"road_jpg"},
            {x:8,y:7,walkable:true,image:"road_jpg"},
            {x:8,y:8,walkable:true,image:"road_jpg"},
        ]

        for(var i=0;i< config.length;i++)
        {
            var data = config[i];
            var tile = new Tile(data);
            this.addChild(tile);
            
        }
        
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            var localX = e.localX;
            var localY = e.localY;
            var gridX = Math.floor(localX/TileMap.TILE_SIZE);//就是把实际坐标转换成网格坐标。
            var gridY = Math.floor(localY/TileMap.TILE_SIZE);
            var peopleX = Math.floor(this._people._people.x/TileMap.TILE_SIZE);
            var peopleY = Math.floor(this._people._people.y/TileMap.TILE_SIZE);
            this._astar = new AStar();
            var grid = new Grid(9,9);
            grid.setStartNode(peopleX,peopleY);
            grid.setEndNode(gridX,gridY);

            if(this._astar.findPath(grid))
            {
                this._astar._path.map((tile)=>{
                    console.log('x:${tile.x},y:${tily.y}')
                });

                this._i = 1;
                this.moveX[this._i] = this._astar._path[this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                this.moveY[this._i] = this._astar._path[this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                this._people.move(this.moveX[this._i],this.moveY[this._i]);
                egret.Tween.get(this._people._people).to({x:this.moveX[this._i],y:this.moveY[this._i]},600).wait(10).call(function(){this._people.idle()},this);

                var timer:egret.Timer = new egret.Timer(1000,this._astar._path.length-2);
                timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunction,this);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunvtion,this);
            }
            //console.log(gridX,gridY);
        },this);
    }

    private timerFunction()
    {
        this._i++;
        this.moveX[this._i] = this._astar._path[this._i].x*TileMap.TILE_SIZE+TileMap.TILE_SIZE/2;
        this.moveY[this._i] = this._astar._path[this._i].y*TileMap.TILE_SIZE+TileMap.TILE_SIZE/2;

        this._people.move(this.moveX[this._i],this.moveY[this._i]);
        egret.Tween.get(this._people._people).to({x:this.moveX[this._i],y:this.moveY[this._i]},600).wait(10).call(function() {this._people.idle()},this);
    }

    private timerComFunvtion()
    {
        console.log("END!");
    }
}


interface TileData
{
    x:number;
    y:number;
    walkable:boolean;
    image:string;
}

class Tile extends egret.DisplayObjectContainer
{
    data: TileData
    constructor(data:TileData)
    {
        super();
        this.data = data;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(data.image);
        //bitmap.scaleX = bitmap.scaleY =2;
        bitmap.width = 64;
        bitmap.height = 64;
        this.x = data.x*TileMap.TILE_SIZE;
        this.y = data.y*TileMap.TILE_SIZE; 
        this.addChild(bitmap);
    }

}