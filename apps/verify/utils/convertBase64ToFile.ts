import { decode } from "base64-arraybuffer";
function convertBase64ToFile(base64: string, fileName: string): File {
  const decodedRawFile = decode(base64);
  const file = new File([new Blob([decodedRawFile])], fileName);
  return file;
}
export default convertBase64ToFile;
