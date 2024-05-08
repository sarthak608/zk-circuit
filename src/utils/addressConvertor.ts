import { ethers } from 'ethers';
import canonicalize from 'canonicalize';

export function publicKeyToAddress(publicKey: string): string {
  try {
    const address = ethers.computeAddress('0x' + publicKey);
    return address;
  } catch (error) {
    throw new Error('Invalid public key');
  }
}

