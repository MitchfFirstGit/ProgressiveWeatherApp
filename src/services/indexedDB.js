import { openDB } from 'idb';

class IDBService {
    constructor() {
        this.idb = (async () => {
            return await openDB('weather-store', 1, {
                upgrade(db) {
                    db.createObjectStore('lastViewedCities');
                    db.createObjectStore('favoriteCitiesList');
                },
            })
        })();
    }

    async set(storeName, key, val) {
        return (await this.idb).put(storeName, val, key);
    }

    async delete(storeName, key) {
        return (await this.idb).delete(storeName, key);
    }

    async getValues(storeName) {
        return (await this.idb).getAll(storeName);
    }

    async getKeys(storeName) {
        return (await this.idb).getAllKeys(storeName);
    }

    async get(storeName, key) {
        return (await this.idb).get(storeName, key);
    }
}

export default new IDBService();
