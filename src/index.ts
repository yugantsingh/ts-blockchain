import crypto from "crypto";

interface BlockShape {
   hash: string;
   prevHash: string;
   height: number;
   data: string;
}

class Block implements BlockShape {
   public hash: string;
   constructor(
      public prevHash: string,
      public height: number,
      public data: string
   ) {
      this.hash = Block.calculateHash(prevHash, height, data);
   }

   static calculateHash(
      prevHash: string,
      height: number,
      data: string
   ): string {
      const toHash = `${prevHash}${height}${data}`;
      return crypto.createHash("sha256").update(toHash).digest("hex");
   }
}

class Blockchain {
   private blocks: Block[];
   constructor() {
      this.blocks = [];
   }
   public addBlock(data: string) {
      const newblock = new Block(
         this.getPrevHash(),
         this.blocks.length + 1,
         data
      );
      this.blocks.push(newblock);
   }
   private getPrevHash() {
      if (this.blocks.length === 0) return "";
      return this.blocks[this.blocks.length - 1].hash;
   }
   public getBlocks() {
      return [...this.blocks];
   }
}

const blockchain = new Blockchain();
blockchain.addBlock("Eth");
blockchain.addBlock("btc");

console.log(blockchain.getBlocks());
