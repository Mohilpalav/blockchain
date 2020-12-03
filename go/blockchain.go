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
	Timestamp int64 `json:"Timestamp"`
	Hash      string `json:"Hash"`
	PrevHash  string `json:"PrevHash"`
	Data      string `json:"Data"`
	Nonce     uint32 `json:"Nonce"`
	Mined     bool `json:"Mined"`
}

type BlockChain struct {
	Blocks     []*Block
}

var (
	maxDifficulty string = "000000000"
	Difficulty    int
)

func InitBlockChain(data string, mined bool) *BlockChain {
	return &BlockChain{[]*Block{CreateFirstBlock(data, mined)}}
}

func CreateFirstBlock(data string, mined bool) *Block {
	return CreateBlock(data, "", mined, true)
}

func (chain *BlockChain) AddBlock(data string, mined, previousMined bool) {
	prevBlock := chain.Blocks[len(chain.Blocks)-1]
	newBlock := CreateBlock(data, prevBlock.Hash, mined, previousMined)
	chain.Blocks = append(chain.Blocks, newBlock)
}

func CreateBlock(data, prevhash string, mined, previousMined bool) *Block {
	block := &Block{BlockID: GenerateBlockID(), Timestamp: GenerateTime(), PrevHash: prevhash, Data: data}
	block.CalculateHash(mined, previousMined)
	return block
}

func (chain *BlockChain) ChangeData(index int, data string) {
	block := chain.Blocks[index]
	block.Data = data
	for index < len(chain.Blocks) {
		block := chain.Blocks[index]
		if index == 0 {
			block.CalculateHash(true, false)
		} else {
			prevBlock := chain.Blocks[index-1]
			block.PrevHash = prevBlock.Hash
			block.CalculateHash(false, false)
		}
		index++
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
	timeNow := time.Now()
	timeUnix := timeNow.UnixNano()
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
