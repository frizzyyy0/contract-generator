import logo from './logo.svg';
import './App.css';
import {useState} from 'react';



function App() {

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [maxSupply, setSupply] = useState('');
  const [wl, setWl] = useState(true);
  const [wlSupply, setWlSupply] = useState('');
  const [wlPrice, setWlPrice] = useState('');
  const [wlTx, setWlTx] = useState('');
  const [publicPrice, setPublicPrice] = useState('');
  const [publicTx, setPublicTx] = useState('');
  const [publicWallet, setPublicWallet] = useState('');
  const [submitted, setSubmit] = useState(false)
  const [mainContract, setContract] = useState('')
  const handleOnChange = () => {
    setWl(!wl);
  };

  
  const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    // 👇️ access input values here
  

    const config = {
      "name": name,
      "symbol": symbol,
      "maxsupply": maxSupply,
      "iswl": wl,
      "wlsupply": wlSupply,
      "wlmintprice": wlPrice,
      "maxperwltx": wlTx,
      "publicmintprice": publicPrice,
      "maxperpublictx": publicTx,
      "maxperwallet": publicWallet,
    }
    
    setSubmit(true)

    
    var contract =

    "// SPDX-License-Identifier: MIT" + "\n" + "\n" +
    "pragma solidity ^0.8.4;" + "\n" + "\n" +

    'import "@openzeppelin/contracts/access/Ownable.sol";'  + "\n" + 
    'import "erc721a/contracts/ERC721A.sol";'  + "\n" +  
    'import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";'  + "\n" + 
    'import "@openzeppelin/contracts/utils/Strings.sol";'  + "\n" + "\n" +

    `contract ${config.name} is ERC721A, Ownable {` + "\n" + "\n"


    if (config.iswl) {
        contract += 

        `   uint public maxPublic = ${config.maxsupply - config.wlsupply};` + "\n" +
        `   uint public maxWhitelist = ${config.wlsupply};` + "\n" + "\n" +

        `   uint public publicMintPrice = ${config.publicmintprice};` + "\n" +
        `   uint public wlMintPrice = ${config.wlmintprice};` + "\n" + "\n" +

        `   uint public maxPerWallet = ${config.maxperwallet};` + "\n" +

        `   uint public maxPerPublicTxn = ${config.maxperpublictx};` + "\n" +
        `   uint public maxPerWlTxn = ${config.maxperwltx};` + "\n" +  "\n" +

        `   bytes32 public merkleRoot;` + "\n" +  "\n" +

        `   bool public isWlSale = false;` +  "\n" +
        `   bool public isPublicSale = false;` +  "\n" +  "\n" 

        

    } else {
        contract += 

        `   uint public maxPublic = ${config.maxsupply};` + "\n" + "\n" +
        
        `   uint public publicMintPrice = ${config.publicmintprice};` + "\n" + "\n" +
        
        `   uint public maxPerWallet = ${config.maxperwallet};` + "\n" + "\n" +
        
        `   uint public maxPerPublicTxn = ${config.maxperpublictx};` + "\n" + "\n" +

        `   bool public isPublicSale = false;` +  "\n" +  "\n" 


    }

    contract += 

    "   mapping(address => uint) private _walletMintedCount;" + "\n" + "\n" +

    "   string private _baseURL;"  + "\n" + "\n" +

    `   constructor() ERC721A('${config.name}', '${config.symbol}') {}`  + "\n" + "\n" +

    "   function _baseURI() internal view override returns (string memory) {" + "\n" +

    "  	    return _baseURL;" + "\n"  +

    "   }" + "\n" + "\n" +

    "   function setMetadata(string memory url) external onlyOwner {" + "\n" +

    "  	    _baseURL = url;" + "\n"  +

    "   }" + "\n" + "\n"  +

    "   function mintedCount(address owner) external view returns (uint) {" + "\n" +

    "  	    return _walletMintedCount[owner];" + "\n"  +

    "   }" + "\n" + "\n" +

    "   function setPublicSale(bool value) external onlyOwner {" + "\n" +

    "  	    isPublicSale = value;" + "\n"  +

    "   }" + "\n" + "\n" 

    if (config.iswl) {
        contract +=

        "   function setWlSale(bool value) external onlyOwner {" + "\n" +

        "  	    isWlSale = value;" + "\n"  +

        "   }" + "\n" + "\n" 


    }

    contract +=

    "   function withdraw() external onlyOwner {" + "\n" +

    "  	    uint balance = address(this).balance;" + "\n"  +

    "  	    require(balance > 0, 'No balance');" + "\n"  +

    "  	    payable(owner()).transfer(balance);" + "\n"  +

    "   }" + "\n" + "\n" +

    "   function airdrop(address to, uint count) external onlyOwner {" + "\n" +

    "  	    require(" + "\n"  +

    "  	        _totalMinted() + count <= maxSupply," + "\n"  +

    `  	        '${config.symbol}: Exceeds max supply'` + "\n"  +

    "  	    );" + "\n"  +

    "  	    _safeMint(to, count);" + "\n"  +

    "   }" + "\n" + "\n" +


    "   function tokenURI(uint tokenId)" + "\n" +
    "   	public" + "\n" +
    "   	view" + "\n" +
    "   	override" + "\n" +
    "   	returns (string memory)" + "\n" +
    "   {" + "\n" +
    '       require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");' + "\n" +
    "       return bytes(_baseURI()).length > 0" + "\n" +
    '           ? string(abi.encodePacked(_baseURI(), Strings.toString(tokenId), ".json"))' + "\n" +
    "           : '';" + "\n" +
    "   }" + "\n"  + "\n" 

    if (config.iswl) {
        contract +=

        "   function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner{"  + "\n" +
        "           merkleRoot = _merkleRoot;"  + "\n" +
        "   }"  + "\n" + "\n" 



    }



    if (config.iswl) {
        contract += 



        "   function publicMint(uint256 quantity) external payable {" + "\n" +
        '       require(isPublicSale, "Public sale not live");' + "\n" +
        '       require(quantity > 0, "Quantity of tokens must be bigger than 0");' + "\n" +
        `       require(quantity <= maxPublic, "Quantity of tokens must be less than or equal to ${config.maxperpublictx}");` + "\n" +
        '       require(totalSupply() + quantity <= maxPublic + maxWhitelist, "Quantity exceeds max supply of tokens");' + "\n" +
        `       require(_walletMintedCount[msg.sender] + quantity <= ${config.maxperwallet}, "You have already minted.");` + "\n" +
        '       require(msg.value >= publicMintPrice * quantity, "Insufficient ether value");' + "\n" + "\n" +
        "       _walletMintedCount[msg.sender] += quantity;" + "\n" +
        "       _safeMint(msg.sender, quantity);" + "\n" +
        "    }" + "\n" + "\n"  +



        "   function wlMint(uint256 quantity,  bytes32[] memory _merkleProof) external payable {" + "\n" +
        '       require(isWlSale, "WL sale not live");' + "\n" +
        '       require(quantity > 0, "Quantity of tokens must be bigger than 0");' + "\n" +
        `       require(quantity <= maxPerWlTxn, "Quantity of tokens must be less than or equal to ${config.maxperwltx}");` + "\n" +
        '       require(totalSupply() + quantity <= maxWhitelist, "Quantity exceeds max supply of tokens");' + "\n" +
        `       require(_walletMintedCount[msg.sender] + quantity <= ${config.maxperwallet}, "You have already minted.");` + "\n" +
        '       require(msg.value >= wlMintPrice * quantity, "Insufficient ether value");' + "\n" + "\n" +

        "       bytes32 leaf = keccak256(abi.encodePacked(msg.sender));" + "\n" +
        '       require(MerkleProof.verify(_merkleProof, merkleRoot, leaf), "Incorrect proof");' + "\n" + "\n" +

        "       _walletMintedCount[msg.sender] += quantity;" + "\n" +
        "       _safeMint(msg.sender, quantity);" + "\n" +
        "    }" + "\n" + "\n" 

        


    } else {

      contract += 

      "   function publicMint(uint256 quantity) external payable {" + "\n" +
      '       require(isPublicSale, "Public sale not live");' + "\n" +
      '       require(quantity > 0, "Quantity of tokens must be bigger than 0");' + "\n" +
      `       require(quantity <= maxPublic, "Quantity of tokens must be less than or equal to ${config.maxperpublictx}");` + "\n" +
      '       require(totalSupply() + quantity <= maxPublic, "Quantity exceeds max supply of tokens");' + "\n" +
      `       require(_walletMintedCount[msg.sender] + quantity <= ${config.maxperwallet}, "You have already minted.");` + "\n" +
      '       require(msg.value >= publicMintPrice * quantity, "Insufficient ether value");' + "\n" + "\n" +
      "       _walletMintedCount[msg.sender] += quantity;" + "\n" +
      "       _safeMint(msg.sender, quantity);" + "\n" +
      "    }" + "\n" + "\n" 
    }







    contract += "}"

    console.log(contract)
    
    setContract(contract)
  };

  if (!submitted) {
    
    return (
      <div className="App" onSubmit={handleSubmit} >
        <form >
        <label>Name of collection:
        <input 
          type="text" 
          name="username"
          onChange={event => setName(event.target.value)}
          value={name}
        />
        </label><br /><br />
        <label>Symbol for collection:
          <input 
            type="text" 
            name="password" 
            onChange={event => setSymbol(event.target.value)}
            value={symbol}
  x        />
          </label><br /><br />
         <label>Max supply:
      <input 
        type="number" 
        name="username" 
        onChange={event => setSupply(event.target.value)}
          value={maxSupply}
      />
      </label><br /><br />
      <label>Is there a Whitelist:
        <input 
          type="checkbox" 
          name="age" 
          onChange={handleOnChange}
          checked={wl}
        />
        </label><br /><br />
        <label>Whitelist supply:
        <input 
          type="number" 
          name="age" 
          onChange={event => setWlSupply(event.target.value)}
          value={wlSupply}
        />
        </label><br /><br />
  
        <label>Whitelist price:
      <input 
        type="number" 
        name="username" 
        onChange={event => setWlPrice(event.target.value)}
          value={wlPrice}
      />
      </label><br /><br />
        <label>Max per Whitelist TX:
      <input 
        type="number" 
        name="username" 
        onChange={event => setWlTx(event.target.value)}
          value={wlTx}
      />
      </label><br /><br />
      
      
      <label>Public price:
        <input 
          type="number" 
          name="age" 
          onChange={event => setPublicPrice(event.target.value)}
          value={publicPrice}
        />
        </label><br /><br />
        <label>Max per Public TX:
        <input 
          type="number" 
          name="age" 
          onChange={event => setPublicTx(event.target.value)}
          value={publicTx}
        />
        </label><br /><br />
        <label>Max per Wallet:
        <input 
          type="number" 
          name="age" 
          onChange={event => setPublicWallet(event.target.value)}
          value={publicWallet}
        />
        </label><br /><br /> 
        
  
          <input type="submit" />
      </form>
      </div>
    );
  } else {
    return (

      <div className='Contract'>
      {mainContract}
    </div>

    )
  }

}

export default App;
