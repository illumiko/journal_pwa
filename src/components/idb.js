export class IDB {
    constructor() {
        this.db = null
    }
    open(db_name, db_version){
        if (this.db) return
        return new Promise((resolve, reject) => {
            const openReq = indexedDB.open(db_name, db_version)
            openReq.onerror = (e) => {reject(e)}
            openReq.onsuccess = (e) => {
                this.db = e.target.result
                resolve()
            }
            openReq.onupgradeneeded = (e) => {
                if (!e.target.result.objectStoreNames.contains(db_name)) {
                    e.target.result.createObjectStore(db_name, {keyPath:"id"})
                }
            }
        })
    }
    get(db_name,item_id){
        return new Promise((resolve,reject) => {
            const transaction = this.db.transaction(db_name,"readonly")
            const store = transaction.objectStore(db_name)
            // const cursorReq = store.openCursor(IDBKeyRange.bound(item_id[0], item_id[1]))
            const cursorReq = store.openCursor(IDBKeyRange.bound(item_id[0], item_id[1]))
            const results = []
            cursorReq.onsuccess = e => {
                let cursor = e.target.result
                if(cursor){
                    const {value,key} = cursor
                    results.push([key,value])
                    cursor.continue()
                } 
            }
            cursorReq.onerror = e => {
                console.log("NO DATA")
                reject(e)
            }
            transaction.oncomplete = e => {
                resolve(Object.fromEntries(results))
            }
        })
    }
    put(db_name,item){
        return new Promise((resolve,reject) => {
            const transaction = this.db.transaction(db_name, "readwrite")
            const store = transaction.objectStore(db_name)
            const putReq = store.put(item)
            putReq.onsuccess = e => {
                console.log(e)
                resolve()
            }
            putReq.onerror = e => {
                reject(e)
            }

        })

    }
    delete(db_name,item_id){
        return new Promise((resolve,reject) => {
            const transaction = this.db.transaction(db_name, "readwrite")
            const store = transaction.objectStore(db_name)
            const putReq = store.delete(item_id)
            putReq.onsuccess = e => {
                resolve(e)
            }
            putReq.oerror = e => {
                reject(e)
            }
        })

    }

}
