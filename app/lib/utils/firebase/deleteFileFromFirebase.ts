import { deleteObject, ref } from 'firebase/storage'
import { storage } from '../../config/firebaseConfig'

const deleteFileFromFirebase = async (
  fileName: string,
  type: 'image' | 'video' | 'document' | 'poster' | 'ebook' = 'image'
): Promise<void> => {
  if (!fileName) {
    throw new Error('No file name provided')
  }

  try {
    // Create a storage reference to the file
    const filePath = `${type}s/${fileName}` // Match the upload folder structure
    const fileRef = ref(storage, filePath)

    // Delete the file
    await deleteObject(fileRef)
    console.log(`File "${fileName}" of type "${type}" has been deleted successfully.`)
  } catch (error) {
    console.error(`Failed to delete file "${fileName}" of type "${type}":`, error)
    throw error // Optionally rethrow the error
  }
}

export default deleteFileFromFirebase
