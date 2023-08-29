import axios, { AxiosResponse } from "axios";
import JSZip from "jszip";

const readRemoteFile = async (url: string): Promise<void> => {
  try {
    const response: AxiosResponse<ArrayBuffer> = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const buffer: Uint8Array = new Uint8Array(response.data);

    if (buffer[0] === 0x50 && buffer[1] === 0x4b) {
      const zip = new JSZip();
      await zip.loadAsync(response.data);

      zip.forEach((relativePath, zipEntry) => {
        zipEntry.async("text").then((content: string) => {
          console.log(`File: ${relativePath}, Content: ${content}`);
        });
      });
    } else {
      const content: string = new TextDecoder().decode(buffer);
      console.log(`File: ${url}, Content: ${content}`);
    }
  } catch (err: any) {
    console.error(`Failed to read remote file from ${url}`, err.message);
  }
};

export default readRemoteFile;
