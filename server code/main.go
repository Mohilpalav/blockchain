package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var chain *BlockChain

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	api := router.Group("/api")
	{
		api.GET("/", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"message": "pong",
			})
		})
	}

	api.GET("/setDifficulty", setDifficulty)
	api.GET("/addBlock", addBlock)
	api.GET("/changeData", changeData)
	api.GET("/mine", mine)
	api.GET("/getBlockchain", getBlockchain)
	api.GET("/cd", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"difficulty": Difficulty,
		})
	})

	router.Run(":3043")
}

func getBlockchain(c *gin.Context) {
	jsonInfo, _ := json.Marshal(&chain)
	c.String(http.StatusOK, string(jsonInfo))
}

func mine(c *gin.Context) {
	q := c.Request.URL.Query()

	index, err := strconv.Atoi(q["index"][0])
	if err != nil {
		fmt.Printf("No data found!\n")
		c.JSON(http.StatusOK, gin.H{
			"status": "failure",
			"reason": "no index parsed!",
		})
		return
	}

	if index != 0 {
		chain.Blocks[index].CalculateHash(true, chain.Blocks[index-1].Mined)
	} else {
		chain.Blocks[index].CalculateHash(true, true)
	}

	jsonInfo, _ := json.Marshal(&chain)
	c.String(http.StatusOK, string(jsonInfo))
}

func changeData(c *gin.Context) {
	q := c.Request.URL.Query()
	index, err1 := strconv.Atoi(q["index"][0])
	data := q["data"][0]
	if err1 != nil {
		fmt.Printf("No data found!\n")
		c.JSON(http.StatusOK, gin.H{
			"status": "failure",
			"reason": "no data parsed!",
		})
		return
	}

	chain.ChangeData(index, data)

	jsonInfo, _ := json.Marshal(&chain)
	c.String(http.StatusOK, string(jsonInfo))
}

func addBlock(c *gin.Context) {
	q := c.Request.URL.Query()

	mined, err1 := strconv.ParseBool(q["mined"][0])
	data := q["data"][0]
	if err1 != nil {
		fmt.Printf("No data found!\n")
		c.JSON(http.StatusOK, gin.H{
			"status": "failure",
			"reason": "no data parsed!",
		})
		return
	}

	if chain == nil {
		chain = InitBlockChain(data, mined)
	} else {
		chain.AddBlock(data, mined, chain.Blocks[len(chain.Blocks)-1].IsMined())
	}

	//convert to json and send away
	jsonInfo, _ := json.Marshal(&chain)
	c.String(http.StatusOK, string(jsonInfo))

}

func setDifficulty(c *gin.Context) {
	//clear the current chain
	chain = nil
	q := c.Request.URL.Query()
	d, err := strconv.Atoi(q["difficulty"][0])
	if err != nil {
		fmt.Printf("No Difficulty set\n")
		c.JSON(http.StatusOK, gin.H{
			"status": "failure",
			"reason": "no difficulty parsed!",
		})
		return
	}
	fmt.Printf("Difficulty: %v\n", d)
	Difficulty = d
	c.JSON(http.StatusOK, gin.H{
		"status":     "success",
		"difficulty": Difficulty,
	})
}
