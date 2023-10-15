// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract TransferAssets {
    event TransferedAssets();
    // UserId -> Payload
    // Mapping that stores all the user ids & their payloads;
    mapping(string => string) public TransferAssets;

    function TransferAsset(string memory _userid, string memory _payload) external {
        TransferAssets[_userid] = _payload;
    }

    // returns all the user details such as [username, bio, zip, etc.....]
    function getUser(string memory _userid) external view returns (string memory payload) {
        return TransferAssets[_userid];
    }
}
