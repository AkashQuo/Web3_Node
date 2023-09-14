const { Web3 } = require('web3');
const web3 = new Web3('https://goerli.infura.io/v3/b8b2ea2f8f4e4ccab7405e9e802ac175'); 
const targetAddress = '0x3EAC7cE1c7250b840e74Afd25D06284f07bF1372'; 


// Function to get pending transactions of a specific address
// async function getPendingTransactions(address) {
//   try {
//     const pendingTransactions = await web3.eth.getPendingTransactions();
//     return pendingTransactions.filter(tx => tx.to === address || tx.from === address);
//   } catch (error) {
//     throw error;
//   }
// }

async function getPendingTransactions(address) {
  try {
    const pendingBlock = await web3.eth.getBlock('pending', true);
    
    const pendingTransactions = pendingBlock.transactions.filter(tx => tx.to === address || tx.from === address);
    console.log(pendingBlock)
    return pendingTransactions;
  } catch (error) {
    throw error;
  }
}


// Function to get recent transactions of a specific address
async function getRecentTransactions(address, startTime) {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    const endBlock = await web3.eth.getBlock(blockNumber);
    const startBlock = await web3.eth.getBlockNumber(startTime);

    const transactions = [];

    for (let i = startBlock; i <= endBlock.number; i++) {
      const block = await web3.eth.getBlock(i, true);

      if (block && block.transactions.length > 0) {
        const addressTransactions = block.transactions.filter(tx => tx.to === address || tx.from === address);
        transactions.push(...addressTransactions);
      }
    }

    return transactions;
  } catch (error) {
    throw error;
  }
}

async function main() {
  try {
    const startTime = Math.floor(Date.now() / 1000); // Timestamp in seconds

    // Get pending transactions for the specific address
    const pendingTransactions = await getPendingTransactions(targetAddress);
    console.log('Pending Transactions:', pendingTransactions);

    // Get transactions for the specific address since script start time
    const recentTransactions = await getRecentTransactions(targetAddress, startTime);
    console.log('Recent Transactions:', recentTransactions);
  } catch (error) {
    console.error('Error:', error);
  }
}
// i=0;
// while (i<1000)
// {
// main();
// i++;
// }

main();