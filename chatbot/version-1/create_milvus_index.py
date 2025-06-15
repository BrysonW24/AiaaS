from pymilvus import connections, Collection, utility

print("🔌 Connecting to Milvus at host.docker.internal:19530 ...")
connections.connect("default", host="host.docker.internal", port="19530")
print("✅ Connected to Milvus")

collection_name = "docs"

if not utility.has_collection(collection_name):
    print(f"❌ Collection '{collection_name}' does not exist. Please run create_milvus_connection.py first.")
    exit()

collection = Collection(collection_name)
print(f"📦 Collection '{collection_name}' loaded.")

# Check if index already exists
index_info = collection.indexes
if index_info:
    print("ℹ️ Index already exists on this collection.")
else:
    print("⚙️ Creating index on the 'embedding' field ...")
    index_params = {
        "metric_type": "COSINE",
        "index_type": "IVF_FLAT",
        "params": {"nlist": 128}
    }
    collection.create_index(field_name="embedding", index_params=index_params)
    print("✅ Index created successfully.")

print("\n👉 NEXT STEP: Your vector index is ready.")
print("Run the following to query your document:")
print("   python query_agent.py")
