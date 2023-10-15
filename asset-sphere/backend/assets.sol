// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract Assets {
    event CreatedAsset();
    // Asset ID -> Payload
    // Mapping that stores all the asset IDs & their payloads;
    // payloads meaning name, purchase price, user id that owns the asset etc.
    mapping(string => string[]) public assets;

    function createAsset(string memory _assetid, string[] memory _payload) external {
        assets[_assetid] = _payload;
    }

    // returns all the user details such as [username, bio, zip, etc.....]
    function getAsset(string memory _assetid) external view returns (string[] memory payload) {
        return assets[_assetid];
    }
}