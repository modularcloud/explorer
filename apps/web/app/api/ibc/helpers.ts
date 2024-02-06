export function parseTransfer(events: any) {
  const sendPacket = events.find(
    (e: any) => e.type === "send_packet",
  ).attributes;
  const packetSequence = sendPacket.find(
    (a: any) => a.key === "packet_sequence",
  ).value;
  const packetDstChannel = sendPacket.find(
    (a: any) => a.key === "packet_dst_channel",
  ).value;
  const packetSrcChannel = sendPacket.find(
    (a: any) => a.key === "packet_src_channel",
  ).value;
  const packetData = JSON.parse(
    sendPacket.find((a: any) => a.key === "packet_data").value,
  );
  const memo = packetData.memo ? JSON.parse(packetData.memo) : null;

  if (memo) {
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
      hops: 2,
    };
  } else {
    return {
      from: {
        chain: packetDstChannel,
        address: packetData.sender,
      },
      to: {
        chain: packetSrcChannel,
        address: packetData.receiver,
      },
      amount: packetData.amount,
      denom: packetData.denom,
      sequence: packetSequence,
      hops: 1,
    };
  }
}

export function parseRecv(events: any) {
  const recvPacket = events.find((e: any) => e.type === "recv_packet");
  const packetData = JSON.parse(
    recvPacket.attributes.find((a: any) => a.key === "packet_data").value,
  );
  const packetSequence = recvPacket.attributes.find(
    (a: any) => a.key === "packet_sequence",
  ).value;
  const packetDstChannel = recvPacket.attributes.find(
    (a: any) => a.key === "packet_dst_channel",
  ).value;
  if (packetData.memo) {
    const memo = JSON.parse(packetData.memo);

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
      hops: 2,
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
    from: {},
    penultimateChannel: packetDstChannel,
    amount: packetData.amount,
    denom: packetData.denom,
    backwardSequence: packetSequence,
    sequence: packetSequence,
  };
}

export function parseAcknowledgement(events: any) {
  const writeAcknowledgement = events.find(
    (e: any) => e.type === "write_acknowledgement",
  );
  const isHub = !!writeAcknowledgement;
  if (isHub) {
    const packetData = JSON.parse(
      writeAcknowledgement.attributes.find((a: any) => a.key === "packet_data")
        .value,
    );
    const memo = packetData.memo ? JSON.parse(packetData.memo) : null;
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
    if (memo) {
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
        hops: 2,
      };
    } else {
      return {
        from: {
          chain: packetDstChannel,
          address: packetData.receiver,
        },
        to: {
          chain: packetSrcChannel,
          address: packetData.sender,
        },
        amount: packetData.amount,
        denom: packetData.denom,
        sequence: forwardSequence,
        hops: 1,
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
    to: {},
    backwardSequence: packetSequence,
    sequence: packetSequence,
  };
}

export enum Step {
  ROLLAPP_TR = "ROLLAPP_TR",
  HUB_RECV = "HUB_RECV",
  ROLLAPP_RECV = "ROLLAPP_RECV",
  HUB_ACK = "HUB_ACK",
  ROLLAPP_ACK = "ROLLAPP_ACK",
  CHAIN_TR = "CHAIN_TR",
  CHAIN_RECV = "CHAIN_RECV",
  CHAIN_ACK = "CHAIN_ACK",
}
