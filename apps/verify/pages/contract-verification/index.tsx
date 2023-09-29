import VerifyAndUpload from "../../ui/verifyAndUpload";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export default function ContractVerifier() {
  return (
    <div className={` ${inter.variable} font-sans `}>
      <div>
        <p className="pt-14 xl:pt-20 text-center text-[#1D2939]  text-4xl  font-bold">
          Verifier
        </p>
        <p className="text-center pt-3 text-[#344054]">
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
