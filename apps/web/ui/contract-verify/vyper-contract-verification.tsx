import { useState } from "react";

export function VyperContractVerificationPage({ contractAddress, contractName }) {
    const [compilerVersion, setCompilerVersion] = useState('latest'); // replace with actual default version
    const [vyperCode, setVyperCode] = useState('');
    const [abiEncodedArgs, setAbiEncodedArgs] = useState('');

    // TODO: Add handlers for each field

    return (
        <div>
            <h1>New Vyper Smart Contract Verification</h1>
            <form>
                <label>
                    Contract Address
                    <input type="text" value={contractAddress} disabled style={{ color: 'grey' }} />
                </label>
                <label>
                    Contract Name
                    <input type="text" value={contractName} disabled style={{ color: 'grey' }} />
                </label>
                <label>
                    Compiler
                    <select value={compilerVersion} onChange={e => setCompilerVersion(e.target.value)}>
                        <option value="latest">Latest</option>
                        {/* TODO: Add other options here */}
                    </select>
                </label>
                <label>
                    Enter the Vyper Contract Code
                    <textarea value={vyperCode} onChange={e => setVyperCode(e.target.value)} />
                </label>
                <label>
                    ABI-encoded Constructor Arguments
                    <input type="text" value={abiEncodedArgs} onChange={e => setAbiEncodedArgs(e.target.value)} />
                </label>
            </form>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <button style={{ backgroundColor: 'black', color: 'white', marginRight: '10px' }}>Verify & Publish</button>
                <button style={{ marginRight: '10px' }}>Restart</button>
                <button style={{ backgroundColor: 'white', color: 'black' }}>Cancel</button>
            </div>
        </div>
    );
}