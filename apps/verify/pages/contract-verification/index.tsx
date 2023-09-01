import VerifyAndUpload from "../../ui/verifyAndUpload";

export default function ContractVerifier() {
  return (
    <div className="">
      <div>
        <p className="pt-14 xl:pt-20 text-center text-[#1D2939]  text-4xl  font-bold">
          Verifier
        </p>
        <p className="text-center  text-[#344054]">
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
