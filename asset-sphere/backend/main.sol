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

    // Modify the asset owner and emit an event which records the transaction history onto the blockchain as per requirements
    function modifyAssetOwner(string memory _assetID, string[] memory _assetPayload, string memory _newOwner) external {
        _assetPayload[0] = _newOwner; // modify the existing payload to insert a new owner
        assets[_assetID] = _assetPayload; // assign our modified payload to the asset ID
    }
}

contract TransferAssets {
    Users public usersContract; // Instance of the Users SC
    Assets public assetsContract; // Instance of the Assets SC
    address owner;
    string[] userFromPayload;
    string[] userToPayload;
    string[] assetPayload;
    string currentAssetOwner;
    string sender;

    constructor() {
        owner = msg.sender; // Sets the owner as the deployer of the SC
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // Record information onto the blockchain
    event AssetTransfered(string __assetID, string __newOwner, uint256 timestamp, string __price);
    event TransferFailed(string __msg);

    // Construct an instance of the contracts we will be interacting with when we construct this contract
    // Only the deployer of this contract (i.e. Ganache wallet address 0, our wallet) can call this function
    function setUsableContracts(address _usersContractAddress, address _assetsContractAddress) external onlyOwner {
        usersContract = Users(_usersContractAddress);
        assetsContract = Assets(_assetsContractAddress);
    }

    // The actual transfer function
    // Takes in the userID from (i.e. the current owner of the asset), userIDTo (the recipient) and the name of the asset
    function transfer(string memory userIDFrom, string memory userIDTo, string memory assetID) external {

        // Access the payload of the asset so we can retrieve the purchase information (i.e. name, price, etc.) from the blockchain
        assetPayload = assetsContract.getAsset(assetID);

        // Verify that userFrom owns the asset that they are trying to transfer
        // Can successfully check if those two strings match and execute things after
        if(stringsEquals(userIDFrom, assetPayload[0]) == true) {
            assetsContract.modifyAssetOwner(assetID, assetPayload, userIDTo); // Call the function that will transact this onto the blockchain
            
            emit AssetTransfered(assetID, userIDTo, block.timestamp, assetPayload[3]); // emit an event - record this transaction information & time to the blockchain
        }
        else {
            emit TransferFailed("Failed to transfer the asset.");
        }
    }

    // Function that takes in two strings, checks that their lengths match and the bytes are the same at each position
    // Essentially just an equivalator for strings
    function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i=0; i<l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
}

}