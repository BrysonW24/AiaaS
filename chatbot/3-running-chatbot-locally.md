Author: Bryson Walter
Date: 23/05/2025
Linux PW: walterbr

# ----------------------------

| 🔢 Step | 🗂️ File                      | 🧩 Purpose                                                               |
| ------- | ----------------------------- | ------------------------------------------------------------------------ |
| 1️⃣     | `create_doc.py`               | Creates or prepares a `.docx` file with content to embed                 |
| 2️⃣     | `create_milvus_connection.py` | Connects to Milvus and creates the `docs` collection with schema         |
| 3️⃣     | `embed_store.py`              | Loads `.docx`, generates embeddings, and inserts chunks into Milvus      |
| 4️⃣     | `create_milvus_index.py`      | Builds an IVF\_FLAT index using `COSINE` metric on the embedding field   |
| 5️⃣     | `inspect_milvus.py`           | Inspects number of embedded chunks stored in Milvus                      |
| 6️⃣     | `query_agent.py`              | Accepts a question, retrieves relevant chunks, and answers via TinyLlama |
| 7️⃣     | `clear_milvus_memory.py`      | (Optional) Releases loaded collections from memory to free up RAM        |

aiaas-agent/
├── venv/                    ← Your single virtual environment
├── src/                     ← All code lives here
│   ├── ingest/
│   ├── query/
│   ├── utils/
│   └── main.py
├── documents/               ← Where .docx and inputs go
├── volumes/                 ← Docker or Milvus volumes
├── requirements.txt
└── README.md


ollama run phi3
ollama run tiny-llama


pip install marshmallow==3.20.1
pip install huggingface_hub==0.20.3
pip install numpy==1.24.4
pip install -U numpy torch torchvision --index-url https://download.pytorch.org/whl/cpu


# ---

🧱 1. Folder Structure & Naming
    ✅ Project root folder must be: aiaas-agent/
    ✅ Contains subfolders:
        src/ (Python source code)
        documents/ (your uploaded .docx files)
        volumes/ (for Milvus local persistence)
        venv/ (virtual environment)
    ✅ All scripts should be runnable from src/, using relative imports

🐍 2. Python Environment
    ✅ Python version: 3.10.x
    Must be used to create virtual env:
        python3.10 -m venv venv
        source venv/bin/activate
    ✅ Virtual environment must be activated before running any script

📦 3. Required Python Packages
    Installed via pip install -r requirements.txt:
        numpy==1.24.4
        torch (auto-installed via transformers)
        sentence-transformers
        transformers
        milvus-lite
        grpcio
        filelock
        Jinja2
        joblib

📂 4. File Expectations
    ✅ your_doc.docx or similar must exist inside documents/ folder
    ✅ All Python scripts must reference this location relatively, e.g.:

        doc_path = "documents/your_doc.docx"

🐳 5. Docker & Milvus
    ✅ Docker Desktop installed and running
    ✅ docker-compose.yml must be configured correctly to run Milvus
    ✅ Docker must expose Milvus on host.docker.internal:19530
    ✅ Run Milvus with:
        docker compose down -v --remove-orphans
        docker system prune -a --volumes
        docker compose up -d

🧠 6. HuggingFace Model Access
    ✅ LLM used must be compatible with CPU (unless GPU setup is added)
    ✅ Example used: all-MiniLM-L6-v2 (public SBERT model)

    SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

🔁 7. Model Compatibility
    ⚠️ PyTorch must support torch.get_device() (this breaks if using older or improperly installed versions)
    ✅ Torch + Transformers + SentenceTransformer must be aligned version-wise

    If broken: update with:
        pip install --upgrade torch transformers sentence-transformers

📊 8. Milvus Initialization
    Scripts expected:
        create_milvus_connection.py
        create_milvus_index.py
        embed_store.py → creates & inserts embeddings into Milvus
        query_agent.py → runs queries against the vector store

🔐 9. Access Control & Mounting (Optional for Prod)
    If running in production or Docker containers:
    Make sure /documents is mounted or synced properly
    Ports 19530 (Milvus) and 9091 (optional) must be exposed
    Volume persistence mapped to volumes/

# ----------------------------

✅ WSL Workflow (Correct Way)
1. Launch your WSL environment
    wsl
        You’ll drop into a Linux terminal — something like:
        bryson@hostname:/home/bryson$

2. Navigate to your project directory (if needed)
    cd ~/aiaas-agent

3. Activate your venv like normal:
    source venv/bin/activate
        You’ll now see:
            (aiaas-env) jordi@hostname:~/aiaas-agent$

4. Start Milvus via docker
    navigate to folder where 'docker-compose.yml' file is:
        docker compose up -d

    run a check on the containers 
        docker ps
        watch docker ps

5. Create test doc
    python create_doc.py

    CHECK: If already exists and want to check it works, run this first:
        rm your_doc.docx
     THEN
        python create_doc.py

6. Create a connection to Milvus

    Download the most up-to-date Docker Compose file:
       Milvus Documentation: https://milvus.io/docs/v2.0.x/install_standalone-docker.md
            Run: wget https://github.com/milvus-io/milvus/releases/download/v2.0.2/milvus-standalone-docker-compose.yml -O docker-compose.yml

        In all files, have:
            connections.connect(
                alias="default",
                host="host.docker.internal",
                port="19530"

    You're running Milvus in Docker on Windows and trying to access it from WSL2 (your Ubuntu virtual environment). By default, Docker Desktop isolates containers behind a virtual interface, which sometimes blocks direct WSL2 access unless specific networking is configured.

    To find the port that is exposed - run docker ps
        CONTAINER ID   IMAGE                    COMMAND                  CREATED         STATUS         PORTS                                              NAMES
        32e1c9ac77f0   milvusdb/milvus:v2.3.3   "/tini -- milvus run…"   7 minutes ago   Up 7 minutes   0.0.0.0:9091->9091/tcp, 0.0.0.0:19530->19530/tcp   milvus

    Make sure the inspect_milvus.py file has the correct host and IP address
        docker inspect milvus | grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "",
            "IPAddress": "172.18.0.2",

        Validate that Milvus is listening from the terminal
            curl http://172.18.0.2:19530
            ping 172.18.0.2

            If successful: 
            If failed:  curl: (28) Failed to connect to 172.18.0.2 port 19530 after 132957 ms: Couldn't connect to server

            If that fails try:
                curl http://localhost:19530
                    If failed: curl: (7) Failed to connect to localhost port 19530 after 9 ms: Couldn't connect to server
            
            This is now because inside the WSL, it cannot access the Docker-hosted Mulvus container
            Docker containers run inside a virtual machine mananged by Docker Desktop, not in WSL
            Meaning the localhost inside WSL is not thhe same as localhost on the Docker network

        Validate that Mi

        Download sudo apt install telnet -y
            telnet 172.20.208.1 19530
                If successful:
                If failed: telnet: Unable to connect to remote host: Connection timed out

        Test the WSL Connection from Ubuntu to Docker Desktop 
            connections.connect(
                alias="default",
                host="host.docker.internal",
                port="19530"
    )


        docker compose down -v --remove-orphans
        docker system prune -a --volumes




7. Inspect Milvus contents
    python inspect_milvus.py

# ---

🐳 Docker Onboarding SOP – Milvus Setup & Reset 

    📁 Prerequisites
        Docker Desktop is installed and running
        WSL2 installed (for Windows users)
        docker-compose.yml file is in your working directory
        You have a working docker-compose.yml that defines the Milvus container

    🧼 Step 1: Remove Old Milvus Containers (if any)
        If there’s a previous run or stale setup:
            docker ps -a
        Look for a container with the name milvus or similar. If found, remove it:
            docker rm -f milvus
        Optionally, prune unused containers, networks, and volumes:
            docker system prune -a --volumes
                # Type 'y' when prompted

    🧽 Step 2: Delete Old Milvus Volumes (Optional Full Reset)
    Only do this if you want to wipe all indexed data:
        docker volume ls
        docker volume rm $(docker volume ls -qf dangling=true)
    Or, if you know the volume name (like milvus-etcd, milvus-data):
        docker volume rm milvus-etcd milvus-data

    🏗 Step 3: Build & Start Milvus
        From the folder where docker-compose.yml is located:
            docker compose up -d
        Verify it’s running:
            docker ps
        You should see a container named milvus or matching your docker-compose.yml.
    
    🧪 Step 4: Check Health & Logs (if errors occur)
        Check logs for confirmation Milvus started correctly:
            docker logs milvus
        You should see something like:
        Milvus is ready to serve ...

    🧼 Step 5: (Optional) Clean Docker Images
        To clean up unused Docker images and save disk space:
            docker image prune -a

    ✅ Milvus should now be live at:
        127.0.0.1:19530

        Check the IP Address from here:        
            docker inspect milvus | grep IPAddress

            If you're running Python on your Windows host, use localhost.
            If you're running Python inside WSL, you must use the container IP (or install Milvus client inside Docker and link them with docker exec, etc.)

    🔁 Quick Test Command
        Run this Python snippet to confirm Milvus is accessible:
        from pymilvus import connections
        connections.connect(alias="default", host="127.0.0.1", port="19530")
        print("✅ Milvus connection successful!")

    📦 Optional: Restart Everything Clean
    docker compose down -v      # stops + removes containers + volumes
    docker compose up -d        # starts fresh

# ---

aiaas-agent/
├── create_doc.py             # Creates the source your_doc.docx
├── doc_loader.py             # Loads and splits docx into text chunks
├── embed_store.py            # Embeds and stores chunks into Milvus
├── query_agent.py            # Embeds a user query, searches Milvus, sends context to Ollama
├── inspect_milvus.py         # (Optional) View what's inside Milvus
├── docker-compose.yml        # (Optional) for Milvus container
└── your_doc.docx             # Auto-generated DOCX file to test ingestion

Provide an overview of all of the packages currently installed and their versions
    pip freeze
    pip freeze | grep llama         # Shows LLaMA-related libs
    pip freeze | grep milvus        # Shows Milvus-related client
    pip freeze | grep langchain     # Shows LangChain version


1. create_doc.py
    Purpose: Create a DOCX file if you don’t have one yet.

    Run:
    python create_doc.py
    Output: your_doc.docx

2. doc_loader.py
    Purpose: Load .docx, clean up text, and split it into manageable chunks using RecursiveCharacterTextSplitter.
    Used by: embed_store.py


3. embed_store.py
    Purpose:
        ➡️ calls load_docx_chunks() from doc_loader.py to:
            open the .docx
            clean + chunk the text
            return the chunks for embedding
        Connects to local Milvus
        Embeds chunks using all-MiniLM-L6-v2
        Creates or loads a Milvus collection
        Stores text + embedding vectors

    Run:
        python embed_store.py
        Effect: Your document is now searchable in Milvus


4. query_agent.py
    Purpose:
    - Takes a user question
    - Embeds the question
    - Finds relevant chunks in Milvus (via vector search)
    - Sends the best matching context to TinyLlama via ollama run
    - Prints the model's answer

    Run:
    python query_agent.py


5. inspect_milvus.py (Optional utility)
    Purpose: Verify the number of records or preview stored text chunks in Milvus.

    Run:
    python inspect_milvus.py

🔁 The Workflow Pipeline
        your_doc.docx ───▶ [doc_loader.py]
                                │
                                ▼
                        text chunks
                                │
                        + embeddings
                                ▼
                    ┌────────────────────────┐
                    │ Stored in Milvus (vecDB)│
                    └────────────────────────┘
                                ▲
                                │
        (query_agent.py)   question ⟶ embed ⟶ search Milvus
                                │
                                ▼
                    Relevant context chunks
                                │
                                ▼
            Prompt fed into TinyLlama via Ollama
                                │
                                ▼
                        Model-generated response

🧪 Test Everything in Order
Run this sequence manually from your activated Python environment:
python create_doc.py         # Step 1: Create test docx
python embed_store.py        # Step 2: Store embeddings in Milvus
python inspect_milvus.py     # (Optional) Inspect Milvus content
python query_agent.py        # Step 3: Ask a question, get a response


🔍 What You Can Explore Now (Before Dockerizing)
Task	                         Why It's Useful
✅ View Milvus data	            Use inspect_milvus.py or Python REPL to preview contents
🔁 Test multiple .docx files	 Run embed_store.py on different files to build up your collection
🧠 Swap models	                 Try all-mpnet-base-v2 or paraphrase-MiniLM-L6-v2
⚡ Swap Ollama model	            Try mistral, llama2, or phi locally
🧪 Error handling	             Add checks to handle empty docs, no matches, etc.
✍️ Build a CLI	                 Accept user input dynamically instead of hardcoded questions

# ---

# Troubleshooting

## 1. Python Version
    ❌ Issue
    Even after running the install command:
        sudo apt install python3.10 python3.10-venv python3.10-dev -y

    You still get:
    Command 'python3.10' not found

    That means Python 3.10 isn’t in your system’s available packages — most likely because you're on Ubuntu 24.04, which recently dropped support for older versions from the main repo.

    ✅ Clean Fix (Guaranteed on Ubuntu 24.04)
    You’ll need to install Python 3.10 manually using the deadsnakes PPA.

    🧱 Step-by-step:
    Add the PPA:
        sudo add-apt-repository ppa:deadsnakes/ppa -y
        sudo apt update

    Install Python 3.10 and venv tools:
        sudo apt install python3.10 python3.10-venv python3.10-dev -y

    Check install worked:
       python3.10 --version

    Create the new venv:
        cd ~/aiaas-agent
        python3.10 -m venv aiaas-env
        source aiaas-env/bin/activate
