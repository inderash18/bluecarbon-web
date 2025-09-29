from flask import Flask, request, jsonify
from raptor_dll import get_owner, mint_tokens

app = Flask(__name__)

@app.route("/owner", methods=["GET"])
def owner():
    # Call the blockchain function to get the owner
    return jsonify({"owner": get_owner()})

@app.route("/mint", methods=["POST"])
def mint():
    data = request.get_json()
    to_address = data.get("to_address")
    amount = data.get("amount")
    private_key = data.get("private_key")
    
    if not all([to_address, amount, private_key]):
        return jsonify({"error": "Missing required fields"}), 400
    
    tx_hash = mint_tokens(to_address, amount, private_key)
    return jsonify({"tx_hash": tx_hash})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)