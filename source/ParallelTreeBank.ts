import {TreeBank} from "./TreeBank";
import {ParseTree} from "./ParseTree";

export class ParallelTreeBank {

    protected fromTreeBank: TreeBank
    protected toTreeBank: TreeBank

    constructor(folder1?: string, folder2?: string, pattern?: string) {
        this.fromTreeBank = new TreeBank(folder1, pattern)
        this.toTreeBank = new TreeBank(folder2, pattern)
        this.removeDifferentTrees()
    }

    removeDifferentTrees(){
        let i = 0;
        let j = 0;
        while (i < this.fromTreeBank.size() && j < this.toTreeBank.size()){
            if (this.fromTreeBank.get(i).getName() < this.toTreeBank.get(j).getName()){
                this.fromTreeBank.removeTree(i);
            } else {
                if (this.toTreeBank.get(j).getName() > this.fromTreeBank.get(i).getName()){
                    this.toTreeBank.removeTree(j);
                } else {
                    i++;
                    j++;
                }
            }
        }
        while (i < this.fromTreeBank.size()){
            this.fromTreeBank.removeTree(i);
        }
        while (j < this.toTreeBank.size()){
            this.toTreeBank.removeTree(j);
        }
    }

    size(): Number{
        return this.fromTreeBank.size()
    }

    fromTree(index: number): ParseTree{
        return this.fromTreeBank.get(index)
    }

    toTree(index: number): ParseTree{
        return this.toTreeBank.get(index)
    }

    getFromTreeBank(index: number): TreeBank{
        return this.fromTreeBank
    }

    toFromTreeBank(index: number): TreeBank{
        return this.toTreeBank
    }

}