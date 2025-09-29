🌱 Blue Carbon Token Registry

A Blockchain-powered registry for Blue Carbon ecosystem restoration — enabling transparent monitoring, reporting, verification, and tokenization of carbon credits from coastal ecosystems such as mangroves and seagrass beds.

⸻

💡 Project Overview

Blue Carbon ecosystems play a crucial role in capturing and storing CO₂. However, tracking restoration efforts and generating carbon credits is often opaque and centralized.

This project leverages Ethereum-compatible blockchain to:
	•	Immutably store verified restoration data.
	•	Tokenize carbon credits via smart contracts.
	•	Enable NGOs, local communities, and stakeholders to participate.
	•	Integrate field data collected from apps and drones.

⸻

🏗 Features
	•	CarbonCreditToken (ERC20)
	•	Mintable by the owner (representing verified carbon credits)
	•	Transparent transactions on the blockchain
	•	Hardhat-powered Backend
	•	Compile and deploy Solidity contracts
	•	Local test environment using Hardhat network
	•	Python / JS Integration
	•	Scripts to interact with deployed contracts
	•	Ready to integrate with a mobile or web frontend

⸻

⚙️ Tech Stack
	•	Solidity: Smart contracts for ERC20 tokenization
	•	Hardhat: Local development and deployment
	•	Ethers.js: Blockchain interaction
	•	Python / Node.js: Backend integration
	•	OpenZeppelin Contracts: Secure, audited ERC20 and Ownable contracts


  Installation process for the Backend:

  1.Clone the repository:  
    "git clone https://github.com/yourusername/bluecarbon-token.git
  cd bluecarbon-token"

  2. Install dependencies:
     	"npm install"

 3.Run Hardhat:
   	"npx hardhat node"

4. Initialize local accounts:(In another terminal parallel )
   	"npx hardhat run scripts/deploy.ts --network localhost"
