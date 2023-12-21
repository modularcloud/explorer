// TODO: delete this file

async function main() {
  let x = null;
  let y = 1766605;
  while (!x) {
    const z = await fetch(
      `https://froopyland.rpc.silknodes.io/tx_search?query="tx.height=${y}"`,
    ).then((a) => a.text());
    if (z.indexOf("forward") !== -1) x = y;
    console.log(x ? `Found ${x}` : `Trying ${--y}`);
  }
}
main();
