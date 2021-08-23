CREATE KEYSPACE IF NOT EXISTS event_store WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};

DROP TABLE IF EXISTS event_store.item_event;
CREATE TABLE IF NOT EXISTS event_store.item_event (id UUID PRIMARY KEY, item_id UUID, name text, quantity int, event_type text, timestamp timestamp);
