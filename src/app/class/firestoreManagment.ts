import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Entity } from '../model/entity';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

function firebaseSerialize<T>(object: T) {
    return JSON.parse(JSON.stringify(object));
}

export class FirestoreCrudService<T extends Entity> {
    private collection: AngularFirestoreCollection<T>;
    constructor(private afs: AngularFirestore, collectionName: string) {
        this.collection = this.afs.collection(collectionName);
    }

    add(entity: T, id?: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            if (id) {
                this.collection
                    .doc(id)
                    .set(firebaseSerialize(entity))
                    .then(ref => {
                        resolve(entity);
                    });
            } else {
                this.collection.add(firebaseSerialize(entity)).then(ref => {
                    const newentity = {
                        id: ref.id,
                        ...entity,
                    };
                    resolve(newentity);
                });
            }
        });
    }

    get(id: string): Observable<T> {
        return this.collection
            .doc<T>(id)
            .snapshotChanges()
            .pipe(
            map(doc => {
                if (doc.payload.exists) {
                    const data = doc.payload.data() as T;
                    const payloadId = doc.payload.id;
                    return { id: payloadId, ...data };
                }
            })
            );
    }

    list(): Observable<T[]> {
        return this.collection.snapshotChanges().pipe(
            map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as T;
                    data.id = a.payload.doc.id;
                    return data;
                });
            })
        );
    }

    listByReference(id: string, field : string) : Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.collection
            .ref.where(field, '==', id)
            .onSnapshot(el => {
                const newelements = [];
                el.forEach(doc => {
                    var element = doc.data() as T;
                    element.id = doc.id;
                    newelements.push(element)
                })
                resolve(newelements);
            })
        });
    }

    listByReferenceAndUser(id: string, field : string, idAuth : string, user : string) : Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.collection
            .ref.where(field, '==', id)
            .where(user, '==', idAuth)
            .onSnapshot(el => {
                const newelements = [];
                el.forEach(doc => {
                    var element = doc.data() as T;
                    element.id = doc.id;
                    newelements.push(element)
                })
                resolve(newelements);
            })
        });
    }

    update(entity: T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.collection
                .doc<T>(entity.id as string)
                .set(firebaseSerialize(entity))
                .then(() => {
                    resolve({
                        ...entity,
                    });
                });
        });
    }

    delete(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.collection
                .doc<T>(id)
                .delete()
                .then(() => {
                    resolve();
                });
        });
    }
}