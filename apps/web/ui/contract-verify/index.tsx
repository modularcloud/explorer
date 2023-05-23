import { Card } from "../../../../packages/@modularcloud/design-system/components/card";
import { SetStateAction, useState } from "react";
import { useRouter } from 'next/router';

export function ContractVerify() {
    const router = useRouter();
    const [contractAddress, setContractAddress] = useState('0x1234...'); // replace with actual address
    const [verifyOption, setVerifyOption] = useState('');

    const handleOptionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setVerifyOption(event.target.value);
    };

    const handleNextButtonClick = () => {
        if (verifyOption === 'Via flattened source code') {
            router.push('/flattened-source-code');
        }
    };

    return (
        <Card type={""}>
            <h1>New Solidity Smart Contract Verification</h1>
            <form>
                <label>
                    Contract Address
                    <input type="text" value={contractAddress} disabled style={{ color: 'grey' }} />
                </label>
                <fieldset>
                    <legend>Verify</legend>
                    <label>
                        <input type="radio" value="Via flattened source code" checked={verifyOption === 'Via flattened source code'} onChange={handleOptionChange} />
                        Via flattened source code
                    </label>
                    <label>
                        <input type="radio" value="Via Standard Input JSON" checked={verifyOption === 'Via Standard Input JSON'} onChange={handleOptionChange} />
                        Via Standard Input JSON
                    </label>
                    <label>
                        <input type="radio" value="Via Sourcify: Sources and metadata JSON file" checked={verifyOption === 'Via Sourcify: Sources and metadata JSON file'} onChange={handleOptionChange} />
                        Via Sourcify: Sources and metadata JSON file
                    </label>
                    <label>
                        <input type="radio" value="Vyper contract" checked={verifyOption === 'Vyper contract'} onChange={handleOptionChange} />
                        Vyper contract
                    </label>
                </fieldset>
            </form>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <button style={{ backgroundColor: 'black', color: 'white', marginRight: '10px' }} onClick={handleNextButtonClick}>Next</button>
                <button style={{ backgroundColor: 'white', color: 'black' }}>Cancel</button>
            </div>
        </Card>
    );
}