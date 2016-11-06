// TypeScript file

class Player extends egret.DisplayObjectContainer
{
    _people:egret.Bitmap;
    _ifWalk:boolean;
    _ifIdle:boolean;
    _stateMachine:StateMachine;
    _i:number = 0;

    public constructor()
    {
        super();
        this.iniit();
        
    }

    private iniit():void
    {
        this._people = new egret.Bitmap();
        var _texture:egret.Texture = RES.getRes("1_png");
        this._people.texture = _texture;
        this.addChild(this._people);
        this._stateMachine = new StateMachine();

        this._people.x=32;
        this._people.y=32;

        this._ifIdle = true;
        this._ifWalk = false;


    }

    public activate()
    {
        this._stateMachine.setState(new PlayerIdleState(this));
    }

    public move(targetX: number, targetY: number) 
    {
        egret.Tween.removeTweens(this._people);
        if (targetX > this._people.x) 
        {
            this._people.skewY = 180;
        }
        else { this._people.skewY = 0; }

        this._stateMachine.setState(new PlayerWalkState(this));

        //egret.Tween.get(this._people).to({ x: targetX, y: targetY }, 2000).call( function(){this.idle()} ,this);
    
    }

    public Walk()
    {
        var list = ["walk1_png", "walk2_png"];
        var count = -1;
        egret.Ticker.getInstance().register(() => {
            count = count + 0.2;
            if (count >= list.length) {
                count = 0;
            }
            this._people.texture = RES.getRes(list[Math.floor(count)]);
        }, this);
    }

    public Idle()
    {
        var IdleList = ["Idle1_png","Idle2_png"];
        var count = -1;
        egret.Ticker.getInstance().register(() => {
            count = count + 0.06;
            if (count >= IdleList.length) 
            {
                count = 0;
            }

            this._people.texture = RES.getRes(IdleList[Math.floor(count)]);

        }, this);
    }
}

interface State 
{
    onEnter();
    onExit();
}

class PlayerState implements State 
{

    _player:Player;

    constructor(player: Player) 
    {
        this._player = player;
    }

    onEnter() 
    {

    }

    onExit() 
    {

    }

}



class PlayerWalkState extends PlayerState 
{

    onEnter() 
    {
        this._player._ifWalk = true;
  
        this._player.Walk();
      
    }
    onExit() 
    {
        this._player._ifWalk = false;
    }


}

class PlayerIdleState extends PlayerState 
{

    onEnter() 
    {
       
         this._player._ifIdle = true;
         this._player.Idle();

    }
    onExit() 
    {
        this._player._ifIdle = false;
    }


}

class StateMachine 
{
    CurrentState: State;
    constructor()
    {

    }
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
    setState(e: State) 
    {

        if (this.CurrentState != null) 
        {
            this.CurrentState.onExit();
        }
        else
        {this.CurrentState = e;}
        e.onEnter();
    }

   

}
