namespace PBDesk.RoKenApp.KenKen {

    export class LatinSquare {
        
        public static generate(size: number) : number[][] {
            if (KenHelpers.isValidSize(size)) {
                return this.generateLatinSquare(size);
            }
            else {
                throw new TypeError("Invalid Size");
            }
        }
        
        public static validate(lsquare: number[][]) : string {
            return this.validateLatinSquare(lsquare);
        }
        
        public static isValidLatinSquare(lsquare: number[][]): boolean {
            var valid = this.validateLatinSquare(lsquare);
            if (valid === "") {
                return true;
            }
            else {
                return false;
            }
        }
        
        private static generateLatinSquare(size: number): number[][] {
            var lSquare = null;
            lSquare = new Array(size);
            var elements = [];
            for (var i = 1; i <= size; i++) {
                elements.push(i);
            }
            for ( i = 0; i < size; i++) {
                lSquare[i] = new Array(size);
            }
            var row = elements.slice();
            row = KenHelpers.shuffleArr(row);
            lSquare[0] = row;
            for (var r = 1; r < size; r++) {
                for (var c = 0; c < size; c++) {
                    var items = elements.slice();
                    items = KenHelpers.shuffleArr(items);
                    for (var c1 = 0; c1 < c; c1++) {
                        KenHelpers.removeItemFromArrayByValue(items, lSquare[r][c1]);
                    }
                    for (var r1 = 0; r1 < r; r1++) {
                        KenHelpers.removeItemFromArrayByValue(items, lSquare[r1][c]);
                    }

                    if (items[0] === undefined) {
                        return this.generateLatinSquare(size);
                    }
                    else {
                        lSquare[r][c] = items[0];
                    }
                }
            }
            return lSquare;
        }
        
        private static validateLatinSquare(lSquare : number[][]): string {

            var i, j, size ;
            //Check lSquare should be an 2d array with size > 0
            if (!Array.isArray(lSquare)) {
                return "Not An Array";
            }

            size = lSquare.length;
            if (!KenHelpers.isValidSize(size)) {
                return "Invalid Size";
            }

            for ( i = 0; i < lSquare.length; i++) {
                if (!Array.isArray(lSquare[i])) {
                    return "Not a valid 2D Array";
                }
                var sz = (lSquare[i]).length;
                if (!KenHelpers.isValidSize(sz)) {
                    return "Not a valid sized 2D Array";
                }

                if (sz !== size) {
                    return "Not a valid 2D square Array";
                }
            }

            //Check-6 basic latin square logic - item should be unique across row and col
            for (var r = 0; r < size; r++) {
                for (var c = 0; c < size; c++) {
                    var item = lSquare[r][c];
                    for (var r1 = 0; r1 < size; r1++) {
                        if (r !== r1 && lSquare[r1][c] === lSquare[r][c])   {
                            return item + " repeated in column " + c;
                        }
                    }
                    for (var c1 = 0; c1 < size; c1++) {
                        if (c !== c1 && lSquare[r][c1] === lSquare[r][c])   {
                            return item + " repeated in row " + r;
                        }
                    }
                }
            }
            return "";
        }
        
        
    }
}
