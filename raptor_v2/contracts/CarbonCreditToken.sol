// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditToken is ERC20, Ownable {
    // Constructor takes owner as parameter
    constructor(address initialOwner) ERC20("Carbon Credit Token", "CCT") Ownable(initialOwner) {
        // Mint initial supply to the owner
        _mint(initialOwner, 1000 * 10 ** decimals());
    }

    // Mint function (only owner)
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}