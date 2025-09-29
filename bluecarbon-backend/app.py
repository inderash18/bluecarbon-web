from flask import Flask, request, jsonify
from raptor_dll import get_owner, mint_tokens, get_balance
import os
from dotenv import load_dotenv

load_dotenv()


app = Flask(__name__)
private_key = os.getenv("PRIVATE_KEY")

@app.route("/owner", methods=["GET"])
def owner():
    # Call the blockchain function to get the owner
    return jsonify({"owner": get_owner()})

@app.route("/mint", methods=["POST"])
def mint():
    data = request.get_json()
    to_address = data.get("to")
    amount = data.get("amount")
    
    
    if not all([to_address, amount, private_key]):
        return jsonify({"error": "Missing required fields"}), 400
    
    tx_hash = mint_tokens(to_address, amount)
    return jsonify({"tx_hash": tx_hash})
@app.route("/balance/<address>", methods=["GET"])
def balance(address):
    try:
        bal = get_balance(address)
        return jsonify({"address": address, "balance": bal})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)