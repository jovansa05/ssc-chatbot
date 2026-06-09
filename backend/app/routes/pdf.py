from fastapi import APIRouter
from app.pdf_loader import extract_text_from_pdf
from app.chunker import chunk_text
from app.vector_store import save_chunks
from app.vector_store import collection
import os

router = APIRouter()

@router.get("/read-pdf")
def read_pdf():

    pdf_path = os.path.join(
        "pdfs",
        "Brosur-Jalur-Beasiswa-2026.pdf"
    )

    text = extract_text_from_pdf(pdf_path)

    return {
        "preview": text[:1000]
    }

@router.get("/chunk-pdf")
def chunk_pdf():

    text = extract_text_from_pdf(
        "pdfs/Brosur-Jalur-Beasiswa-2026.pdf"
    )

    chunks = chunk_text(text)

    return {
        "jumlah_chunk": len(chunks),
        "chunk_pertama": chunks[0] if chunks else "Tidak ada teks ditemukan"
    }

@router.get("/store-pdf")
def store_pdf():

    text = extract_text_from_pdf(
        "pdfs/Brosur-Jalur-Beasiswa-2026.pdf"
    )

    chunks = chunk_text(text)

    save_chunks(chunks)

    return {
        "message": "Chunks berhasil disimpan",
        "jumlah_chunk": len(chunks)
    }

@router.get("/search")
def search():

    results = collection.query(
        query_texts=[
            "syarat beasiswa"
        ],
        n_results=3
    )

    return results

@router.get("/count")
def count_documents():

    return {
        "total": collection.count()
    }