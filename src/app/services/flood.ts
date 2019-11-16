import { SolidBlock } from './solidBlock';

export class FloodOptions {
    
    private _areaX : number;
    public get areaX() : number {
        return this._areaX;
    }
    public set areaX(v : number) {
        this._areaX = v;
    }
    
    private _areaY : number;
    public get areaY() : number {
        return this._areaY;
    }
    public set areaY(v : number) {
        this._areaY = v;
    }
    
    private _area : number[][];
    public get area() : number[][] {
        return this._area;
    }
    public set area(v : number[][]) {
        this._area = v;
    }
    
    private _active : boolean;
    public get active() : boolean {
        return this._active;
    }
    public set active(v : boolean) {
        this._active = v;
    }
    
    private _solidColumns : SolidBlock[];
    public get solidColumns() : SolidBlock[] {
        return this._solidColumns;
    }
    public set solidColumns(v : SolidBlock[]) {
        this._solidColumns = v;
    }
    
    private _speed : number;
    public get speed() : number {
        return this._speed;
    }
    public set speed(v : number) {
        this._speed = v;
    }
    
    
    FloodOptions() {
        this._active = false;
        this._areaX = 0;
        this._areaY = 0;
        this._solidColumns = [];
        this._speed = 300;
    }
    
}