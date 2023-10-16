// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract Users {
    event CreatedUser();
    // UserId -> Payload
    // Mapping that stores all the user ids & their payloads;
    // User Payload structure:
    //  payload = [fname, lname, dob, email, password]
    mapping(string => string[]) public users;

    function createUser(string memory _userid, string[] memory _payload) external {
        users[_userid] = _payload;
    }

    // returns all the user details in the payload format
    function getUser(string memory _userid) external view returns (string[] memory payload) {
        return users[_userid];
    }
}

contract Assets {
    event CreatedAsset();
    // Asset ID -> Payload
    // Mapping that stores all the asset IDs & their payloads;
    // Asset Payload structure:
    //  payload = [userID (owner of the asset currently), asset name, asset description, price, category]
    mapping(string => string[]) public assets;

    function createAsset(string memory _assetid, string[] memory _payload) external {
        assets[_assetid] = _payload;
    }

    // returns all the asset details in the payload format
    function getAsset(string memory _assetid) external view returns (string[] memory payload) {
        return assets[_assetid];
    }
}

contract TransferAssets {
    Users public usersContract; // Instance of the Users SC
    Assets public assetsContract; // Instance of the Assets SC
    address owner; 

    constructor() {
        owner = msg.sender; // Sets hte owner as the deployer of the SC
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // Construct an instance of the contracts we will be interacting with when we construct this contract
    // Only the deployer of this contract (i.e. Ganache wallet address 0, our wallet) can call this function
    function setUsableContracts(address _usersContractAddress, address _assetsContractAddress) external onlyOwner {
        usersContract = Users(_usersContractAddress);
        assetsContract = Assets(_assetsContractAddress);
    }


}