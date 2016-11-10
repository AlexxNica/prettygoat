import ICassandraClient from "../../scripts/cassandra/ICassandraClient";
import * as Rx from "rx";

export default class MockCassandraClient implements ICassandraClient {

    execute(query:string):Rx.Observable<any> {
        return Rx.Observable.empty();
    }

    stream(query:string):Rx.Observable<any> {
        return Rx.Observable.empty();
    }

}