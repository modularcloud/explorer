export const uploadFile = async (file: File | Blob) => {
  try {
    const getImageUploadUrl = await axios.get(
      `api/file-upload/generateurl?file=${`${
        contractAddress + "_sourcefiles.zip"
      }`}&contractaddress=${contractAddress}`
    );

    if (getImageUploadUrl.status === 200) {
      data.uploadedUrl = getImageUploadUrl.data.url.split("?")[0];
      const uploadImage = await axios.put(getImageUploadUrl.data.url, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadImage.status === 200) {
        return getImageUploadUrl.data.url.split("?")[0];
      }
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
