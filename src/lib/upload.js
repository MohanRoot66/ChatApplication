import { storage } from "./firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

const upload = async (file) => {

    const date = new Date();
    const formattedDate = date.toISOString(); // Format date to ISO string
    const storageRef = ref(storage, `images/${formattedDate}-${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                // Handle unsuccessful uploads
                reject(new Error(`Something went wrong: ${error.code}`));
            },
            () => {
                // Handle successful uploads
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                }).catch((error) => {
                    reject(new Error(`Failed to get download URL: ${error.message}`));
                });
            }
        );
    });
};

export default upload;
