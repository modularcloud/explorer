export const readFileData = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContents = event.target?.result as string;
      resolve(fileContents);
    };
    reader.onerror = (event) => {
      reject(event);
    };
    reader.readAsText(file);
  });
};
