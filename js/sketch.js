class FireSimulation {
    constructor(width, height) {
        this.tileSize = [10, 18];
        this.dimensions = [width, height];
        this.field = new Array(width).fill().map(() => new Array(height).fill(0));
        
        this.palette = [
            [0, 0, 0], [0, 4, 4], [0, 16, 20], [0, 28, 36],
            [0, 32, 44], [0, 36, 48], [60, 24, 32], [100, 16, 16],
            [132, 12, 12], [160, 8, 8], [192, 8, 8], [220, 4, 4],
            [252, 0, 0], [252, 0, 0], [252, 12, 0], [252, 28, 0],
            [252, 40, 0], [252, 52, 0], [252, 64, 0], [252, 80, 0],
            [252, 92, 0], [252, 104, 0], [252, 116, 0], [252, 132, 0],
            [252, 144, 0], [252, 156, 0], [252, 156, 0], [252, 160, 0],
            [252, 160, 0], [252, 164, 0], [252, 168, 0], [252, 168, 0],
            [252, 172, 0], [252, 176, 0], [252, 176, 0], [252, 180, 0],
            [252, 180, 0], [252, 184, 0], [252, 188, 0], [252, 188, 0],
            [252, 192, 0], [252, 196, 0], [252, 196, 0], [252, 200, 0],
            [252, 204, 0], [252, 204, 0], [252, 208, 0], [252, 212, 0],
            [252, 212, 0], [252, 216, 0], [252, 220, 0], [252, 220, 0],
            [252, 224, 0], [252, 228, 0], [252, 228, 0], [252, 232, 0],
            [252, 232, 0], [252, 236, 0], [252, 240, 0], [252, 240, 0],
            [252, 244, 0], [252, 248, 0], [252, 248, 0], [252, 252, 0]
        ];

        for (let i = 0; i < 192; i++) {
            this.palette.push([255, 255, 255]);
        }
    }

    render() {
        const [w, h] = this.dimensions;
        const [dw, dh] = this.tileSize;
        
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                const color = this.palette[this.field[x][y]];
                fill(color[0], color[1], color[2]);
                rect(x * dw, y * dh, (x + 1) * dw, (y + 1) * dh);
            }
        }
    }

    generateFlames() {
        const [w, h] = this.dimensions;
        
        for (let x = 1; x < w - 1; x++) {
            if (Math.floor(random(0, 32))){
                if (this.field[x][h - 1] < 14){
                    this.field[x][h - 1] = 14;
                }
            } else {
                this.field[x][h - 1] = 128 + Math.floor(random(0, 128));
            }
        }
    }

    verticalBlur() {
        const [w, h] = this.dimensions;
        const tempField = new Array(w).fill().map(() => new Array(h).fill(0));
        
        for (let x = 0; x < w; x++) {
            for (let y = 1; y < h - 1; y++) {
                tempField[x][y] = Math.floor((
                    this.field[x][y - 1] + 
                    this.field[x][y] + 
                    this.field[x][y + 1]
                ) / 3);
            }

            tempField[x][0] = Math.floor((this.field[x][0] * 2 + this.field[x][1]) / 3);

            tempField[x][h - 1] = Math.floor((this.field[x][h - 2] + 2 * this.field[x][h - 1]) / 3);
        }
        
        this.field = tempField;
    }

    horizontalBlur() {
        const [w, h] = this.dimensions;
        const tempField = new Array(w).fill().map(() => new Array(h).fill(0));
        
        for (let y = 0; y < h; y++) {
            for (let x = 1; x < w - 1; x++) {
                tempField[x][y] = Math.floor((
                    this.field[x - 1][y] + 
                    this.field[x][y] + 
                    this.field[x + 1][y]
                ) / 3);
            }

            tempField[0][y] = Math.floor((2 * this.field[0][y] + this.field[1][y]) / 3);

            tempField[w - 1][y] = Math.floor((this.field[w - 2][y] + 2 * this.field[w - 1][y]) / 3);
        }
        
        this.field = tempField;
    }

    shiftField() {
        const [w, h] = this.dimensions;
        
        for (let y = 0; y < h - 1; y++) {
            for (let x = 0; x < w; x++) {
                this.field[x][y] = this.field[x][y + 1];
            }
        }
        
        for (let x = 0; x < w; x++) {
            this.field[x][h - 1] = 0;
        }
    }
}

let fireSim;

function setup() {
    const width = 140;
    const height = 40;
    const tileWidth = 10;
    const tileHeight = 18;
    
    createCanvas(width * tileWidth, height * tileHeight);
    rectMode(CORNERS);
    noStroke();
    background(0);
    
    fireSim = new FireSimulation(width, height);
}

function draw() {
    background(0);
    
    fireSim.shiftField();
    fireSim.generateFlames();
    fireSim.verticalBlur();
    fireSim.horizontalBlur();
    fireSim.render();
}