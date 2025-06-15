
==============================
🤖 AiaaS - Project Overview.txt
==============================

✅ CORE GOAL
------------
Build an AI-powered chatbot that can:
1. Accept user queries (via API or web)
2. Read/recall content from real business documents (PDFs, SOPs, etc.)
3. Respond with accurate, context-aware answers
4. Maintain session context (multi-turn conversations, optional)

This is a simplified Retrieval-Augmented Generation (RAG) system for SMEs.

---

🔧 MVP STACK OVERVIEW
---------------------
| Component         | Tool                    | Purpose                                 |
|------------------|-------------------------|-----------------------------------------|
| Backend API       | FastAPI                 | /chat endpoint                          |
| LLM Agent         | LangChain + OpenAI      | Handles prompt + response generation    |
| Prompt Templates  | /shared/prompts         | Structured prompt formats per industry  |
| Document Loading  | PyMuPDF / LangChain     | Convert PDFs or docs to text chunks     |
| Context Retrieval | FAISS / Chroma (opt.)   | Embed and search document context       |

🧱 Suggested Local Architecture
┌──────────────┐       ┌─────────────────────┐
│ .docx Files  │─────▶│ Document Parser      │ (python-docx)
└──────────────┘       └─────────────────────┘
                             │
                             ▼
                     ┌───────────────┐
                     │ Embed Chunks  │ (e.g., BGE, MiniLM)
                     └───────────────┘
                             │
                             ▼
                     ┌────────────┐
                     │ Milvus DB  │ ⬅️ stores vectors
                     └────────────┘
                             ▲
     Query +                 │
   retrieved docs            ▼
┌─────────────┐        ┌──────────────┐
│ User Query  │──────▶ │ Local LLM     │ (e.g., Mistral 7B via Ollama)
└─────────────┘        └──────────────┘
                             │
                             ▼
                       Final Answer

✅ Why Milvus + Free LLM Works
Using Milvus + a free local LLM is a smart way to build a cost-free, privacy-first RAG system for SMEs — 
especially if you're dealing with local .docx files and avoiding cloud costs.
| Component     | Choice                                                  | Notes                                                          |
| ------------- | ------------------------------------------------------- | -------------------------------------------------------------- |
| 🔍 Vector DB  | **Milvus**                                              | Open-source, high-performance, scalable even on local machines |
| 📄 Doc Reader | `python-docx`                                           | Read .docx files for embedding                                 |
| 🧠 LLM        | **Mistral 7B**, LLaMA 2 7B (via Ollama or Hugging Face) | Free + runs locally with quantization                          |
| 🧠 Embeddings | `sentence-transformers` or `Instructor-XL`              | Free offline embedding models                                  |
| 🖥️ API        | FastAPI                                                 | Local API for chatbot interface                                |


🔌 Local Stack Options
| Tool                     | Install With                 | Notes                                            |
| ------------------------ | ---------------------------- | ------------------------------------------------ |
| **Milvus Lite**          | `pymilvus` + docker          | For local dev; production-grade scaling          |
| **LLM** (Mistral 7B)     | [Ollama](https://ollama.com) | One-liner to run locally: `ollama run mistral`   |
| **Embeddings**           | `sentence-transformers`      | Models like `all-MiniLM-L6-v2` work fast locally |
| **LangChain** (optional) | Use to connect everything    | Can plug into Milvus and Ollama easily           |


---

🗂️ FUNCTIONAL ROADMAP
---------------------
Phase 1: Core Agent + API
- Set up FastAPI project
- /chat endpoint with query input
- LLM returns dummy or static response
- Begin basic prompt formatting

Phase 2: Prompt Engine + Context Injection
- Load business documents
- Create prompt templates for SMEs
- Inject relevant content into LLM call

Phase 3: Web Chat Frontend (Optional)
- Flutter web frontend
- UI: Input field, submit button, chat bubble layout

Phase 4: Memory + Session Tracking (Optional)
- Track previous queries per user_id
- Reset endpoint or session expiration

Phase 5: Deployment
- Deploy backend to Render or Railway
- Configure CORS + connect frontend
- Optional: Add tags and GitHub Actions

---

💡 Example Use Case
---------------------
User: “What’s the refund policy for Premium plan?”
→ Bot retrieves the relevant paragraph from refund-policy.pdf
→ Bot replies with a summarised or quoted version.

---

✅ Git Branching Rules
---------------------
- All changes start from `develop`
- `develop` → `testing` → `main`
- Never commit directly to `main`
- Use PRs and keep branches in sync regularly

---

Let this doc be your north star while building!
