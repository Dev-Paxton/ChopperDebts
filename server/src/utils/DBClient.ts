import { Collection, Db, Filter, MongoClient, ObjectId, OptionalId } from "mongodb";
import Config from "./Config";
import winston from "winston";

export default class DBClient {
    static client: MongoClient
    static db: Db
    static transfers: Collection<Document>

    static setup() {
        DBClient.client = new MongoClient(Config.database.uri)
        DBClient.client.connect()
        DBClient.db = DBClient.client.db("ChopperDebts")
        DBClient.transfers = DBClient.db.collection("transfers")
    }

    static async getTransfer(query: Filter<Document> = {}) {
        return await this.transfers.find(query).toArray()
    }

    static async addTransfer(query: OptionalId<Document>) {
        await this.transfers.insertOne(query)
        winston.debug("Inserted in transfers " + JSON.stringify(query))
    }

    static async editTransfer(id: string, query: OptionalId<Document>) {
        await this.transfers.updateOne({ _id: new ObjectId(id) }, { $set: query })
        winston.debug(`Edited #${id} in transfers: ${JSON.stringify(query)}`)
    }

    static async deleteTransfer(id: string) {
        await this.transfers.deleteOne({ _id: new ObjectId(id) })
        winston.debug(`#${id} was deleted from transfers`)
    }
}

DBClient.setup()