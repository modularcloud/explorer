interface Props {
  value: string;
}

export const BoxedValue = ({ value }: Props) => {
  return (
    <span
      style={{
        display: "flex",
        width: "108px",
        height: "28px",
        fontSize: "12",
        fontWeight: 500,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "4px",
        backgroundColor: "#d9d9d9",
      }}
    >
      {value}
    </span>
  );
};
