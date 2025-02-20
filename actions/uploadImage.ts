// const [fileURL, setFileURL] = useState<string>("");
// //   const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
// //   const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
// //     if (!e.target.files || e.target.files.length === 0) return;

// //     const file = e.target.files[0];
// //     const uniqueFileName = `${file.name}_${crypto.randomUUID()}`;
// //     const storageRef = ref(dbStorage, `trades/${uniqueFileName}`);
// //     setIsLoadingImage(true);
// //     try {
// //       // Upload file first
// //       await uploadBytes(storageRef, file);
// //       // Wait a moment before fetching URL
// //       const url = await getDownloadURL(storageRef);
// //       setFileURL(url);
// //       form.setValue("screenshot", url);

// //       // Store `url` in state or database as needed
// //     } catch (error) {
// //       console.error("Upload failed:", error);
// //     }
// //     setIsLoadingImage(false);
// //   };
