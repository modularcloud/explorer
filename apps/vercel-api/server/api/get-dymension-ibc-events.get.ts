import { getDymensionIBCTransfertEvents } from "~/lib/dymension-utils";

export default eventHandler(async () => {
  const events = await getDymensionIBCTransfertEvents();
  return Response.json(events);
});
