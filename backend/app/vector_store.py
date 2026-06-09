import chromadb
import uuid

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="ssc_documents"
)

def save_chunks(chunks):

    for chunk in chunks:

        collection.add(
            documents=[chunk],
            ids=[str(uuid.uuid4())]
        )

def search_chunks(query):

    results = collection.query(
        query_texts=[query],
        n_results=3
    )

    return results["documents"][0]