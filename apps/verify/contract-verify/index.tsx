export function ContractVerify() {
  return (
    <div>
      <h1>Code</h1>
      <h2>Contract Byte Code</h2>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{ marginRight: "10px" }}>Copy Contract Bytecode</button>
        <button style={{ backgroundColor: "black", color: "white" }}>
          Verify & Publish
        </button>
      </div>
    </div>
  );
}
