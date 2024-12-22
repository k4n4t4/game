const char_coord = {
  "A": [ 0, 0],
  "B": [ 1, 0],
  "C": [ 2, 0],
  "D": [ 3, 0],
  "E": [ 4, 0],
  "F": [ 5, 0],
  "G": [ 6, 0],
  "H": [ 7, 0],
  "I": [ 8, 0],
  "J": [ 9, 0],
  "K": [10, 0],
  "L": [11, 0],
  "M": [12, 0],
  "N": [13, 0],
  "O": [14, 0],
  "P": [15, 0],
  "Q": [16, 0],
  "R": [17, 0],
  "S": [18, 0],
  "T": [19, 0],
  "U": [20, 0],
  "V": [21, 0],
  "W": [22, 0],
  "X": [23, 0],
  "Y": [24, 0],
  "Z": [25, 0],
  "+": [26, 0],
  "-": [27, 0],
  "^": [30, 0],
  "=": [31, 0],

  "a": [ 0, 1],
  "b": [ 1, 1],
  "c": [ 2, 1],
  "d": [ 3, 1],
  "e": [ 4, 1],
  "f": [ 5, 1],
  "g": [ 6, 1],
  "h": [ 7, 1],
  "i": [ 8, 1],
  "j": [ 9, 1],
  "k": [10, 1],
  "l": [11, 1],
  "m": [12, 1],
  "n": [13, 1],
  "o": [14, 1],
  "p": [15, 1],
  "q": [16, 1],
  "r": [17, 1],
  "s": [18, 1],
  "t": [19, 1],
  "u": [20, 1],
  "v": [21, 1],
  "w": [22, 1],
  "x": [23, 1],
  "y": [24, 1],
  "z": [25, 1],
  "*": [26, 1],
  "!": [27, 1],
  "?": [28, 1],
  "~": [29, 1],
  "@": [30, 1],
  "%": [31, 1],

  "0": [ 0, 2],
  "1": [ 1, 2],
  "2": [ 2, 2],
  "3": [ 3, 2],
  "4": [ 4, 2],
  "5": [ 5, 2],
  "6": [ 6, 2],
  "7": [ 7, 2],
  "8": [ 8, 2],
  "9": [ 9, 2],
  "/": [10, 2],
 "\\": [11, 2],
  "'": [12, 2],
 "\"": [13, 2],
  "`": [14, 2],
  "$": [15, 2],
  "#": [16, 2],
  ":": [17, 2],
  ";": [18, 2],
  "&": [19, 2],
  "|": [20, 2],
  "_": [21, 2],
  ".": [22, 2],
  ",": [23, 2],
  "(": [24, 2],
  ")": [25, 2],
  "[": [26, 2],
  "]": [27, 2],
  "{": [28, 2],
  "}": [29, 2],
  "<": [30, 2],
  ">": [31, 2],
};

const char_coord_alt = {
  "x": [28, 0],
  "/": [29, 0],
};

const char_coord_border = {
  "0": [0, 3],
  "1": [1, 3],
  "2": [2, 3],
  "3": [0, 4],
  "5": [2, 4],
  "6": [0, 5],
  "7": [1, 5],
  "8": [2, 5],
};

const char_coord_line = {
  "0": [3, 3],
  "1": [4, 3],
  "2": [5, 3],
  "3": [3, 4],
  "4": [4, 4],
  "5": [5, 4],
};

const char_coord_black = {
  "0": [1, 4],
  "1": [6, 3],
  "2": [7, 3],
  "3": [8, 3],
  "4": [9, 3],
  "5": [6, 3],
  "6": [7, 3],
  "7": [8, 3],
  "8": [9, 3],
};

const char_coord_arrow = {
  "0": [11, 3],
  "1": [10, 3],
  "2": [11, 4],
  "3": [10, 4],
};

const char_coord_figure = {
  "0": [13, 3],
  "1": [12, 3],
  "2": [13, 4],
  "3": [12, 4],
  "4": [16, 3],
  "5": [15, 3],
  "6": [16, 4],
  "7": [15, 4],
  "8": [14, 3],
  "9": [14, 4],
};

export function getCoord(char) {
  return char_coord[char];
}

export function getCoordAlt(char) {
  return char_coord_alt[char];
}

export function getCoordBorder(char) {
  return char_coord_border[char];
}

export function getCoordArrow(char) {
  return char_coord_arrow[char];
}

export function getCoordLine(char) {
  return char_coord_line[char];
}

export function getCoordBlack(char) {
  return char_coord_black[char];
}

export function getCoordFigure(char) {
  return char_coord_figure[char];
}

export function convertString(str) {
  const coord_list = [];
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case " ": coord_list.push([0xff, 0xfe]); break;
      case "\n": coord_list.push([0xff, 0xfd]); break;
      default:
        const coord = getCoord(str[i]);
        if (coord) {
          coord_list.push(coord);
        } else {
          coord_list.push([0xff, 0xff]);
        }
        break;
    }
  }
  return coord_list;
}

export function drawText(ctx, img, str, x=0, y=0, size=8) {
  const coords = convertString(str);
  let col = 0;
  let line = 0;
  for (const coord of coords) {
    if (coord[0] == 0xff) {
      switch (coord[1]) {
        case 0xfe:
          col++;
          break;
        case 0xfd:
          col = 0;
          line++;
          break;
      }
    } else {
      ctx.drawImage(img, coord[0] * size, coord[1] * size, size, size, x + col * size, y + line * size, size, size);
      col++;
    }
  }
}
