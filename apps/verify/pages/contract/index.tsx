import VerifyAndUpload from "../../ui/verifyAndUpload";

export default function Contract() {
  return (
    <div className=" bg-gray-100 ">
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
