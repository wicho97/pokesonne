const ROAD = "road";
const CITY = "city";
const GRASS = "grass";
const NORTH = "north";

class Tile {
    //          n
    //          ^
    //          |
    // w <-   Tile   -> e
    //          |
    //          s
    constructor(west, east, north, south, image, name = '', turn = 0) {
        this.west = west;
        this.east = east;
        this.north = north;
        this.south = south;
        this.image = image;
        this.name = name;
        // Turn significa el numero de rotaciones de la loseta
        this.turn = turn;
    }

    // The rotation is to the right
    rotate() {
        const temp = this.west;

        let west = this.south;
        let south = this.east;
        let east = this.north;
        let north = temp;

        return new Tile(west, east, north, south, this.image, this.turn + 1);
    }


    toString() {
        return JSON.stringify({
            west: this.west,
            east: this.east,
            north: this.north,
            south: this.south
        });
    }

    printTile() {
       let template =`
                    ${this.north}
                    ^
                    |
        ${this.west} <-   Tile ${this.name}   -> ${this.east}
                    |
                    ${this.south}
        `;
        console.log(template);
    }

    printBoard(tile2) {
        let template =`
                    ${this.north}                                              ${tile2.north}        
                    ^                                                       ^                                                   
                    |                                                       |                                          
        ${this.west} <-   Tile ${this.name}   -> ${this.east}    ******                ${tile2.west} <-   Tile ${tile2.name}   -> ${tile2.east}                               
                    |                                                         |
                    ${this.south}                                               ${tile2.south}
        `;
        console.log(template);
    }
}

class Map {
    constructor() {
        this.graph = {}
    }

    add(tile, x, y) {
        let isValid = true;
        let position = `(${x}, ${y})`;
        // console.log(`insertando el title en la posicion ${position}`);

        // Tile inicial
        if (x == 0 && y == 0) {
            this.graph[position] = tile;
            return;
        }

        console.log(this.graph);

        let left = `(${x-1}, ${y})`;
        let right = `(${x+1}, ${y})`;
        let up = `(${x}, ${y + 1})`;
        let down = `(${x}, ${y - 1})`;

        let keys = Object.keys(this.graph);
        // console.log(keys);

        if (keys.includes(position)) {
            // console.log(`Ya existe un tile en esta posicion ${position}`);
            return false;
        }

        if (keys.includes(left) || keys.includes(right) || keys.includes(up) || keys.includes(down)) {
            if(keys.includes(left)){
                // console.log("existe a la izquierda");
    
                let neighbourTile = this.graph[left];
                // console.log(neighbourTile);
                // console.log(tile);
    
                if (tile.west == neighbourTile.east) {
                    // this.graph[position] = tile;
    
                    // console.log(`Agregando tile en la posicion ${position}`);
                } else {
                    isValid = false;
                    // console.log(`No se pudo agregar el tile en la posicion ${position}`);
                }
    
                // console.log(tile.south, neighbourTile.north);
            }
    
            if(keys.includes(right)){
                // console.log("**************************");
                // console.log("existe a la derecha");
    
                let neighbourTile = this.graph[right];
                // console.log("Vecino", neighbourTile);
                // console.log(neighbourTile.printTile())
                // console.log("Tile", tile);
                // console.log(tile.printBoard(neighbourTile))
    
                // console.log("Nuevo", tile.east);
                // console.log("Vecino", neighbourTile.west);
                if (tile.east == neighbourTile.west) {
                    // this.graph[position] = tile;
                    // console.log(`Agregando tile en la posicion ${position}`);
                } else {
                    isValid = false;
                    // console.log(`No se pudo agregar el tile en la posicion ${position}`);
                }
    
                // console.log(tile.south, neighbourTile.north);
                // console.log("**************************");
            }
    
            if(keys.includes(up)){
                // console.log("existe a la arriba");
    
                let neighbourTile = this.graph[up];
                // console.log("Vecino", neighbourTile);
                // console.log("Tile", tile);
    
                if (tile.north == neighbourTile.south) {
                    // this.graph[position] = tile;
                    // console.log(`Agregando tile en la posicion ${position}`);
                } else {
                    isValid = false;
                    // console.log(`No se pudo agregar el tile en la posicion ${position}`);
                }
    
                // console.log(tile.south, neighbourTile.north);
            }
    
            if(keys.includes(down)){
                // console.log("existe a la abajo");
                let neighbourTile = this.graph[down];
                // console.log(neighbourTile);
                // console.log(tile);
    
                if (tile.south == neighbourTile.north) {
                    // this.graph[position] = tile;
                    // console.log(`Agregando tile en la posicion ${position}`);
                } else {
                    isValid = false;
                    // console.log(`No se pudo agregar el tile en la posicion ${position}`);
                }
    
                // console.log(tile.south, neighbourTile.north);
            }
        
            if (isValid) {
                this.graph[position] = tile;
                return true;
            }
            
        }

        return false;
        
    }
}

const w0 = new Tile(ROAD, ROAD, CITY, GRASS, 'assets/img/loseta-0.jpeg', "w0");
// const k = new Tile(ROAD, GRASS, CITY, ROAD, null, "w0");
const w1 = new Tile(ROAD, ROAD, GRASS, GRASS, 'assets/img/loseta-1.jpeg', "w1");
const w2 = new Tile(ROAD, CITY, ROAD, CITY, 'assets/img/loseta-2.jpeg', "w2");
const w3 = new Tile(ROAD, ROAD, GRASS, ROAD, 'assets/img/loseta-3.jpeg', "w3");
const w4 = new Tile(CITY, ROAD, ROAD, CITY, 'assets/img/loseta-4.jpeg', "w4");
const w5 = new Tile(CITY, GRASS, CITY, GRASS, 'assets/img/loseta-5.jpeg', "w5");
const w6 = new Tile(ROAD, GRASS, GRASS, ROAD, 'assets/img/loseta-6.jpeg', "w6");

// console.log(k.toString());

// kRotated = k.rotate();
// console.log("Después de la rotación:");
// console.log(kRotated.toString());

map = new Map();
map.add(w0, 0,0);
// map.add(x, 0,1);
// map.add(x, 1,0);
// map.add(x, -1,0);
// map.add(x, -1,0);
// map.add(w1, 1,0);
// map.add(y, -1,0);
// map.add(y, 0,-1);
// map.add(y, 1,-1);
// map.add(w2, 0,1);
// map.add(w3, -1,0);
// map.add(w4, -2,0)
// map.add(w5, 1,1)
// map.add(w6, 1,-1)
// map.add(z, 1,1);
// map.add(z, 2,0);
// map.add(z, 1,-1);

// w0.printTile("d -> 0,0");
// w1.printTile("x -> 1,0");
// w2.printTile();
// w3.printTile("z -> -1,0");
// w4.printTile("z -> -2,0");
// w5.printTile();
// w6.printTile();


const tileDeck = [
    w4,
    w1,
    w2,
    w3,
    w4,
    w5,
    w6
];


const titleImg = document.getElementById("tile-img");
let tileIndex = 0;

titleImg.src = tileDeck[tileIndex].image;

const btnRotateTile = document.getElementById("rotate-tile");
const btnPlaceTile = document.getElementById('place-tile');

const gridContainer = document.getElementById("grid-container");

buildGrid(3);

let currentTilePositionX = null;
let currentTilePositionY = null;

let rotation = 0;

function rotateTile() {

    tileDeck[tileIndex] = tileDeck[tileIndex].rotate();

    rotation += 90;
    titleImg.style.transform = `rotate(${rotation}deg)`;
    titleImg.dataset.rotation = rotation;

    let gridItems = document.querySelectorAll(".grid-item:not(.block-item)");
    gridItems.forEach(element => {    
        element.style.backgroundColor = '#ccc';
        element.innerHTML = '';
    });

}

btnRotateTile.addEventListener(
    "click", function() {
    rotateTile();
});


btnPlaceTile.addEventListener(
    "click", function() {
    console.log("colocar");
    console.log(currentTilePositionX);
    console.log(currentTilePositionY);

    if (currentTilePositionX == null && currentTilePositionY == null) {
        alert("No hay posicion");
        return;
    }
    // console.log("===========Agregar Mapa==============");
    // console.log(map.add(tileDeck[tileIndex], parseInt(currentTilePositionX),parseInt(currentTilePositionY)))
    // console.log("===========Agregar Mapa=========");
    // tileDeck[tileIndex].printTile();
    // console.log(map.graph);

    let isValid = map.add(tileDeck[tileIndex], parseInt(currentTilePositionX),parseInt(currentTilePositionY));

    if (isValid) {
        const place = document.getElementById(`place_${currentTilePositionX}x${currentTilePositionY}y`);
        place.classList.add("block-item");
        tileIndex++;
        // console.log("Inidice:", tileIndex);
        // console.log("Deck length:", tileDeck.length);
    } else {
        console.log(tileDeck[tileIndex]);
        alert("No se puede poner la loseta en esta posicion");
    }

    // TODO: Quitar el boton cuando no haya mas losetas
    if (tileIndex < tileDeck.length) {
        titleImg.src = tileDeck[tileIndex].image;
    } else {
        alert("No hay mas loseta");
    }
    
});

function addClickEvents() {
    gridContainer.addEventListener("click", function(e) {

        let gridItems = document.querySelectorAll(".grid-item:not(.block-item)");

        if (e.target.classList.contains("grid-item")) {
            gridItems.forEach(element => {
                element.style.backgroundColor = '#ccc';
                element.innerHTML = '';
            })
    
            console.log(e.target);
            const img = document.createElement('img');
            img.src = titleImg.src;
            let rotation = titleImg.dataset.rotation;
            img.style.transform = `rotate(${rotation}deg)`;
            e.target.appendChild(img);
            console.log("Posicion x, y",e.target.dataset.x, e.target.dataset.y)
            currentTilePositionX = e.target.dataset.x;
            currentTilePositionY = e.target.dataset.y;
        }

    });
}

addClickEvents();

// size es impar y mayor que 3
function buildGrid(size) {
    let limit = Math.floor(size/2);
    let cords = [];

    for (let i = -limit; i <= limit; i++) {
        for (let j = limit; j >= -limit; j--) {
            cords.push([j,i]);
        }
    }

    cords = cords.reverse();

    cords.forEach(element => {
        const grid = document.createElement('div');
        grid.classList.add("grid-item");
        grid.dataset.x = element[0];
        grid.dataset.y = element[1];
        grid.setAttribute("id", `place_${element[0]}x${element[1]}y`);

        if (element[0] == 0 && element[1] == 0) {
            // <div class="grid-item block-item" id="place_0x0y" data-x="0" data-y="0"><img src="assets/img/loseta-0.jpeg" alt=""></div>
            grid.classList.add("block-item");
            const img = document.createElement('img');
            img.src = w0.image;
            grid.appendChild(img);
        }

        gridContainer.appendChild(grid);
    });


    // [-1,1], [0,1], [1,1],
    // [-1,0], [0,0], [1,0],
    // [-1,-1],[0,-1],[1,-1]
    

    // let total = height * width;
    // for (let i =0; i <= total; i++) {
    //     const grid = document.createElement('div');
    //     grid.classList.add("grid-item");
    // }
    // <div class="grid-item" id="place_-1x1y" data-x="-1" data-y="1"></div>
}

// console.log(gridItems);
