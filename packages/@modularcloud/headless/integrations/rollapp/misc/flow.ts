let _getAllIntegrationsCache: any = null;
export async function getAllIntegrations() {
  _getAllIntegrationsCache =
    _getAllIntegrationsCache ??
    (await fetch(
      `${process.env.INTERNAL_INTEGRATION_API_URL}/integrations-summary?returnAll=true&maxResults=5000`,
    ).then((res) => res.json()));
  return _getAllIntegrationsCache;
}

export async function getIntegrationByChannel(channel: string) {
  const integrations = await getAllIntegrations();
  return integrations.result.integrations.find(
    (i: any) => i.config?.platformData?.appData?.ibcHubChannel === channel,
  );
}

export async function printRollappTokenAmountDenom(
  sourceChannel: string,
  amount: string,
) {
  const integration = await getIntegrationByChannel(sourceChannel);
  if (!integration) return;
  return `${Number(amount) / 10 ** integration.config.token.decimals} ${
    integration.config.token.name
  }`;
}

export async function isOneHopIBC(txstr: string) {

}