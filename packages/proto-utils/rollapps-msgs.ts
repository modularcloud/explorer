import * as _0 from './rollapps-out/go-ibc/ibc/lightclients/wasm/v1/tx';
import * as _1 from './rollapps-out/go-ibc/ibc/lightclients/wasm/v1/tx';
import * as _2 from './rollapps-out/go-ibc/ibc/lightclients/wasm/v1/tx';
import * as _3 from './rollapps-out/go-ibc/ibc/core/connection/v1/tx';
import * as _4 from './rollapps-out/go-ibc/ibc/core/connection/v1/tx';
import * as _5 from './rollapps-out/go-ibc/ibc/core/connection/v1/tx';
import * as _6 from './rollapps-out/go-ibc/ibc/core/connection/v1/tx';
import * as _7 from './rollapps-out/go-ibc/ibc/core/connection/v1/tx';
import * as _8 from './rollapps-out/go-ibc/ibc/core/client/v1/tx';
import * as _9 from './rollapps-out/go-ibc/ibc/core/client/v1/tx';
import * as _10 from './rollapps-out/go-ibc/ibc/core/client/v1/tx';
import * as _11 from './rollapps-out/go-ibc/ibc/core/client/v1/tx';
import * as _12 from './rollapps-out/go-ibc/ibc/core/client/v1/tx';
import * as _13 from './rollapps-out/go-ibc/ibc/core/client/v1/tx';
import * as _14 from './rollapps-out/go-ibc/ibc/core/client/v1/tx';
import * as _15 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _16 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _17 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _18 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _19 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _20 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _21 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _22 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _23 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _24 from './rollapps-out/go-ibc/ibc/core/channel/v1/tx';
import * as _25 from './rollapps-out/go-ibc/ibc/applications/transfer/v1/tx';
import * as _26 from './rollapps-out/go-ibc/ibc/applications/transfer/v1/tx';
import * as _27 from './rollapps-out/go-ibc/ibc/applications/interchain_accounts/host/v1/tx';
import * as _28 from './rollapps-out/go-ibc/ibc/applications/interchain_accounts/controller/v1/tx';
import * as _29 from './rollapps-out/go-ibc/ibc/applications/interchain_accounts/controller/v1/tx';
import * as _30 from './rollapps-out/go-ibc/ibc/applications/interchain_accounts/controller/v1/tx';
import * as _31 from './rollapps-out/go-ibc/ibc/applications/fee/v1/tx';
import * as _32 from './rollapps-out/go-ibc/ibc/applications/fee/v1/tx';
import * as _33 from './rollapps-out/go-ibc/ibc/applications/fee/v1/tx';
import * as _34 from './rollapps-out/go-ibc/ibc/applications/fee/v1/tx';
import * as _35 from './rollapps-out/dymension-rdk/sequencers/tx';

export type MsgType =   | { parser: typeof _0.MsgStoreCode, typeUrl: '/ibc.lightclients.wasm.v1.MsgStoreCode' }
  | { parser: typeof _1.MsgRemoveChecksum, typeUrl: '/ibc.lightclients.wasm.v1.MsgRemoveChecksum' }
  | { parser: typeof _2.MsgMigrateContract, typeUrl: '/ibc.lightclients.wasm.v1.MsgMigrateContract' }
  | { parser: typeof _3.MsgConnectionOpenInit, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenInit' }
  | { parser: typeof _4.MsgConnectionOpenTry, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry' }
  | { parser: typeof _5.MsgConnectionOpenAck, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenAck' }
  | { parser: typeof _6.MsgConnectionOpenConfirm, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenConfirm' }
  | { parser: typeof _7.MsgUpdateParams, typeUrl: '/ibc.core.connection.v1.MsgUpdateParams' }
  | { parser: typeof _8.MsgCreateClient, typeUrl: '/ibc.core.client.v1.MsgCreateClient' }
  | { parser: typeof _9.MsgUpdateClient, typeUrl: '/ibc.core.client.v1.MsgUpdateClient' }
  | { parser: typeof _10.MsgUpgradeClient, typeUrl: '/ibc.core.client.v1.MsgUpgradeClient' }
  | { parser: typeof _11.MsgSubmitMisbehaviour, typeUrl: '/ibc.core.client.v1.MsgSubmitMisbehaviour' }
  | { parser: typeof _12.MsgRecoverClient, typeUrl: '/ibc.core.client.v1.MsgRecoverClient' }
  | { parser: typeof _13.MsgIBCSoftwareUpgrade, typeUrl: '/ibc.core.client.v1.MsgIBCSoftwareUpgrade' }
  | { parser: typeof _14.MsgUpdateParams, typeUrl: '/ibc.core.client.v1.MsgUpdateParams' }
  | { parser: typeof _15.MsgChannelOpenInit, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenInit' }
  | { parser: typeof _16.MsgChannelOpenTry, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenTry' }
  | { parser: typeof _17.MsgChannelOpenAck, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenAck' }
  | { parser: typeof _18.MsgChannelOpenConfirm, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenConfirm' }
  | { parser: typeof _19.MsgChannelCloseInit, typeUrl: '/ibc.core.channel.v1.MsgChannelCloseInit' }
  | { parser: typeof _20.MsgChannelCloseConfirm, typeUrl: '/ibc.core.channel.v1.MsgChannelCloseConfirm' }
  | { parser: typeof _21.MsgRecvPacket, typeUrl: '/ibc.core.channel.v1.MsgRecvPacket' }
  | { parser: typeof _22.MsgTimeout, typeUrl: '/ibc.core.channel.v1.MsgTimeout' }
  | { parser: typeof _23.MsgTimeoutOnClose, typeUrl: '/ibc.core.channel.v1.MsgTimeoutOnClose' }
  | { parser: typeof _24.MsgAcknowledgement, typeUrl: '/ibc.core.channel.v1.MsgAcknowledgement' }
  | { parser: typeof _25.MsgTransfer, typeUrl: '/ibc.applications.transfer.v1.MsgTransfer' }
  | { parser: typeof _26.MsgUpdateParams, typeUrl: '/ibc.applications.transfer.v1.MsgUpdateParams' }
  | { parser: typeof _27.MsgUpdateParams, typeUrl: '/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams' }
  | { parser: typeof _28.MsgRegisterInterchainAccount, typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount' }
  | { parser: typeof _29.MsgSendTx, typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx' }
  | { parser: typeof _30.MsgUpdateParams, typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams' }
  | { parser: typeof _31.MsgRegisterPayee, typeUrl: '/ibc.applications.fee.v1.MsgRegisterPayee' }
  | { parser: typeof _32.MsgRegisterCounterpartyPayee, typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee' }
  | { parser: typeof _33.MsgPayPacketFee, typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFee' }
  | { parser: typeof _34.MsgPayPacketFeeAsync, typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFeeAsync' }
  | { parser: typeof _35.MsgCreateSequencer, typeUrl: '/rollapp.sequencers.types.MsgCreateSequencer' };
export const Msgs: MsgType[] = [
  { parser: _0.MsgStoreCode, typeUrl: '/ibc.lightclients.wasm.v1.MsgStoreCode' },
  { parser: _1.MsgRemoveChecksum, typeUrl: '/ibc.lightclients.wasm.v1.MsgRemoveChecksum' },
  { parser: _2.MsgMigrateContract, typeUrl: '/ibc.lightclients.wasm.v1.MsgMigrateContract' },
  { parser: _3.MsgConnectionOpenInit, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenInit' },
  { parser: _4.MsgConnectionOpenTry, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry' },
  { parser: _5.MsgConnectionOpenAck, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenAck' },
  { parser: _6.MsgConnectionOpenConfirm, typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenConfirm' },
  { parser: _7.MsgUpdateParams, typeUrl: '/ibc.core.connection.v1.MsgUpdateParams' },
  { parser: _8.MsgCreateClient, typeUrl: '/ibc.core.client.v1.MsgCreateClient' },
  { parser: _9.MsgUpdateClient, typeUrl: '/ibc.core.client.v1.MsgUpdateClient' },
  { parser: _10.MsgUpgradeClient, typeUrl: '/ibc.core.client.v1.MsgUpgradeClient' },
  { parser: _11.MsgSubmitMisbehaviour, typeUrl: '/ibc.core.client.v1.MsgSubmitMisbehaviour' },
  { parser: _12.MsgRecoverClient, typeUrl: '/ibc.core.client.v1.MsgRecoverClient' },
  { parser: _13.MsgIBCSoftwareUpgrade, typeUrl: '/ibc.core.client.v1.MsgIBCSoftwareUpgrade' },
  { parser: _14.MsgUpdateParams, typeUrl: '/ibc.core.client.v1.MsgUpdateParams' },
  { parser: _15.MsgChannelOpenInit, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenInit' },
  { parser: _16.MsgChannelOpenTry, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenTry' },
  { parser: _17.MsgChannelOpenAck, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenAck' },
  { parser: _18.MsgChannelOpenConfirm, typeUrl: '/ibc.core.channel.v1.MsgChannelOpenConfirm' },
  { parser: _19.MsgChannelCloseInit, typeUrl: '/ibc.core.channel.v1.MsgChannelCloseInit' },
  { parser: _20.MsgChannelCloseConfirm, typeUrl: '/ibc.core.channel.v1.MsgChannelCloseConfirm' },
  { parser: _21.MsgRecvPacket, typeUrl: '/ibc.core.channel.v1.MsgRecvPacket' },
  { parser: _22.MsgTimeout, typeUrl: '/ibc.core.channel.v1.MsgTimeout' },
  { parser: _23.MsgTimeoutOnClose, typeUrl: '/ibc.core.channel.v1.MsgTimeoutOnClose' },
  { parser: _24.MsgAcknowledgement, typeUrl: '/ibc.core.channel.v1.MsgAcknowledgement' },
  { parser: _25.MsgTransfer, typeUrl: '/ibc.applications.transfer.v1.MsgTransfer' },
  { parser: _26.MsgUpdateParams, typeUrl: '/ibc.applications.transfer.v1.MsgUpdateParams' },
  { parser: _27.MsgUpdateParams, typeUrl: '/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams' },
  { parser: _28.MsgRegisterInterchainAccount, typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgRegisterInterchainAccount' },
  { parser: _29.MsgSendTx, typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx' },
  { parser: _30.MsgUpdateParams, typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgUpdateParams' },
  { parser: _31.MsgRegisterPayee, typeUrl: '/ibc.applications.fee.v1.MsgRegisterPayee' },
  { parser: _32.MsgRegisterCounterpartyPayee, typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee' },
  { parser: _33.MsgPayPacketFee, typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFee' },
  { parser: _34.MsgPayPacketFeeAsync, typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFeeAsync' },
  { parser: _35.MsgCreateSequencer, typeUrl: '/rollapp.sequencers.types.MsgCreateSequencer' },
];