import { VerifyAndUpload } from "./verifyAndUpload";

export default function VerifyContract() {
  return (
    <div className="min-h-screen bg-gray-100 bg-center bg-no-repeat">
      <div>
        <p className="pt-20 text-center  text-4xl font-bold">Verifier</p>
        <p className="text-center">
          Verify smart contracts by recompiling with the Solidity source code
          and metadata
        </p>
      </div>
      <div className="flex flex-col items-center">
        <VerifyAndUpload />
      </div>
    </div>
  );
}