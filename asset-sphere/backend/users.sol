// SPDX-License-Identifier: MIT

pragma solidity 0.8.0;

contract Users {
    event CreatedUser();
    // UserId -> Payload
    // Mapping that stores all the user ids & their payloads;
    mapping(string => string) public users;

    function createUser(string memory _userid, string memory _payload) internal {
        users[_userid] = _payload;
    }

    // returns all the user details such as [username, bio, zip, etc.....]
    function getUser(string memory _userid) internal view returns (string memory payload) {
        return users[_userid];
    }
    
}