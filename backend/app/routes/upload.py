from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter()

UPLOAD_FOLDER = "pdfs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "File berhasil diupload",
        "filename": file.filename
    }