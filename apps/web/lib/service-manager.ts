import { addNetwork, listNetworks } from "service-manager/manager";

addNetwork({ label: "Celestia" });
addNetwork({ label: "Dymension" });

export const ServiceManager = {
  listNetworks,
};
