const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardahat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // if (developmentChains.includes(network.name)) {
    // }

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmation: network.config.blockConfirmation || 1,
    })
}
