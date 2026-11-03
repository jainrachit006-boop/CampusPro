"""
Campus Intelligence Backend Application
FastAPI application entry point with health check and basic configuration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Campus Intelligence API",
    description="AI-assisted Campus Complaint Management and Operational Intelligence System",
    version="1.0.0",
)

# CORS configuration - read allowed origins from environment
# In production, these should be set to specific deployment URLs
origins = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", tags=["health"], summary="Health check endpoint")
async def health_check():
    """Return service health status."""
    return {
        "status": "healthy",
        "service": "campus-intelligence-backend",
        "version": "1.0.0",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)