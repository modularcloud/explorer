import BigNumber from "bignumber.js";

export function convertWeiToNativeToken(
  wei: string | number,
  nativeTokenSymbol: string
) {
  const value = new BigNumber(wei).dividedBy(new BigNumber(Math.pow(10, 18)));
  // Remove trailing zeros after decimal point
  const valueStr = value.toFixed(18).replace(/\.?0+$/, "");
  return `${valueStr} ${nativeTokenSymbol}`;
}

export function convertWeiToBestUnit(
  wei: string | number,
  nativeTokenSymbo: string
) {
  const weiNumber = new BigNumber(wei);
  if (weiNumber.isLessThan(new BigNumber(1000000000))) {
    return `${weiNumber.toString()} wei`;
  }
  if (weiNumber.isLessThan(new BigNumber(1000000000000))) {
    return `${weiNumber.dividedBy(new BigNumber(1000000000)).toString()} Gwei`;
  }
  return `${weiNumber.dividedBy(new BigNumber(10e18)).toString()} ${nativeTokenSymbo}`;
}

export function convertWeiToUSD(
  wei: string | number,
  nativeTokenValue: number,
  eNotation = false
) {
  const value = new BigNumber(wei).dividedBy(new BigNumber(Math.pow(10, 18)));
  const usdValue = value.multipliedBy(new BigNumber(nativeTokenValue));

  if (eNotation) {
    return `$${usdValue.toExponential(2)}`;
  }

  // If the result is less than $0.01 but greater than 0, show one significant digit
  if (usdValue.isGreaterThan(new BigNumber(0)) && usdValue.isLessThan(new BigNumber(0.01))) {
    const significantDigits = Math.ceil(-Math.log10(usdValue.toNumber()));
    return `$${usdValue.toFixed(significantDigits)}`;
  }
  return `$${usdValue.toFixed(2)}`;
}

