# Overall Project Architecture and Overview

This repository contains five sub-repositories with the following purposes:

- **contracts:** Contains a vulnerable smart contract with a reentrancy attack vulnerability.
- **analyzer:** Contains code that identifies vulnerabilities in smart contracts using Slither and adds the report analysis to the database. It includes two APIs to retrieve detailed reports of open issues.
- **front-running-service:** Contains code to monitor pending transactions of contracts in the mempool and detect patterns indicative of potential front-running attack. If a suspicious transaction is detected, it pauses the smart contract and adjusts dynamic gas fees accordingly.
- **notification-service:** Contains code to monitor contracts for specific vulnerable patterns(reentrancy atatck) related to suspicious transactions and notify the recipient about such transactions.
- **assets:** Contains all architecture diagrams related to the repositories.

## 1. analyzer
### Installation and Dependency
#### Install Solidity Compiler and Slither(https://github.com/crytic/slither) 
```
npm install -g solc
```
```
pip3 install slither-analyzer
```
Please have look to above link for installation of slither and add solidity Compiler.

Add The Smart Contract in contract folder inside analyzer
#### Use Below command to provide path of smart contract and run the slither.py (Install Python3)
```
python3 getReport.py <Input File Path> <Output File Path>  
```
#### Install Server Dependency
```
yarn install
```
#### Add the env File (.env.local)
```
# postgresql db for analzer api db
PG_API_USER=
PG_API_HOST=
PG_API_PASSWORD=
PG_API_DATABASE=
PG_API_PORT=5432
```
#### Run the Server 
```
yarn dev local
```
#### API 
1. API End Point for Open Issue
http://localhost:3000/openissues/:id
This will provide the overall report of open issues with issue Ids

2. API End Point to get details information regarding open issue with issue `id`
http://localhost:3000/issuedetails/:id
This will provide the overall details specific to issue id

![Analyzer's Architecture](/assets/analyzer.png)

## 2. Front Running Service 
![Front-Running-Service's Architecture](/assets/front-running-service.png)
This project focuses on monitoring pending transactions of smart contracts to detect potential front-running attacks. Here’s a simplified breakdown of how it works:

- **Tracking Transactions:** The system keeps an eye on all pending transactions and temporarily stores them in memory using the FrontRunningAttack interface.

- **Detection Mechanism:** For each new transaction, it compares the function signature and gas fee against the transactions already in memory. If a new transaction’s gas fee is more than 10% higher than similar pending transactions with the same function signature, it may suggest an attempt to push through the transaction ahead of others—a common tactic in front-running attacks.

- **Attack Pattern Interface:**The project includes an Interface folder where you can define different attack patterns. This setup allows the service to check for various patterns and identify suspicious transactions accordingly.

Overall, the goal is to improve the security of smart contracts by detecting and addressing potential front-running attacks before they can cause issues.

### Installation
```
yarn install
```
#### Add the env File (.env.local)
```
# provider urls
PROVIDER_URL=
# private keys
TRUSTED_SENDER_PRIVATE_KEY=
# monitor contract address
MONITOR_CONTRACT_ADDRESS=0x93d58B7580BBd8aa91A24aAD6d97562913CE80Aa
```
#### Run the Server 
```
yarn dev local
```

## 3. Notification Service 
![Notification-Service's Architecture](/assets/notification-service.png)

This project focuses on monitoring pending transactions of smart contracts to detect potential reentrancy attacks and send notification when someone try to exploit it. Here’s a simplified breakdown of how it works:

- **Tracking Transactions:**The system monitors all pending transactions of the specified contract.

- **Detection Mechanism:** For each pending transaction of the monitored contract, it checks the gas limit provided by the sender and the estimated gas fees for executing the withdraw function. If the sender has provided more than 2.5 times the estimated gas fees, it might indicate a potential reentrancy attack, as the transaction has been allocated more computational resources than required for a simple transaction. This makes it a suspicious transaction for a reentrancy attack. Once a suspicious transaction is captutred, alert is triggered and notification is send to recipents on email through SMTP Host Server.

Overall, the goal is to improve the security of smart contracts by detecting and addressing potential reentrancy attacks before they can cause issues.

### Installation
```
yarn install
```
#### Add the env File (.env.local)
```
# provider urls
PROVIDER_URL=
# private keys
TRUSTED_SENDER_PRIVATE_KEY=

# monitor contract address
MONITOR_CONTRACT_ADDRESS=

# SMTP Host Details 
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
ALERT_EMAIL_RECIPIENT=

```
#### Run the Server 
```
yarn dev local
```

## Proposed Overall Architecture for live detection and metigation of attack using LLM Models 
![Proposed Overall Architecture Using LLM](/assets/proposed-overall-architecture-using-llm.png)
Our proposed solution aims to enhance blockchain security by detecting and mitigating attacks in real-time. This approach involves monitoring pending transactions, applying specific filters, and using a trained model to identify suspicious patterns. The system can then take appropriate actions, such as changing the state of a smart contract or sending notifications.
- **Trained LLM Model:** Trained a LLM Model or develop own model on implementing transformers that has been developed using historical transaction data, including both normal transactions and past attack patterns.
- **Overall Flow:**
- **Collect Pending Transactions from the Mempool:**Continuously monitor and gather pending transactions from the blockchain mempool.
- **Apply Monitoring Filters:**Implement filters to select transactions that require closer based on montior predefined rules such smart contract address, signature of function specific to contract.**
- **Analyze Transactions with Trained LLM Model:** Feed the filtered transactions into a trained model.

- **Detect Suspicious Patterns:**
The model analyzes the live transactions in the context of past pending transaction that are recently feeded to detect any suspicious patterns indicative of potential attacks.
- **Execute Appropriate Actions:**
Based on the model’s analysis, determine the appropriate response:
**1.State Change in Smart Contract:**
If the transaction is identified as a high-priority threat, initiate a state change in the relevant smart contract to prevent the attack using sessions keys approved by authorized party or send a request for sender approval.
**2.Notification Alert:**
Send an alert to the relevant stakeholders to inform them of the detected suspicious transaction. 
**3Both:**
Execute both the state change in the smart contract using permission signers(Session Keys) of actual owners and send a notification alert to ensure immediate response to recipients.
This could be a possible or more robust way to enhance the security of blockchain transactions, providing real-time detection and mitigation of potential attacks.
