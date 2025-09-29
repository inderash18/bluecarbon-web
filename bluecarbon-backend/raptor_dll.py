from web3 import Web3
import os
from dotenv import load_dotenv
import json

load_dotenv()

RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:8545")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")  # e.g., 0x5FbD...
CONTRACT_ABI_PATH = os.getenv("CONTRACT_ABI_PATH", "artifacts/contracts/CarbonCreditToken.sol/CarbonCreditToken.json")

# Connect to local Hardhat node
w3 = Web3(Web3.HTTPProvider(RPC_URL))
assert w3.isConnected(), "Failed to connect to blockchain!"

# Load ABI
with open(CONTRACT_ABI_PATH) as f:
    contract_json = json.load(f)
    abi = contract_json['abi']

# Connect to contract
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

# Example function to get owner
def get_owner():
    return contract.functions.owner().call()

# Example function to mint tokens
def mint_tokens(to_address: str, amount: int, private_key: str):
    account = w3.eth.account.from_key(private_key)
    txn = contract.functions.mint(to_address, amount).build_transaction({
        "from": account.address,
        "nonce": w3.eth.get_transaction_count(account.address),
        "gas": 200000,
        "gasPrice": w3.toWei('1', 'gwei')
    })
    signed_txn = account.sign_transaction(txn)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    return w3.toHex(tx_hash)