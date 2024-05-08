import { Request, Response } from 'express';
// import { emailService } from '../../services';
// const logger = new Logger('storeOauthToken.ts');

const getRole = async (req: Request, res: Response) => {
    try {
        // const { code } = req.query as { code: string };
        // const { result, error } = await emailService.verifyAuthorizationCode(code);
        // if (error || !result) {
        //     return res.status(400).json({ error });
        // }

        // if(result.email !== 'info@thesocialcontinent.com'){
        //     return res.status(401).json({message:'Unauthorized'});
        // }

        // const storedTokens = emailService.saveTokensToFile(result.tokens);

        // if (!storedTokens) {
        //     return res.status(500).json({message: 'Failed to store tokens'});
        // }

        return res.status(200).json({message: 'Tokens stored successfully'});
    }
    catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}

export default getAccount;