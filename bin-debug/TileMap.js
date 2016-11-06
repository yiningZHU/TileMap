// TypeScript file
var TileMap = (function (_super) {
    __extends(TileMap, _super);
    function TileMap(people) {
        _super.call(this);
        this.moveX = [];
        this.moveY = [];
        this.init();
        this._people = people;
        this._i = 0;
    }
    var d = __define,c=TileMap,p=c.prototype;
    p.init = function () {
        var _this = this;
        var config = [
            { x: 0, y: 0, walkable: true, image: "road_jpg" },
            { x: 0, y: 1, walkable: true, image: "road_jpg" },
            { x: 0, y: 2, walkable: true, image: "road_jpg" },
            { x: 0, y: 3, walkable: true, image: "road_jpg" },
            { x: 0, y: 4, walkable: true, image: "road_jpg" },
            { x: 0, y: 5, walkable: true, image: "road_jpg" },
            { x: 0, y: 6, walkable: true, image: "road_jpg" },
            { x: 0, y: 7, walkable: true, image: "road_jpg" },
            { x: 0, y: 8, walkable: true, image: "road_jpg" },
            { x: 1, y: 0, walkable: true, image: "box_jpg" },
            { x: 1, y: 1, walkable: true, image: "box_jpg" },
            { x: 1, y: 2, walkable: true, image: "box_jpg" },
            { x: 1, y: 3, walkable: true, image: "box_jpg" },
            { x: 1, y: 4, walkable: true, image: "road_jpg" },
            { x: 1, y: 5, walkable: true, image: "road_jpg" },
            { x: 1, y: 6, walkable: true, image: "road_jpg" },
            { x: 1, y: 7, walkable: true, image: "road_jpg" },
            { x: 1, y: 8, walkable: true, image: "road_jpg" },
            { x: 2, y: 0, walkable: true, image: "road_jpg" },
            { x: 2, y: 1, walkable: true, image: "road_jpg" },
            { x: 2, y: 2, walkable: true, image: "road_jpg" },
            { x: 2, y: 3, walkable: true, image: "road_jpg" },
            { x: 2, y: 4, walkable: true, image: "road_jpg" },
            { x: 2, y: 5, walkable: true, image: "road_jpg" },
            { x: 2, y: 6, walkable: true, image: "road_jpg" },
            { x: 2, y: 7, walkable: true, image: "road_jpg" },
            { x: 2, y: 8, walkable: true, image: "road_jpg" },
            { x: 3, y: 0, walkable: true, image: "road_jpg" },
            { x: 3, y: 1, walkable: true, image: "road_jpg" },
            { x: 3, y: 2, walkable: true, image: "road_jpg" },
            { x: 3, y: 3, walkable: true, image: "road_jpg" },
            { x: 3, y: 4, walkable: true, image: "road_jpg" },
            { x: 3, y: 5, walkable: true, image: "road_jpg" },
            { x: 3, y: 6, walkable: true, image: "road_jpg" },
            { x: 3, y: 7, walkable: true, image: "road_jpg" },
            { x: 3, y: 8, walkable: true, image: "road_jpg" },
            { x: 4, y: 0, walkable: true, image: "road_jpg" },
            { x: 4, y: 1, walkable: true, image: "road_jpg" },
            { x: 4, y: 2, walkable: true, image: "road_jpg" },
            { x: 4, y: 3, walkable: true, image: "road_jpg" },
            { x: 4, y: 4, walkable: true, image: "road_jpg" },
            { x: 4, y: 5, walkable: true, image: "road_jpg" },
            { x: 4, y: 6, walkable: true, image: "road_jpg" },
            { x: 4, y: 7, walkable: true, image: "road_jpg" },
            { x: 4, y: 8, walkable: true, image: "road_jpg" },
            { x: 5, y: 0, walkable: true, image: "road_jpg" },
            { x: 5, y: 1, walkable: true, image: "road_jpg" },
            { x: 5, y: 2, walkable: true, image: "road_jpg" },
            { x: 5, y: 3, walkable: true, image: "road_jpg" },
            { x: 5, y: 4, walkable: true, image: "road_jpg" },
            { x: 5, y: 5, walkable: true, image: "road_jpg" },
            { x: 5, y: 6, walkable: true, image: "road_jpg" },
            { x: 5, y: 7, walkable: true, image: "road_jpg" },
            { x: 5, y: 8, walkable: true, image: "road_jpg" },
            { x: 6, y: 0, walkable: true, image: "road_jpg" },
            { x: 6, y: 1, walkable: true, image: "road_jpg" },
            { x: 6, y: 2, walkable: true, image: "road_jpg" },
            { x: 6, y: 3, walkable: true, image: "road_jpg" },
            { x: 6, y: 4, walkable: true, image: "road_jpg" },
            { x: 6, y: 5, walkable: true, image: "road_jpg" },
            { x: 6, y: 6, walkable: true, image: "road_jpg" },
            { x: 6, y: 7, walkable: true, image: "road_jpg" },
            { x: 6, y: 8, walkable: true, image: "road_jpg" },
            { x: 7, y: 0, walkable: true, image: "road_jpg" },
            { x: 7, y: 1, walkable: true, image: "road_jpg" },
            { x: 7, y: 2, walkable: true, image: "road_jpg" },
            { x: 7, y: 3, walkable: true, image: "box_jpg" },
            { x: 7, y: 4, walkable: true, image: "box_jpg" },
            { x: 7, y: 5, walkable: true, image: "road_jpg" },
            { x: 7, y: 6, walkable: true, image: "road_jpg" },
            { x: 7, y: 7, walkable: true, image: "road_jpg" },
            { x: 7, y: 8, walkable: true, image: "road_jpg" },
            { x: 8, y: 0, walkable: true, image: "road_jpg" },
            { x: 8, y: 1, walkable: true, image: "road_jpg" },
            { x: 8, y: 2, walkable: true, image: "road_jpg" },
            { x: 8, y: 3, walkable: true, image: "road_jpg" },
            { x: 8, y: 4, walkable: true, image: "road_jpg" },
            { x: 8, y: 5, walkable: true, image: "road_jpg" },
            { x: 8, y: 6, walkable: true, image: "road_jpg" },
            { x: 8, y: 7, walkable: true, image: "road_jpg" },
            { x: 8, y: 8, walkable: true, image: "road_jpg" },
        ];
        for (var i = 0; i < config.length; i++) {
            var data = config[i];
            var tile = new Tile(data);
            this.addChild(tile);
        }
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var localX = e.localX;
            var localY = e.localY;
            var gridX = Math.floor(localX / TileMap.TILE_SIZE); //就是把实际坐标转换成网格坐标。
            var gridY = Math.floor(localY / TileMap.TILE_SIZE);
            var peopleX = Math.floor(_this._people._people.x / TileMap.TILE_SIZE);
            var peopleY = Math.floor(_this._people._people.y / TileMap.TILE_SIZE);
            _this._astar = new AStar();
            var grid = new Grid(9, 9);
            grid.setStartNode(peopleX, peopleY);
            grid.setEndNode(gridX, gridY);
            if (_this._astar.findPath(grid)) {
                _this._astar._path.map(function (tile) {
                    console.log('x:${tile.x},y:${tily.y}');
                });
                _this._i = 1;
                _this.moveX[_this._i] = _this._astar._path[_this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                _this.moveY[_this._i] = _this._astar._path[_this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                _this._people.move(_this.moveX[_this._i], _this.moveY[_this._i]);
                egret.Tween.get(_this._people._people).to({ x: _this.moveX[_this._i], y: _this.moveY[_this._i] }, 600).wait(10).call(function () { this._people.idle(); }, _this);
                var timer = new egret.Timer(1000, _this._astar._path.length - 2);
                timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunction, _this);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.timerComFunvtion, _this);
            }
            //console.log(gridX,gridY);
        }, this);
    };
    p.timerFunction = function () {
        this._i++;
        this.moveX[this._i] = this._astar._path[this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
        this.moveY[this._i] = this._astar._path[this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
        this._people.move(this.moveX[this._i], this.moveY[this._i]);
        egret.Tween.get(this._people._people).to({ x: this.moveX[this._i], y: this.moveY[this._i] }, 600).wait(10).call(function () { this._people.idle(); }, this);
    };
    p.timerComFunvtion = function () {
        console.log("END!");
    };
    TileMap.TILE_SIZE = 64;
    return TileMap;
}(egret.DisplayObjectContainer));
egret.registerClass(TileMap,'TileMap');
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(data) {
        _super.call(this);
        this.data = data;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(data.image);
        //bitmap.scaleX = bitmap.scaleY =2;
        bitmap.width = 64;
        bitmap.height = 64;
        this.x = data.x * TileMap.TILE_SIZE;
        this.y = data.y * TileMap.TILE_SIZE;
        this.addChild(bitmap);
    }
    var d = __define,c=Tile,p=c.prototype;
    return Tile;
}(egret.DisplayObjectContainer));
egret.registerClass(Tile,'Tile');
