# api/asl_routes.py

import os
import aiofiles.tempfile
import logging
from collections import Counter

from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import JSONResponse

from dto.asl_dto import PredictionResponseDTO
from services.asl_service import InferenceService

router = APIRouter()

# create a single shared instance
real_inference_service = InferenceService()

# this function allows FastAPI DI overrides in tests
def get_inference_service() -> InferenceService:
    return real_inference_service

@router.post("/predict", response_model=PredictionResponseDTO)
async def predict(
        file: UploadFile = File(...),
        inference_service: InferenceService = Depends(get_inference_service),
):
    temp_path = None
    try:
        # save upload
        async with aiofiles.tempfile.NamedTemporaryFile("wb", delete=False) as tmp:
            data = await file.read()
            await tmp.write(data)
            temp_path = tmp.name


        raw_labels = await run_in_threadpool(
            inference_service.process_video, temp_path
        )

        # aggregate counts
        counts = dict(Counter(raw_labels).most_common())
        return JSONResponse(content={"predicted_labels": counts})

    except Exception as e:
        logging.exception("ASL prediction failed")
        raise HTTPException(status_code=400, detail=str(e))

    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception:
                logging.warning(f"Could not delete temp file {temp_path}")
