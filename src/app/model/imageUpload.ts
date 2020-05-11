export class ImageUpload {
    constructor(url : string, image? : string, itsNew? : boolean) {
        this.Url = url;
        this.Image = image || null;
        this.ItsNew = itsNew || false;
    }
    
    Url: string;
    Image: any;
    ItsNew: boolean;
}