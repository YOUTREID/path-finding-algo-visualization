export function heart(grid) {
    let path = [];
    let a = [grid[19][0], grid[19][1], grid[19][2], grid[19][3], grid[19][4], grid[19][5], grid[19][6], grid[19][7], grid[19][8], grid[19][9]];
    let b = [grid[19][10], grid[19][11], grid[19][12], grid[19][13], grid[19][14], grid[19][15], grid[19][16], grid[19][17], grid[19][18], grid[19][19]]
    let c = [grid[19][30], grid[19][31], grid[19][32], grid[19][33], grid[19][34], grid[19][35], grid[19][36], grid[19][37], grid[19][38], grid[19][39]];
    let d = [grid[19][40], grid[19][41], grid[19][42], grid[19][43], grid[19][44], grid[19][45], grid[19][46], grid[19][47], grid[19][48], grid[19][49]]
    let h = [grid[19][20], grid[19][21], grid[19][22], grid[19][23], grid[19][24], grid[18][23], grid[17][22], grid[16][21], grid[15][20], grid[14][19], grid[13][18], grid[12][17], grid[11][17], grid[10][17], grid[9][18], grid[8][19], grid[8][20], grid[8][21], grid[8][22], grid[9][23], grid[10][24], grid[9][25], grid[8][26], grid[8][27], grid[8][28], grid[8][29], grid[9][30], grid[10][31], grid[11][31], grid[12][31], grid[13][30], grid[14][29], grid[15][28], grid[16][27], grid[17][26], grid[18][25], grid[19][25], grid[19][26], grid[19][27], grid[19][28], grid[19][29],]
    path = path.concat(a);
    path = path.concat(b);
    path = path.concat(h);
    path = path.concat(c);
    path = path.concat(d);
    let inside = [grid[18][24], grid[17][23], grid[16][22], grid[15][21], grid[14][20], grid[13][19], grid[12][18], grid[11][18], grid[10][18], grid[10][19], grid[9][19], grid[9][20], grid[9][21], grid[9][22], grid[10][23], grid[11][24], grid[10][25], grid[9][26], grid[9][27], grid[9][28], grid[9][29], grid[10][30], grid[11][30], grid[12][30], grid[13][29], grid[14][28], grid[15][27], grid[16][26], grid[17][25], grid[17][24], grid[16][23], grid[15][22], grid[14][21], grid[13][20],grid[12][19],grid[11][19],grid[10][20],grid[10][21],grid[10][22],grid[11][23],grid[12][24],grid[11][25],grid[10][26],grid[10][27],grid[10][28],grid[10][29],grid[11][29],grid[12][29],grid[13][28],grid[14][27],grid[15][26],grid[16][25],grid[16][24],grid[15][23],grid[14][22],grid[13][21],grid[12][20],grid[11][20],grid[11][21],grid[11][22],grid[12][23],grid[13][24],grid[12][25],grid[11][26],grid[11][27],grid[11][28],grid[12][28],grid[13][27],grid[14][26],grid[15][25],grid[15][24],grid[14][23],grid[13][22],grid[12][21],grid[12][22],grid[13][23],grid[14][24],grid[13][25],grid[12][26],grid[12][27],grid[13][26],grid[14][25]]
    return [inside, path];
}