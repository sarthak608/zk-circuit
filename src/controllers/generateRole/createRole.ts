import { Request, Response } from 'express';
import { publicKeyToAddress } from '../../utils';
import { ethers } from 'ethers';

import { verifyUserIdToken, contracts } from '../../helpers';
const createRole = async (req: Request, res: Response) => {
    try {
        const { idToken } = req.body;
        if (!idToken) return res.status(400).json({ message: 'idToken is required' });

        // verify idToken
        const { result, error } = await verifyUserIdToken(idToken);
        console.log("result", result);
        if (error || !result) {
            return res.status(400).json({ message: error ? error : 'Something went wrong' });
        }
        //get wallet address from public key
        const walletaddress = publicKeyToAddress(result.publicKey) as `0x${string}`;
        console.log('walletaddress: ' + walletaddress);
        if (!walletaddress) {
            return res.status(400).json({ message: 'Something went wrong with getting wallet address from public key.' });
        }
        // if already exist smart acccount, handle case below

        // write call for creating account on zkSync
        // const resultAccount = await contracts.createAccount(result.publicKey);
        const wallet = ethers.Wallet.createRandom();
        console.log("wallet.publicKey", wallet.publicKey)
        const resultAccount = await contracts.createAccount(wallet.publicKey);
        console.log("resultAccount", resultAccount);
        if (!resultAccount) {
            return res.status(505).json({ message: 'account does not created' });

        }
        return res.status(200).json({ message: 'successsfully created account', resultAccount });

    } catch (error) {
        return res.status(500).json({ message: 'Error adding email to waitlist' });
    }
}

export default createRole;