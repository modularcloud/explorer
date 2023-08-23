export function convertWeiToNativeToken(
  wei: string | number,
  nativeTokenSymbol: string
) {
  const value = Number(wei) / Math.pow(10, 18);
  // Remove trailing zeros after decimal point
  const valueStr = value.toFixed(18).replace(/\.?0+$/, "");
  return `${valueStr} ${nativeTokenSymbol}`;
}

export function convertWeiToBestUnit(
  wei: string | number,
  nativeTokenSymbo: string
) {
  const weiNumber = Number(wei);
  if (weiNumber < 1000000000) {
    return `${weiNumber} wei`;
  }
  if (weiNumber < 1000000000000) {
    return `${weiNumber / 1000000000} Gwei`;
  }
  return `${weiNumber / 10e18} ${nativeTokenSymbo}`;
}

export function convertWeiToUSD(
  wei: string | number,
  nativeTokenValue: number,
  eNotation = false
) {
  const value = Number(wei) / Math.pow(10, 18);
  const usdValue = value * nativeTokenValue;

  if (eNotation) {
    return `$${usdValue.toExponential(2)}`;
  }

  // If the result is less than $0.01 but greater than 0, show one significant digit
  if (usdValue > 0 && usdValue < 0.01) {
    const significantDigits = Math.ceil(-Math.log10(usdValue));
    return `$${usdValue.toFixed(significantDigits)}`;
  }
  return `$${usdValue.toFixed(2)}`;
}
