// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract SimpleStorage {
    struct Product {
        string productName;
        string productDesc;
        uint256 productPrice;
        string productCategory;
    }
    
    Product public productData;

    function store(
        string memory _productName,
        string memory _productDesc,
        uint256 _productPrice;
        string memory _productCategory;
    ) public {
        productData.productName = _productName;
        productData.productDesc = _productDesc;
        productData.productPrice = _productPrice;
        productData.productCategory = _productCategory;
    }

    function getProductData() public view returns (
        string memory productName,
        string memory productDesc,
        uint256 productPrice,
        string memory productCategory
    ) {
        productName = productData.productName;
        productDesc = productData.productDesc;
        productPrice = productData.productPrice;
        productCategory = productData.productCategory;
    }
}