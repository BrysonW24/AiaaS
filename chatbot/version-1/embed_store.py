from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
from sentence_transformers import SentenceTransformer
from doc_loader import load_docx_chunks

connections.connect(
    alias="default",
    host= "milvus-standalone",      # "127.0.0.1" or "host.docker.internal"
    port="19530"
    )

def create_or_load_collection(name="docs"):
    fields = [
        FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
        FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=384),
        FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=1000)
    ]
    schema = CollectionSchema(fields, description="Document chunks")
    collection = Collection(name=name, schema=schema)
    collection.load()
    return collection

def embed_and_store(docx_path):
    chunks = load_docx_chunks(docx_path)
    model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = model.encode(chunks)

    collection = create_or_load_collection()
    data = [[], embeddings.tolist(), chunks]
    collection.insert(data)
    print(f"✅ Inserted {len(chunks)} chunks into Milvus.")

if __name__ == "__main__":
    embed_and_store("your_doc.docx")

