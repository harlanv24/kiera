let grid = [['/', '/', '/', 'A', 'D', 'C', '/', '/', '/'],
            ['/', '/', 'K', 'I', 'E', 'R', 'A', '/', '/'],
            ['B', 'O', 'O', '#', 'M', 'I', 'M', 'I', 'C'],
            ['/', 'W', 'O', 'M', 'E', 'N', '/', '/', '/'],
            ['/', '/', 'K', 'I', 'N', 'G', '/', '/', '/'],
            ['B', 'L', 'I', 'S', 'T', 'E', 'R', '/', '/'],
            ['/', 'Y', 'E', 'T', 'I', '/', '/', '/', '/'],
            ['/', '/', '/', '/', 'A', '/', '/', '/', '/'],
        ]

let clue_grid = [['/', '/', '/', '1', '12', '/', '/', '/', '/'],
                ['/', '/', '2', '/', '/', '/', '13', '/', '/'],
                ['3', '9', '/', '/', '4', '/', '/', '/', '/'],
                ['/', '5', '/', '11', '/', '/', '/', '/', '/'],
                ['/', '/', '6', '/', '/', '/', '/', '/', '/'],
                ['7', '10', '/', '/', '/', '/', '/', '/', '/'],
                ['/', '8', '/', '/', '/', '/', '/', '/', '/'],
                ['/', '/', '/', '/', '/', '/', '/', '/', '/'],
        ]

var horizontal = true
var gameOver = false
var height = grid.length
var width = grid[0].length
var row = 0
var col = 0

window.onload = function(){
    initialize();
}

function initialize() {
    for(let c = 0; c < width; c++) {
        if(grid[row][c] != '/' && grid[row][c] != '#') {
            col = c;
            break
        }
    }
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            if(grid[r][c] == '/') {
                tile.classList.add("blank-tile");
            }
            else if(grid[r][c] == '#') {
                tile.classList.add("black-tile");
            }
            else {
                tile.classList.add("tile");
                tile.addEventListener("dblclick", function() {
                    // Code to be executed on double-click
                    unhighlight()
                    horizontal = !horizontal
                    let arr = tile.id.split("-")
                    if(horizontal) {
                        row = parseInt(arr[0])
                        col = findFirstEmptyChar(row)
                    }
                    else {
                        col = parseInt(arr[1])
                        row = findFirstEmptyChar(col)
                    }
                    highlight()
                });
                tile.addEventListener("click", function() {
                    // Code to be executed on double-click
                    unhighlight()
                    let arr = tile.id.split("-")
                    row = parseInt(arr[0])
                    col = parseInt(arr[1])
                    highlight()
                    console.log(row.toString() + '-' + col.toString())
                });
            }
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
    document.addEventListener("keyup", (e) => {
        processInput(e);
    })
    highlight()
    addClues()
}

function addClues() {
    for(let r = 0; r < height; r++) {
        for(let c = 0; c < width; c++) {
            if(clue_grid[r][c] != "/") {
                var childElement = document.createElement('span');
                childElement.classList.add("clue");
                childElement.innerText = clue_grid[r][c];
                document.getElementById(r.toString() + "-" + c.toString()).appendChild(childElement);
            }
        }
    }
}

function processInput(e) {
    // alert(e.code);
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
        if(horizontal) {
            if (col <= findLastValid(row)) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if(currTile.className == 'highlighted') {
                    var newText = document.createTextNode(e.code[3]);
                    if(currTile.childNodes.length == 0) {
                        currTile.appendChild(newText);
                    }
                    else {
                        var childNode = currTile.childNodes[0];
                        if (childNode.nodeType === 1 && childNode.classList.contains('clue')) {
                            if(currTile.childNodes.length == 1) {
                                currTile.appendChild(newText);
                            }
                            else if(currTile.childNodes.length == 2) {
                                currTile.replaceChild(newText, currTile.childNodes[1]);
                            }
                        }
                        else {
                            currTile.replaceChild(newText, currTile.childNodes[0]);
                        }
                    }
                    if (row < height - 1) {
                        if(col == findLastValid(row)) {
                            unhighlight()
                            row += 1
                            col = findFirstEmptyChar(row)
                            highlight()
                        }
                        else {
                            col += 1
                        }
                    }
                }
                while(document.getElementById(row.toString() + '-' + col.toString()).className != 'highlighted' || document.getElementById(row.toString() + '-' + col.toString().innerText != "")) {
                    if(row < height - 1) {
                        if(col == findLastValid(row)) {
                            unhighlight()
                            row += 1
                            col = findFirstEmptyChar(row)
                            highlight()
                        } else if(col < width - 1) {
                            col += 1
                        }
                    }
                    else {
                        break
                    }
                }
            }
        }
        else {
            if (row <= findLastValid(col)) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if(currTile.className == 'highlighted') {
                    var newText = document.createTextNode(e.code[3]);
                    if(currTile.childNodes.length == 0) {
                        currTile.appendChild(newText);
                    }
                    else {
                        var childNode = currTile.childNodes[0];
                        if (childNode.nodeType === 1 && childNode.classList.contains('clue')) {
                            if(currTile.childNodes.length == 1) {
                                currTile.appendChild(newText);
                            }
                            else if(currTile.childNodes.length == 2) {
                                currTile.replaceChild(newText, currTile.childNodes[1]);
                            }
                        }
                        else {
                            currTile.replaceChild(newText, currTile.childNodes[0]);
                        }
                    }
                    if (col < width - 1) {
                        if(row == findLastValid(col)) {
                            unhighlight()
                            col += 1
                            row = findFirstEmptyChar(col)
                            highlight()
                        }
                        else {
                            row += 1
                        }
                    }
                }
                while(document.getElementById(row.toString() + '-' + col.toString()).className != 'highlighted' || document.getElementById(row.toString() + '-' + col.toString().innerText != "")) {
                    if(col < width - 1) {
                        if(row == findLastValid(col)) {
                            unhighlight()
                            col += 1
                            row = findFirstEmptyChar(col)
                            highlight()
                        } else if(row < height - 1) {
                            row += 1
                        }
                    }
                    else {
                        break
                    }
                }
            }
        }
    }
    else if (e.code == "Backspace") {
        if(horizontal) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if(currTile.innerText == "" || currTile.childNodes[0].nodeType === 1 && currTile.childNodes[0].classList.contains('clue')) {
                if(col == findFirstChar(row)) {
                    if(row > 0) {
                        unhighlight()
                        row -= 1
                        col = findLastEmptyChar(row)
                        highlight()
                    }
                }
                else {
                    col -= 1
                }
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                var newText = document.createTextNode("");
                if(currTile.childNodes.length > 0) {
                    var childNode = currTile.childNodes[0];
                    if (childNode.nodeType === 1 && childNode.classList.contains('clue')) {
                        if(currTile.childNodes.length == 2) {
                            currTile.removeChild(currTile.childNodes[1]);
                        }
                    }
                    else {
                        currTile.replaceChild(newText, currTile.childNodes[0]);
                    }
                }
            }
            else {
                currTile.innerText = ""
            }
        }
        else {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if(currTile.innerText == "" || currTile.childNodes[0].nodeType === 1 && currTile.childNodes[0].classList.contains('clue')) {
                if(row == findFirstChar(col)) {
                    if(col > 0) {
                        unhighlight()
                        col -= 1
                        row = findLastEmptyChar(col)
                        highlight()
                    }
                }
                else {
                    row -= 1
                }
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                var newText = document.createTextNode("");
                if(currTile.childNodes.length > 0) {
                    var childNode = currTile.childNodes[0];
                    if (childNode.nodeType === 1 && childNode.classList.contains('clue')) {
                        if(currTile.childNodes.length == 2) {
                            currTile.removeChild(currTile.childNodes[1]);
                        }
                    }
                    else {
                        currTile.replaceChild(newText, currTile.childNodes[0]);
                    }
                }
            }
            else {
                currTile.innerText = ""
            }
        }
    }

    else if (e.code == "Enter") {
        unhighlight()
        if(horizontal) {
            if (row < height - 1) {
                row += 1;
            }
            col = findFirstChar(row)
        }
        else {
            if (col < height - 1) {
                col += 1;
            }
            row = findFirstChar(col)
        }
        highlight()
    }
}

function highlight() {
    if(horizontal) {
        for(c = 0; c < width; c++) {
            let currTile = document.getElementById(row.toString() + '-' + c.toString())
            if(currTile.className == 'tile') {
                currTile.className = 'highlighted'
            }
        }
    }
    else {
        for(r = 0; r < height; r++) {
            let currTile = document.getElementById(r.toString() + '-' + col.toString())
            if(currTile.className == 'tile') {
                currTile.className = 'highlighted'
            }
        }
    }
}

function unhighlight() {
    if(horizontal) {
        for(c = 0; c < width; c++) {
            let currTile = document.getElementById(row.toString() + '-' + c.toString())
            if(currTile.className == 'highlighted') {
                currTile.className = 'tile'
            }
        }
    }
    else {
        for(r = 0; r < height; r++) {
            let currTile = document.getElementById(r.toString() + '-' + col.toString())
            if(currTile.className == 'highlighted') {
                currTile.className = 'tile'
            }
        }
    }
}

function checkCondition() {
    // Your condition to check
    var correct = true
    for(r = 0; r < height; r++) {
        for(c = 0; c < width; c++) {
            if(grid[r][c] != '/' && grid[r][c] != '#') {
                if(grid[r][c] != document.getElementById(r.toString() + '-' + c.toString()).innerText) {
                    correct = false
                    break
                }
            }
        }
    }
    // Display messages based on the condition
    if (correct) {
        document.getElementById("answer").innerText = "Solution is correct!";
    } else {
        document.getElementById("answer").innerText = "Solution is wrong!";
    }
}

function findFirstChar(row) {
    if(horizontal) {
        for(let c = 0; c < width; c++) {
            if(grid[row][c] != '/' && grid[row][c] != '#' && document.getElementById(row.toString() + '-' + c.toString()).innerText != "") {
                return c
            }
        }
        for(let c = 0; c < width; c++) {
            if(grid[row][c] != '/' && grid[row][c] != '#') {
                return c
            }
        }
    } else {
        for(let r = 0; r < height; r++) {
            if(grid[r][col] != '/' && grid[r][col] != '#' && document.getElementById(r.toString() + '-' + col.toString()).innerText != "") {
                return r
            }
        }
        for(let r = 0; r < height; r++) {
            if(grid[r][col] != '/' && grid[r][col] != '#') {
                return r
            }
        }

    }
}

function findLastChar(row) {
    if(horizontal) {
        for(let c = width - 1; c >= 0; c--) {
            if(grid[row][c] != '/' && grid[row][c] != '#' && document.getElementById(row.toString() + '-' + c.toString()).innerText != "") {
                return c
            }
        }
        for(let c = width - 1; c >= 0; c--) {
            if(grid[row][c] != '/' && grid[row][c] != '#') {
                return c
            }
        }
    } else {
        for(let r = height - 1; r >= 0; r--) {
            if(grid[r][col] != '/' && grid[r][col] != '#' && document.getElementById(r.toString() + '-' + col.toString()).innerText != "") {
                return r
            }
        }
        for(let r = height - 1; r >= 0; r--) {
            if(grid[r][col] != '/' && grid[r][col] != '#') {
                return r
            }
        }
    }
}

function findLastValid(row) {
    if(horizontal) {
        for(let c = width - 1; c >= 0; c--) {
            if(grid[row][c] != '/' && grid[row][c] != '#') {
                return c
            }
        }
    }
    else {
        for(let r = height - 1; r >= 0; r--) {
            if(grid[r][col] != '/' && grid[r][col] != '#') {
                return r
            }
        }
    }
}

function findFirstEmptyChar(row) {
    if(horizontal) {
        for(let c = 0; c < width; c++) {
            var currTile = document.getElementById(row.toString() + '-' + c.toString())
            if(grid[row][c] != '/' && grid[row][c] != '#') {
                if(currTile.childNodes.length == 0 || (currTile.childNodes.length == 1 && currTile.childNodes[0].nodeType === 1 && currTile.childNodes[0].classList.contains('clue'))) {
                    return c
                }
            }
        }
        return findLastValid(row)
    }
    else {
        for(let r = 0; r < height; r++) {
            var currTile = document.getElementById(r.toString() + '-' + col.toString())
            if(grid[r][col] != '/' && grid[r][col] != '#') {
                if(currTile.childNodes.length === 0 || (currTile.childNodes.length === 1 && currTile.childNodes[0].nodeType === 1 && currTile.childNodes[0].classList.contains('clue'))) {
                    return r
                }
            }
        }
        return findLastValid(row)
    }
}

function findLastEmptyChar(row) {
    if(horizontal) {
        for(let c = 0; c < width; c++) {
            var returnVar = findLastValid(row)
            var currTile = document.getElementById(row.toString() + '-' + c.toString())
            if(grid[row][c] != '/' && grid[row][c] != '#') {
                if(currTile.childNodes.length == 0 || (currTile.childNodes.length == 1 && currTile.childNodes[0].nodeType === 1 && currTile.childNodes[0].classList.contains('clue'))) {
                    returnVar = c
                }
            }
        }
        return returnVar
    }
    else {
        for(let r = 0; r < height; r++) {
            var returnVar = findLastValid(row)
            var currTile = document.getElementById(r.toString() + '-' + col.toString())
            if(grid[r][col] != '/' && grid[r][col] != '#') {
                if(currTile.childNodes.length === 0 || (currTile.childNodes.length === 1 && currTile.childNodes[0].nodeType === 1 && currTile.childNodes[0].classList.contains('clue'))) {
                    returnVar = r
                }
            }
        }
        return returnVar
    }
}