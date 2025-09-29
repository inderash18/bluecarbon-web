// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("Carbon Credit Token", "CCT") Ownable(initialOwner) {
        // ownership is already set by Ownable
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
