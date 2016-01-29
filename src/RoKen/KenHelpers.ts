namespace PBDesk.RoKenApp.KenKen {

    export class KenHelpers {

        static getRnd(min, max): number {
            //min (included) and max (excluded)
            return Math.floor(Math.random() * (max - min)) + min;
        }

        static removeItemFromArrayByValue(arr : Array<number>, ...items: any[]) : Array<number> {
            var what, a = items, L = a.length, ax;
            while (L > 1 && arr.length) {
                 what = a[--L];
                while ((ax = arr.indexOf(what)) !== -1) {
                    arr.splice(ax, 1);
                }
            }
            return arr;
        }
        
        static shuffleArr(arr : Array<number>) : Array<number> {
            if (!Array.isArray(arr)) {
                throw new TypeError("Expected an array");
            }

            var result = arr.slice();
            var len  = arr.length;
            var rnd, tmp;
            while (len) {
                rnd = Math.floor(Math.random() * len--);
                tmp = result[len];
                result[len] = result[rnd];
                result[rnd] = tmp;
            }
            return result;
        }
        
        static mergeAndRemoveDuplicatesFromArr(a: Array<number>, b: Array<number>): Array<number> {
            var c = a.concat(b);
            var d = c.filter(function (item, pos) {return c.indexOf(item) === pos; });
            return d;
        }
        
        static isValidSize(n: number): boolean {
            return (typeof n === "number") && (n % 1 === 0) && n >= 3 && n <= 9 ;
        }
        
        static isValidCellValue(val: number, boardSize: number): boolean {
            return (typeof val === "number") && (val % 1 === 0) && val > 0 && val <= boardSize ;
        }
        
        static isValidPosition(n: number, boardSize: number): boolean {
            return (typeof n === "number") && (n % 1 === 0) && n > 0 && n <=  boardSize * boardSize ;
        }
        
        static arePositionsAdjacent(p1: number, p2: number, boardSize: number): boolean {
            if (p1 === p2 + 1 || p2 === p1 + 1) {
                return true;
            }
            if (p1 === p2 + boardSize || p2 === p1 + boardSize) {
                return true;
            }
            return false;
        }
        
        static areAllPositionsAdjacent(boardSize: number, positions: number[]): boolean {
            for (var i = 0; i < positions.length - 1; i++) {
                var are2PosAdj = this.arePositionsAdjacent(positions[i], positions[i + 1], boardSize);
                if (are2PosAdj === false) {
                    return false;
                }
            }
            return true;
        }
        
        static isCornerPosition(position: number, boardSize: number): string {
            if (position === 1) {
                return "t,l";
            }
            else if (position === boardSize) {
                return "t,r";
            }
            else if (position === boardSize * boardSize - boardSize + 1) {
                return "b,l";
            }
            else if (position === boardSize * boardSize) {
                return "b,r";
            }
            else {
                return "";
            }
        }
        
        static isBorderPosition(position: number, boardSize: number) {
            var isCorner = this.isCornerPosition(position, boardSize);
            if (isCorner !== "") {
                return isCorner;
            }
            else {
                if (position <= boardSize) {
                    return "t";
                }
                else if (position % boardSize === 0) {
                    return "r";
                }
                else if (position >= boardSize * boardSize - boardSize + 1) {
                    return "b";
                }
                else if ((position - 1) % boardSize === 0) {
                    return "l";
                }
                else {
                    return "";
                }
            }
        }
        
        static getAdjacentPositions(position: number, boardSize: number): number[] {
            var positions = [position - boardSize, position + 1, position + boardSize, position - 1];
            var corner = this.isCornerPosition(position, boardSize);
            if (corner !== "") {
                switch (corner) {
                    case "t,l": positions[0] = 0; positions[3] = 0; break;
                    case "t,r": positions[0] = 0; positions[1] = 0; break;
                    case "b,l": positions[2] = 0; positions[3] = 0; break;
                    case "b,r": positions[1] = 0; positions[2] = 0; break;
                }
            }
            else {
                var border = this.isBorderPosition(position, boardSize);
                if (border !== "") {
                    switch (border) {
                        case "t": positions[0] = 0; break;
                        case "r": positions[1] = 0; break;
                        case "b": positions[2] = 0; break;
                        case "l": positions[3] = 0; break;
                    }
                }
            }
            return positions;

        }
        

    }
}
