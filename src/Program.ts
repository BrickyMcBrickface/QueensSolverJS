import { QueensSolver } from './QueensSolver';

export class Program {
    public static main(size: number) {
        var solver = new QueensSolver();
        
        var sw = Stopwatch.startNew();
        var solution = solver.solve(size);
        sw.stop();
        
        if(solution === undefined) {
            console.log('No solution found for the ' + size + 'x' + size + 'puzzle!');
            return;
        }
        
        var cells = solution.cells;
        
        console.log('Solution found for the ' + size + 'x' + size + ' in ' + sw.elapsedMilliseconds + 'ms!');
        
        for(let cell of cells) {
            let line = '';
            
            // Print leading zeros.
            for(let i = 1; i < cell.location.column; i++) {
                line += '.';
            }
            
            line += 'Q';
            
            // Print following zeros.
            for(let i = cell.location.column; i < size; i++) {
                line += '.';
            }
            
            console.log(line);
        }
    }
}

class Stopwatch {
    private _startTime: number;
    private _endTime: number;
    private _running: boolean = false;
    
    public constructor() {
        
    }
    
    public get elapsedMilliseconds(): number {
        return this._endTime - this._startTime;
    }
    
    public start() {
        if(this._running) {
            return;
        }
        
        if(this._startTime > 0) {
            return;
        }
        
        this._startTime = Date.now();
        this._running = true;
    }
    
    public stop() {
        if(!this._running) {
            return;
        }
        
        this._endTime = Date.now();
        this._running = false;
    }
    
    public reset() {
        this._startTime = 0;
        this._endTime = 0;
        this._running = false;
    }
    
    public restart() {
        this._startTime = Date.now();
        this._endTime = 0;
        this._running = true;
    }
    
    public static startNew(): Stopwatch {
        let sw = new Stopwatch();
        
        sw.start();
        
        return sw;
    }
}