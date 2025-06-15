from pymilvus import Collection
from sentence_transformers import SentenceTransformer
import subprocess

def ask_question(question):
    # Step 1: Embed the question
    model = SentenceTransformer("all-MiniLM-L6-v2")
    query_embedding = model.encode([question])[0].tolist()

    # Step 2: Search Milvus
    collection = Collection("docs")
    collection.load()
    results = collection.search(
        data=[query_embedding],
        anns_field="embedding",
        param={"metric_type": "L2", "params": {"nprobe": 10}},
        limit=5,
        output_fields=["text"]
    )

    if not results[0]:
        print("‚ö†Ô∏è No results found.")
        return

    # Step 3: Build context
    context = "\n".join([hit.entity.get("text") for hit in results[0]])

    # Step 4: Ask TinyLlama
    prompt = f"""Answer the question based on the following context:\n{context}\n\nQuestion: {question}"""
    print("Ì∑† Sending to local LLM via Ollama...")

    res = subprocess.run(["ollama", "run", "tinyllama"], input=prompt.encode(), capture_output=True)
    print("Ì∑† Response:\n")
    print(res.stdout.decode())

if __name__ == "__main__":
    ask_question("What is this document about?")

