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
        <p className="pt-14 text-center text-4xl font-bold  text-[#1D2939]  xl:pt-20">
          Verifier
        </p>
        <div className=" tab:flex items-center justify-center pt-3 text-center     text-[#344054] ">
          <p>
            Verify smart contracts by recompiling with the Solidity source code
            and metadata.
          </p>
          <a
            href="https://docs.modular.cloud/verification"
            target="_blank"
            className="bold pl-1 text-[#7B6FE7] hover:cursor-pointer hover:underline"
            rel="noreferrer"
          >
            Learn more
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <VerifyAndUpload />
      </div>
    </div>
  );
}
