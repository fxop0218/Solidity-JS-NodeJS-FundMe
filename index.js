// Node.js ==> require

// JS ==> import
const { ethers } = require("ethers")
const { abi, contractAddress } = require("./constants")

console.log(ethers)
// Comprovate if metamask its istalled in the browser
async function walletConncet() {
    if (typeof window.ethereum !== "undefined") {
        console.log("Metamask dispobible")
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" }) // Open request metamask account (API call)
        } catch (e) {
            console.log(e)
        }
        document.getElementById("connectButton").innerHTML = "Connected!!!"
        // get account connected
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
    } else {
        document.getElementById("connectButton").innerHTML =
            "Install metamask to continue"
    }
}

// Fund funcion

async function fund(ethAmount) {
    console.log(`Funding x ${ethAmount}`)
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the bc
        // Signer // wallet // gas
        // ABI and address
        const provider = new ethers.providers.Web3Provider(window.ethereum) // provider == metamask
        const signer = provider.getSigner() // All the accounts conecteds
        console.log(`Signer: ${signer}`)
        const contract = new ethers.Contracts(contractAddress, abi, signer)
        const transactionResponse = await contract.fund({
            value: ethers.value.parseEthers(ethAmount),
        })
    }
}

// Withdraw

module.exports = { fund, walletConncet }
