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
    // const ethAmount = document.getElementById("ethAmount") // Default js
    console.log(`Funding: ${ethAmount}`)
    if (typeof window.ethereum !== "undefined") {
        // provider / connection to the bc
        // Signer // wallet // gas
        // ABI and address
        const provider = new ethers.providers.Web3Provider(window.ethereum) // provider == metamask
        const signer = provider.getSigner() // All the accounts conecteds
        console.log(`Signer: ${signer}`)
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            })
            // lisen event
            await listenTransactionMine(transactionResponse, provider)
            console.log("Completed!")
        } catch (e) {
            console.error(e)
        }
    }
}

async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum) // Get wallet
        const balance = await provider.getBalance(contractAddress) // get valance from wallet
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(`The balance is: ${ethers.utils.formatEther(balance)} ETH`) // Contract balance
    }
}

// Comprovate if the transaction is completed
function listenTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse}...`)
    return new Promise((resolve, reject) => {
        // Create listener https://docs.ethers.io/v5/api/providers/provider/#Provider-once
        provider.once(transactionResponse.hash, (transacionRecived) => {
            console.log(`Completed with ${transacionRecived.confirmations}`)
            resolve()
        }) // transactionresponse, anonimous function
    })
}

// Withdraw

// Withdraw form contract to metamask account
async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        console.log("Withdrawing...")
        const provider = new ethers.providers.Web3Provider(window.ethereum) // provider == metamask
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)

        try {
            const transactionResponse = await contract.withdraw()
            await listenTransactionMine(transactionResponse, provider)
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = { fund, walletConncet, getBalance, withdraw }
