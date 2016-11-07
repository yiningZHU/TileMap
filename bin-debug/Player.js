// TypeScript file
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        _super.call(this);
        this._i = 0;
        this.iniit();
    }
    var d = __define,c=Player,p=c.prototype;
    p.iniit = function () {
        this._people = new egret.Bitmap();
        var _texture = RES.getRes("1_png");
        this._people.texture = _texture;
        this.addChild(this._people);
        this._stateMachine = new StateMachine();
        this._people.x = 0;
        this._people.y = 0;
        this._ifIdle = true;
        this._ifWalk = false;
    };
    p.activate = function () {
        this._stateMachine.setState(new PlayerIdleState(this));
    };
    p.move = function (targetX, targetY) {
        egret.Tween.removeTweens(this._people);
        if (targetX > this._people.x) {
            this._people.skewY = 180;
        }
        else {
            this._people.skewY = 0;
        }
        this._stateMachine.setState(new PlayerWalkState(this));
        //egret.Tween.get(this._people).to({ x: targetX, y: targetY }, 2000).call( function(){this.idle()} ,this);
    };
    p.Walk = function () {
        var _this = this;
        var list = ["walk1_png", "walk2_png"];
        var count = -1;
        egret.Ticker.getInstance().register(function () {
            count = count + 0.2;
            if (count >= list.length) {
                count = 0;
            }
            _this._people.texture = RES.getRes(list[Math.floor(count)]);
        }, this);
    };
    p.Idle = function () {
        var _this = this;
        var IdleList = ["Idle1_png", "Idle2_png"];
        var count = -1;
        egret.Ticker.getInstance().register(function () {
            count = count + 0.06;
            if (count >= IdleList.length) {
                count = 0;
            }
            _this._people.texture = RES.getRes(IdleList[Math.floor(count)]);
        }, this);
    };
    return Player;
}(egret.DisplayObjectContainer));
egret.registerClass(Player,'Player');
var PlayerState = (function () {
    function PlayerState(player) {
        this._player = player;
    }
    var d = __define,c=PlayerState,p=c.prototype;
    p.onEnter = function () {
    };
    p.onExit = function () {
    };
    return PlayerState;
}());
egret.registerClass(PlayerState,'PlayerState',["State"]);
var PlayerWalkState = (function (_super) {
    __extends(PlayerWalkState, _super);
    function PlayerWalkState() {
        _super.apply(this, arguments);
    }
    var d = __define,c=PlayerWalkState,p=c.prototype;
    p.onEnter = function () {
        this._player._ifWalk = true;
        this._player.Walk();
    };
    p.onExit = function () {
        this._player._ifWalk = false;
    };
    return PlayerWalkState;
}(PlayerState));
egret.registerClass(PlayerWalkState,'PlayerWalkState');
var PlayerIdleState = (function (_super) {
    __extends(PlayerIdleState, _super);
    function PlayerIdleState() {
        _super.apply(this, arguments);
    }
    var d = __define,c=PlayerIdleState,p=c.prototype;
    p.onEnter = function () {
        this._player._ifIdle = true;
        this._player.Idle();
    };
    p.onExit = function () {
        this._player._ifIdle = false;
    };
    return PlayerIdleState;
}(PlayerState));
egret.registerClass(PlayerIdleState,'PlayerIdleState');
var StateMachine = (function () {
    function StateMachine() {
    }
    var d = __define,c=StateMachine,p=c.prototype;
    /*
        onRun()
        {
            this.CurrentState.onEnter;
        }
    
        onCheck(e: State)
        {
            if (this.CurrentState == e)
            {
                this.CurrentState = this.CurrentState;
            }
    
            else
            {
                this.CurrentState.onExit;
                this.CurrentState = e;
                //return e;
            }
            
        }*/
    p.setState = function (e) {
        if (this.CurrentState != null) {
            this.CurrentState.onExit();
        }
        else {
            this.CurrentState = e;
        }
        e.onEnter();
    };
    return StateMachine;
}());
egret.registerClass(StateMachine,'StateMachine');
//# sourceMappingURL=Player.js.map