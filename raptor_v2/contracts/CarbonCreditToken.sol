// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditToken is ERC20, Ownable {
    // Constructor pre-filled with your Remix VM owner account
    constructor() ERC20("Carbon Credit Token", "CCT") Ownable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4) {
        // Mint initial supply to the owner
        _mint(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 1000 * 10 ** decimals());
    }

    // Mint function (only owner)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}