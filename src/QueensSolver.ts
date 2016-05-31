/**
 * N-Queens puzzle solver.
 */
export class QueensSolver {
    /**
     * Solves a nxn queens puzzle.
     * @param {number} size - The size of the puzzle.
     */
    public solve(size: number): QueensSolution | undefined {
        let leftDiagonalState = new ValueFlagState(size);
        let rightDiagonalState = new ValueFlagState(size);
        let columnState = new ValueFlagState(size);
        
        let rowColumnValues: number[] = new Array(size);
        
        let rowColumnState: ValueFlagState[] = [];
        
        for(let i = 0; i < size; i++) {
            rowColumnState[i] = new ValueFlagState(size);
        }
        
        const complete = ((1 << size) >>> 0) - 1;
        
        main:
        for(let row = 0, columnValueFlags = 0; row >= 0; ) {
            for(let valueFlag = (columnValueFlags + 1) & ~columnValueFlags; 
                columnValueFlags !== complete;
                columnValueFlags |= valueFlag, valueFlag = (columnValueFlags + 1) & ~columnValueFlags) {
                
                // Get the diagonal value flags.
                let leftDiagonal = valueFlag << row;
                let rightDiagonal = valueFlag << (size - row - 1);
                
                // Check the diagonals.
                if((leftDiagonal | leftDiagonalState.current) === leftDiagonalState.current ||
                    (rightDiagonal | rightDiagonalState.current) === rightDiagonalState.current) {
                    
                    // Invalid.
                    continue;
                }
                
                rowColumnValues[row] = valueFlag;
                
                // Valid.
                if(columnState.push(valueFlag) === complete) {
                    return new QueensSolution(size, rowColumnValues);
                }
                
                leftDiagonalState.push(leftDiagonal);
                rightDiagonalState.push(rightDiagonal);
                
                rowColumnState[row].reset(columnValueFlags | valueFlag);
                
                columnValueFlags = columnState.current;
                
                row++;
                
                continue main;
            }

            columnState.pop();
            leftDiagonalState.pop();
            rightDiagonalState.pop();
            
            row--;
            
            columnValueFlags = rowColumnState[row].current;
        }
        
        return undefined;
    }
}

export class QueensSolution {
    private readonly _cells: Cell[];
    
    public get cells(): Cell[] {
        return this._cells.concat([]);
    }
    
    public constructor(size: number, state: number[]) {
        this._cells = new Array(size);

        for(let i = 0; i < size; i++) {
            let column = Math.log2(state[i]) + 1;
            let row = i + 1;
            
            this._cells[i] = new Cell(new Location(row, column), 1);
        }
    }
}

export class Location {
    private readonly _column: number;
    private readonly _row: number;
    
    public get row(): number {
        return this._row;
    }
    
    public get column(): number {
        return this._column;
    }
    
    public constructor(row: number, column: number) {
        this._row = row;
        this._column = column;
    }
}

export class Cell {
    private readonly _value: number;
    private readonly _location: Location;
    
    public get location(): Location {
        return this._location;
    }
    
    public get value(): number {
        return this._value;
    }
    
    public constructor(location: Location, value: number) {
        this._location = location;
        this._value = value;
    }
}

class ValueFlagState {
    private readonly _items: number[];
    private _itemsIndex: number = 0;
    
    public get current(): number {
        return this._items[this._itemsIndex];
    }
    
    public get items(): number[] {
        return this._items.concat([]);
    }
    
    public constructor(size: number) {
        this._items = new Array(size);
        this._items[0] = 0;
    }
    
    public push(valueFlag: number): number {
        const currentValueFlag = this._items[this._itemsIndex];
        
        return this._items[++this._itemsIndex] = currentValueFlag | valueFlag;
    }
    
    public pop(): number {
        return this._items[--this._itemsIndex];
    }
    
    public reset(value: number) {
        this._itemsIndex = 0;
        this._items[0] = value;
    }
}