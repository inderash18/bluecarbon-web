import hre from "hardhat";

async function main() {
  const CarbonCreditToken = await hre.ethers.getContractFactory("CarbonCreditToken");
  const token = await CarbonCreditToken.deploy("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");

  await token.waitForDeployment();
  console.log("CarbonCreditToken deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});