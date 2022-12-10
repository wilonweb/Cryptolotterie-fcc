const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardahat-config")

<<<<<<< HEAD
module.exports = async function ({ getNamedAccounts, deployments}) {
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()

    /*if (developmentChains.includes(network.name)) {

    }*/
=======
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
>>>>>>> e71d020ea4c2b2dfd9ba54de5f2efe3594d3d9dd

    // if (developmentChains.includes(network.name)) {
    // }

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmation: network.config.blockConfirmation || 1,
    })
}
