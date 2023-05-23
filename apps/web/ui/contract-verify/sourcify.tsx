import { useState } from "react";

export default function Sourcify({ contractAddress }) {
    const [selectedFiles, setSelectedFiles] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    return (
        <div>
            <h1>New Smart Contract Verification</h1>
            <form>
                <label>
                    Contract Address
                    <input type="text" value={contractAddress} disabled style={{ color: 'grey' }} />
                </label>
                <label>
                    Sources and Metadata JSON
                    <input type="file" multiple onChange={handleFileChange} />
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
