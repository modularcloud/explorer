import axios, { AxiosResponse } from "axios";
import JSZip from "jszip";

export type fileInfo = {
  fileName: string;
  rawFile: string;
};
const readRemoteFile = async (url: string): Promise<fileInfo[] | null> => {
  try {
    let filesInfo: fileInfo[] = [];
    const response: AxiosResponse<ArrayBuffer> = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const buffer: Uint8Array = new Uint8Array(response.data);

    if (buffer[0] === 0x50 && buffer[1] === 0x4b) {
      const zip = new JSZip();
      await zip.loadAsync(response.data);

      zip.forEach(async (relativePath, zipEntry) => {
        const contentArrayBuffer = await zipEntry.async("arraybuffer");
        const uint8Array = new Uint8Array(contentArrayBuffer);
        filesInfo.push({
          fileName: relativePath,
          rawFile: Buffer.from(uint8Array).toString("base64"),
        });
      });
    } else {
      const fileName = url.split("/")[url.split("/").length - 1];
      filesInfo.push({
        fileName: fileName,
        rawFile: Buffer.from(buffer).toString("base64"),
      });
    }
    return filesInfo;
  } catch (err: any) {
    console.error(`Failed to read remote file from ${url}`, err.message);
    return null;
  }
};

export default readRemoteFile;
