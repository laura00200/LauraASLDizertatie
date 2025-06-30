import pytest
import services.asl_service

def pytest_configure(config):

    # 1) No-op the constructor
    services.asl_service.InferenceService.__init__ = lambda self: None

    # 2) Predict always returns a single‐letter list
    services.asl_service.InferenceService.predict = lambda self, uri: ["A"]
