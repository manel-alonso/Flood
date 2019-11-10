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
    
    FloodOptions() {
        this._active = false;
        this._areaX = 0;
        this._areaY = 0;
    }
    
}