import * as path from "path";
import * as mime from "mime";
import { v4 as uuid} from "uuid";
import { diskStorage } from "multer";

export const storageDir = () => path.join(__dirname, "../../storage");

export function multerStorage(dest: string) {
    return diskStorage({
        destination: (req, file, cb) => cb(null, dest),
        filename: (req, file, cb) => {
            const fileName = `${uuid()}.${mime.getExtension(file.mimetype)}`;
            return cb(null, fileName);
        }
    });
}
