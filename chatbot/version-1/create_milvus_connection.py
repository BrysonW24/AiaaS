from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection, utility

# Step 1: Connect to Milvus
print("🔌 Connecting to Milvus at host.docker.internal:19530 ...")
connections.connect(alias="default", host="host.docker.internal", port="19530")
print("✅ Connected to Milvus at host.docker.internal:19530")

# Step 2: Define schema
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=1000),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=384)
]
schema = CollectionSchema(fields, description="Document chunk storage")
print("📦 Collection schema defined")

# Step 3: Create collection if it doesn't exist
collection_name = "docs"

if utility.has_collection(collection_name):
    print(f"ℹ️ Collection '{collection_name}' already exists.")
else:
    collection = Collection(name=collection_name, schema=schema)
    print(f"✅ Collection '{collection.name}' created successfully")

# Final instruction
print("\n👉 NEXT STEP: Insert data chunks by running:")
print("   python embed_store.py")
