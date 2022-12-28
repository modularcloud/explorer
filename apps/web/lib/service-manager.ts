import { createServiceManager } from "service-manager/manager";

export const ServiceManager = createServiceManager();

ServiceManager.addNetwork({ label: "Celestia" });
ServiceManager.addNetwork({ label: "Dymension" });
