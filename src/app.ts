import { Program } from './Program'

// Test boards from 4x4 to 20x20 (not sure that it works at these sizes, but does not work on anything above a 20x20).
for(let i = 4; i < 21; i++) {
    Program.main(i);
}

console.log('complete');