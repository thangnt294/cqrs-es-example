import { Injectable } from '@nestjs/common';
import { auth, Client, mapping } from 'cassandra-driver';
import { config } from '../../../config';

@Injectable()
export class CassandraService {
  client: Client;

  private createClient() {
    this.client = new Client({
      contactPoints: [`${config.CASSANDRA_HOST}`],
      keyspace: config.CASSANDRA_KEYSPACE,
      localDataCenter: 'datacenter1',
      authProvider: new auth.PlainTextAuthProvider(
        config.CASSANDRA_USERNAME,
        config.CASSANDRA_PASSWORD,
      ),
    });
  }

  createMapper(mappingOptions: mapping.MappingOptions) {
    if (this.client == undefined) {
      this.createClient();
    }
    return new mapping.Mapper(this.client, mappingOptions);
  }
}
