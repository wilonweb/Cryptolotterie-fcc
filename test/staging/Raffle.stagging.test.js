const { assert, expect } = require("chai")
const { getNamedAccounts, deployments, ethers, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
          let raffle, raffleEntranceFee, deployer, interval

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              raffle = await ethers.getContract("Raffle", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
          })

          describe("fulfilRandomWords", function() {
            isCallTrace("work with Chainlink Keepers and ChainLink VRF, we get a random winner"), async function
            //enter raffle
            const startingTimeStamp = await.raffle.getLatestTimeStamp()
            const accounts = await ethers.getSigners()

            await new Promise(async (resolve, reject) => {
                raffle.once("WinnerPicked", async () => {
                    console.log("WinnerPicked event firred!")
                    try{
                        // add our assert here
                        const recentWinner = await raffle.getRecentWinner();
                        const raffleState = await raffle.getRaffleState();
                        const winnerBalance = await accounts[0].getBalance();
                        const endingTimeStamp = await raffle.getLatestTimeStamp();  
                        
                        await expect(raffle.getPlayer(0)).to.be.reverted
                        assert.equal(recentWinner.toString(), accounts[0].address)
                        assert.equal(raffleState, 0)
                        assert.equal(
                            winnerEndingBalance.toString(),
                            winnerStartingBalance.add(raffleEntranceFee).toString()
                        )
                        assert(endingTimeStamp > startingTimeStamp)
                        resolve();
                    } catch(error) {
                        console.log(error)
                        reject(e)
                    }
                })
                // then entering the raffle 
                await raffle.enterRaffle({ value: raffleEntranceFee })
                const winnerStartingBalance = await accounts[0].getBalance();

                // and this code WONT complete until our listener has finished listening. 
            })

            // setup listing
            // just in cas the blockChaine moves REALLY fast

            //await raffle.enterRaffle({ value: raffleEntranceFee })
          })

      })
