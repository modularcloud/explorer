import { decode } from "base64-arraybuffer";
function convertBase64ToFile(base64: string, fileName: string): File {
  let decodedRawFile = decode(base64);
  let file = new File([new Blob([base64])], fileName);
  return file;
}
export default convertBase64ToFile;
