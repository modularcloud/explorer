export function parseTransfer(events: any) {
  const sendPacket = events.find(
    (e: any) => e.type === "send_packet",
  ).attributes;
  const packetData = JSON.parse(
    sendPacket.find((a: any) => a.key === "packet_data").value,
  );
  const memo = JSON.parse(packetData.memo);
  const packetSequence = sendPacket.find(
    (a: any) => a.key === "packet_sequence",
  ).value;
  const packetDstChannel = sendPacket.find(
    (a: any) => a.key === "packet_dst_channel",
  ).value;
  return {
    from: {
      chain: packetDstChannel,
      address: packetData.sender,
    },
    to: {
      chain: memo.forward.channel,
      address: memo.forward.receiver,
    },
    amount: packetData.amount,
    denom: packetData.denom,
    forwardSequence: packetSequence,
  };
}

export function parseRecv(events: any) {
  const recvPacket = events.find((e: any) => e.type === "recv_packet");
  const packetData = JSON.parse(
    recvPacket.attributes.find((a: any) => a.key === "packet_data").value,
  );
  const isHub = !!packetData.memo;
  const packetSequence = recvPacket.attributes.find(
    (a: any) => a.key === "packet_sequence",
  ).value;

  if (isHub) {
    const memo = isHub ? JSON.parse(packetData.memo) : null;
    const packetDstChannel = recvPacket.attributes.find(
      (a: any) => a.key === "packet_dst_channel",
    ).value;

    return {
      from: {
        chain: packetDstChannel,
        address: packetData.sender,
      },
      to: {
        chain: memo.forward.channel,
        address: memo.forward.receiver,
      },
      amount: packetData.amount,
      denom: packetData.denom,
      forwardSequnce: packetSequence,
    };
  }
  const packetSrcChannel = recvPacket.attributes.find(
    (a: any) => a.key === "packet_src_channel",
  ).value;
  return {
    to: {
      chain: packetSrcChannel,
      address: packetData.receiver,
    },
    amount: packetData.amount,
    denom: packetData.denom,
    backwardSequence: packetSequence,
  };
}

export function parseAcknowledgement(events: any) {
  console.log(JSON.stringify(events, null, 2));
  const writeAcknowledgement = events.find(
    (e: any) => e.type === "write_acknowledgement",
  );
  const isHub = !!writeAcknowledgement;
  if (isHub) {
    const packetData = JSON.parse(
      writeAcknowledgement.attributes.find((a: any) => a.key === "packet_data")
        .value,
    );
    const memo = isHub ? JSON.parse(packetData.memo) : null;
    const forwardSequence = writeAcknowledgement.attributes.find(
      (a: any) => a.key === "packet_sequence",
    ).value;
    const packetDstChannel = writeAcknowledgement.attributes.find(
      (a: any) => a.key === "packet_dst_channel",
    ).value;
    const acknowledgePacket = events.find(
      (e: any) => e.type === "acknowledge_packet",
    );
    const packetSrcChannel = acknowledgePacket.attributes.find(
      (a: any) => a.key === "packet_src_channel",
    ).value;
    const backwardSequence = acknowledgePacket.attributes.find(
      (a: any) => a.key === "packet_sequence",
    ).value;
    if (isHub) {
      return {
        from: {
          chain: packetDstChannel,
          address: memo.forward.receiver,
        },
        to: {
          chain: packetSrcChannel,
          address: packetData.sender,
        },
        amount: packetData.amount,
        denom: packetData.denom,
        forwardSequence,
        backwardSequence,
      };
    }
  }
  const acknowledgePacket = events.find(
    (e: any) => e.type === "acknowledge_packet",
  );
  const packetDstChannel = acknowledgePacket.attributes.find(
    (a: any) => a.key === "packet_dst_channel",
  ).value;
  const packetSequence = acknowledgePacket.attributes.find(
    (a: any) => a.key === "packet_sequence",
  ).value;
  return {
    from: {
      chain: packetDstChannel,
    },
    backwardSequence: packetSequence,
  };
}

export enum Step {
  ROLLAPP_TR = "ROLLAPP_TR",
  HUB_RECV = "HUB_RECV",
  ROLLAPP_RECV = "ROLLAPP_RECV",
  HUB_ACK = "HUB_ACK",
  ROLLAPP_ACK = "ROLLAPP_ACK",
}
