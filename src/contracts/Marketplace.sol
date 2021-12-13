pragma solidity ^0.5.0;

contract Marketplace {
  string public name;
  uint public productCount=0;
  mapping(uint => Product) public products;

struct Product {
  uint id;
  string name;
  uint price;
  address payable owner;
  bool purchased;
  bool onSale;
}

event ProductCreated (
  uint id,
  string name,
  uint price,
  address payable owner,
  bool purchased,
  bool onSale
);

event ProductPurchased (
  uint id,
  string name,
  uint price,
  address payable owner,
  bool purchased,
  bool onSale
);

event ProductPriceUpdated (
  uint id,
  uint price
);

  constructor() public {
    name = "Dapp University Marketplace";
  }

  function createProduct(string memory _name, uint _price, bool _onSale) public {
    //Require a name
    require(bytes(_name).length > 0, "Enter a valid name");
    //Requiere a valid price
    require(_price > 0, "Enter a valid price");
    //Increment product count
    productCount++;
    //Create the product
    products[productCount] = Product(productCount, _name, _price, msg.sender, false, _onSale);
    //Trigger an event
    emit ProductCreated(productCount, _name, _price, msg.sender, false, _onSale);
  }

  function updatePrice(uint _id, uint _price) public {
    //Fetch the product and make a copy of it
    Product memory _product = products[_id];
    //Requiere a valid price
    require(_price > 0, "Enter a valid price");
    // Require that only owner update the product price
    require(_product.owner == msg.sender, "You do not have permissions to edit this product");
    // Update product price
    _product.price = _price;
    //Update the product
    products[_id] = _product;
    //Trigger an event
    emit ProductPriceUpdated(_product.id, _price);
  }

  function purchaseProduct(uint _id) public payable {
    //Fetch the product and make a copy of it
    Product memory _product = products[_id];
    //Fetch the owner
    address payable _seller = _product.owner;
    //Make sure the product has valid id
    require(_product.id > 0 && _product.id <= productCount, "Enter valid id");
    //Require that there is enough Ether in the transaction
    require(msg.value >= _product.price,"Transfer the correct amount");
    //Require that the buyer is not the seller
    require(msg.sender != _seller, "Buyer cannot be seller");
    //Require that the product is on sale
    require(_product.onSale, "This product is not on sale");
    //Transfer ownership to the buyer
    _product.owner = msg.sender;
    //Mark as purchased
    _product.purchased = true;
    //Update the product
    products[_id] = _product;
    //Pay the seller by sending them Ether
    address(_seller).transfer(msg.value);
    //Trigger an event
    emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true, _product.onSale);
  }
}
