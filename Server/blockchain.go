package main

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

type Block struct {
	BlockID   string `json:"BlockID"`
	Timestamp int64  `json:"Timestamp"`
	Hash      string `json:"Hash"`
	PrevHash  string `json:"PrevHash"`
	Data      string `json:"Data"`
	Nonce     uint32 `json:"Nonce"`
	Mined     bool   `json:"Mined"`
}

type BlockChain struct {
	Blocks []*Block
}

var (
	maxDifficulty string = "0000000000"
	Difficulty    int
)

func InitBlockChain(data string) *BlockChain {
	return &BlockChain{[]*Block{CreateFirstBlock(data)}}
}

func CreateFirstBlock(data string) *Block {
	return CreateBlock(data, "", true)
}

func (chain *BlockChain) AddBlock(data string, previousMined bool) {
	prevBlock := chain.Blocks[len(chain.Blocks)-1]
	newBlock := CreateBlock(data, prevBlock.Hash, previousMined)
	chain.Blocks = append(chain.Blocks, newBlock)
}

func CreateBlock(data, prevhash string, previousMined bool) *Block {
	block := &Block{BlockID: GenerateBlockID(), Timestamp: GenerateTime(), PrevHash: prevhash, Data: data}
	block.CalculateHash(false, previousMined)
	return block
}

func (chain *BlockChain) ChangeData(index int, data string) {
	block := chain.Blocks[index]
	block.Data = data
	chain.ChainChangeData(index)
}

func (chain *BlockChain) MineData(index int) {
	chain.ChainMineData(index)
}

func (chain *BlockChain) ChainChangeData(index int) {
	for index < len(chain.Blocks) {
		block := chain.Blocks[index]
		if index == 0 {
			block.CalculateHash(true, false)
		} else {
			prevBlock := chain.Blocks[index-1]
			block.PrevHash = prevBlock.Hash
			block.CalculateHash(prevBlock.Mined, false)
		}
		index++
	}
}

func (chain *BlockChain) ChainMineData(index int) {
	if chain.Blocks[index].Mined == false {
		counter := index
		for counter < len(chain.Blocks) {
			block := chain.Blocks[counter]
			if counter == 0 {
				block.CalculateHash(true, true)
			} else {
				prevBlock := chain.Blocks[counter-1]
				block.PrevHash = prevBlock.Hash
				if counter == index {
					block.CalculateHash(prevBlock.Mined, true)
				} else {
					block.CalculateHash(prevBlock.Mined, false)
				}
			}
			counter++
		}
	}

}

func (block *Block) CalculateHash(mined, previousMined bool) {

	var nonce uint32 = 0
	sha := sha256.Sum256([]byte(block.BlockID + block.Data + block.PrevHash + fmt.Sprint(block.Timestamp) + fmt.Sprint(nonce)))
	hash := hex.EncodeToString(sha[:])
	block.Mined = false

	if mined && previousMined {
		for nonce = 0; hash[:Difficulty] != maxDifficulty[:Difficulty]; nonce++ {
			sha = sha256.Sum256([]byte(block.BlockID + block.Data + block.PrevHash + fmt.Sprint(block.Timestamp) + fmt.Sprint(nonce)))
			hash = hex.EncodeToString(sha[:])
		}
		block.Mined = true
	}
	block.Hash = hash
	block.Nonce = nonce
}

func (block *Block) IsMined() bool {
	return block.Mined
}

func GenerateTime() int64 {
	timeUnix := time.Now().UnixNano()
	return timeUnix
}

func GenerateBlockID() string {
	bytes := make([]byte, 32)
	_, err := rand.Read(bytes)
	if err != nil {
		return ""
	}
	return hex.EncodeToString(bytes)
}
