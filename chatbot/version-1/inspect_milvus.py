from pymilvus import Collection

collection = Collection("docs")
collection.load()

print(f"í´Ž Collection has {collection.num_entities} entities.\n")

results = collection.query(expr="id >= 0", output_fields=["text"], limit=5)
for i, r in enumerate(results):
    print(f"{i+1}. {r['text']}")

