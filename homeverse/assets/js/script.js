'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [overlay, navCloseBtn, navOpenBtn];

/**
 * close navbar when click on any navbar link
 */

for (let i = 0; i < navbarLinks.length; i++) { navElemArr.push(navbarLinks[i]); }

/**
 * addd event on all elements for toggling navbar
 */

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });
}



/**
 * header active state
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 400 ? header.classList.add("active")
    : header.classList.remove("active");
}); 
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import contractABI from './ABI.json'; // Replace with your actual ABI file

const contractAddress = '0xYourDeployedContractAddressHere';

export default function RealEstateApp() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');

  // Connect to MetaMask and load contract
  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();

        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);

        setWeb3(web3Instance);
        setContract(contractInstance);
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask to use this app');
      }
    }
    init();
  }, []);

  // List a new property
  const listProperty = async () => {
    await contract.methods
      .listProperty(propertyName, location, web3.utils.toWei(price, 'ether'))
      .send({ from: account });

    alert('Property listed successfully!');
  };

  // Book a property (ID = 1 as example)
  const bookProperty = async (propertyId, propertyPriceInETH) => {
    await contract.methods
      .bookProperty(propertyId)
      .send({ from: account, value: web3.utils.toWei(propertyPriceInETH, 'ether') });

    alert('Property booked successfully!');
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Real Estate DApp</h1>

      <input
        type="text"
        placeholder="Property Name"
        onChange={(e) => setPropertyName(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2"
      />
      <input
        type="text"
        placeholder="Price in ETH"
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2"
      />

      <button onClick={listProperty} className="bg-blue-500 text-white px-4 py-2 rounded">
        List Property
      </button>

      <hr />

      <button onClick={() => bookProperty(1, '1')} className="bg-green-600 text-white px-4 py-2 rounded">
        Book Property #1
      </button>
    </div>
  );
}
