from web3 import Web3
import os
from dotenv import load_dotenv
import json

load_dotenv()

RPC_URL = os.getenv("RPC_URL", "http://127.0.0.1:8545")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")  # e.g., 0x5FbD...
CONTRACT_ABI_PATH = os.getenv("CONTRACT_ABI_PATH", "bluecarbon-backend/raptor_v2/artifacts/contracts/CarbonCreditToken.sol/CarbonCreditToken.json")
OWNER_ADDRESS = os.getenv("OWNER_ADDRESS")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# Connect to local Hardhat node
w3 = Web3(Web3.HTTPProvider(RPC_URL))
assert w3.is_connected(), "Failed to connect to blockchain!"

# Load ABI
with open(CONTRACT_ABI_PATH) as f:
    contract_json = json.load(f)
    abi = contract_json['abi']

# Connect to contract
contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

# Example function to get owner
def get_owner():
    return contract.functions.owner().call()

def get_balance(address: str):
    # Ensure the address is checksummed
    checksummed_address = w3.to_checksum_address(address)
    return contract.functions.balanceOf(checksummed_address).call()

# Example function to mint tokens
def mint_tokens(to_address: str, amount: int):
    account = w3.eth.account.from_key(PRIVATE_KEY)
    if account.address.lower() != OWNER_ADDRESS.lower():
        raise ValueError("The PRIVATE_KEY does not correspond to the OWNER_ADDRESS")
    to_address_checksum = w3.to_checksum_address(to_address)
    txn = contract.functions.mint(to_address_checksum, amount).build_transaction({
        "from": OWNER_ADDRESS,
        "nonce": w3.eth.get_transaction_count(OWNER_ADDRESS),
        "gas": 200000,
        "gasPrice": w3.to_wei('1', 'gwei')
    })
    signed_txn = account.sign_transaction(txn)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return w3.to_hex(tx_hash)

def transfer_tokens(from_address: str, private_key: str, to_address: str, amount: int):
    account = w3.eth.account.from_key(private_key)
    if account.address.lower() != from_address.lower():
        raise ValueError("The provided private_key does not correspond to the from_address")
    to_address_checksum = w3.to_checksum_address(to_address)
    txn = contract.functions.transfer(to_address_checksum, amount).build_transaction({
        "from": from_address,
        "nonce": w3.eth.get_transaction_count(from_address),
        "gas": 200000,
        "gasPrice": w3.to_wei('1', 'gwei')
    })
    signed_txn = account.sign_transaction(txn)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    return w3.to_hex(tx_hash)