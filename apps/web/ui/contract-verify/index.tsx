// pages/contractverifcation.js

const VerifyContract = () => {
  return (
    <div>
      <div className="h-20 w-full bg-slate-500">a</div>
      <div>
        <div>
          <p className="text-center text-blue-600">Verifier</p>
          <p>
            Verify smart contracts by recompiling with the Solidity source code
            and metadata.
          </p>
        </div>
        <div>
          <p>Upload Files</p>
          <p>
            Add the Solidity source files and metadata of all contracts you want
            to verify.
          </p>
          <div>
            <label htmlFor="file-upload" className="custom-file-upload">
              Custom Upload
            </label>
            <input id="file-upload" type="file" className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyContract;
