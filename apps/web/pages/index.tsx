import { Button } from "ui";
import { ServiceManager } from "../lib/service-manager";
export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      <ul>
        {ServiceManager.listNetworks().map((value) => (
          <li>{value}</li>
        ))}
      </ul>
      <Button />
    </div>
  );
}
