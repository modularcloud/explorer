import { useState } from "react";

export function StandardJSONInputPage({ contractAddress }) {
    const [contractName, setContractName] = useState('');
    const [includeNightlyBuilds, setIncludeNightlyBuilds] = useState(false);
    const [compilerVersion, setCompilerVersion] = useState('latest'); // replace with actual default version
    const [standardInputJSON, setStandardInputJSON] = useState('');
    const [fetchConstructorArgs, setFetchConstructorArgs] = useState(false);
    const [abiEncodedArgs, setAbiEncodedArgs] = useState('');

    // TODO: Add handlers for each field

    return (
        <div>
            <h1>Standard JSON Input Verification</h1>
            <form>
                <label>
                    Contract Address
                    <input type="text" value={contractAddress} disabled style={{ color: 'grey' }} />
                </label>
                <label>
                    Contract Name
                    <input type="text" value={contractName} onChange={e => setContractName(e.target.value)} />
                </label>
                <label>
                    Include Nightly Builds
                    <input type="radio" value="yes" checked={includeNightlyBuilds} onChange={() => setIncludeNightlyBuilds(true)} /> Yes
                    <input type="radio" value="no" checked={!includeNightlyBuilds} onChange={() => setIncludeNightlyBuilds(false)} /> No
                </label>
                <label>
                    Compiler
                    <select value={compilerVersion} onChange={e => setCompilerVersion(e.target.value)}>
                        <option value="latest">Latest</option>
                        {/* TODO: Add other options here */}
                    </select>
                </label>
                <label>
                    Standard Input JSON
                    <input type="file" onChange={e => setStandardInputJSON(e.target.files[0])} />
                </label>
                <label>
                    Try to fetch constructor arguments automatically
                    <input type="radio" value="yes" checked={fetchConstructorArgs} onChange={() => setFetchConstructorArgs(true)} /> Yes
                    <input type="radio" value="no" checked={!fetchConstructorArgs} onChange={() => setFetchConstructorArgs(false)} /> No
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
