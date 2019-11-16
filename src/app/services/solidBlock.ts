export class SolidBlock {
    
    private _row : number;
    public get row() : number {
        return this._row;
    }
    public set row(v : number) {
        this._row = v;
    }
    
    private _col : number;
    public get col() : number {
        return this._col;
    }
    public set col(v : number) {
        this._col = v;
    }
    
    private _value : number;
    public get value() : number {
        return this._value;
    }
    public set value(v : number) {
        this._value = v;
    }
    
    constructor(row: number, col: number, value: number) {
        this._row = row;
        this._col = col;
        this._value = value;
    }

}
