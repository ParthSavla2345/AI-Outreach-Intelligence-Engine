#!/usr/bin/env python3
"""
backend/ml/predict.py
─────────────────────
Standalone ML prediction script.
• Reads a JSON object from stdin (feature dict)
• Loads model.pkl from the same directory
• Writes a JSON object to stdout: {"recommended_channel": "email"|"call"|"linkedin"}

Called by mlService.js via child_process.spawn.
"""

import sys
import os
import json
import pickle

# ── Feature order MUST match training feature order ───────────────────────────
FEATURE_COLUMNS = [
    "revenue_score",
    "Tariff_News_Impact",
    "War_News_Impact",
    "Market_News_Impact",
    "Hiring_Increase_Flag",
    "Job_Promotion_Flag",
]

# ── Channel label map (int → string) ─────────────────────────────────────────
CHANNEL_MAP = {
    0: "email",
    1: "call",
    2: "linkedin",
    "email": "email",
    "call": "call",
    "linkedin": "linkedin",
}

def rule_based_channel(features: dict) -> str:
    """
    Fallback rule when model is unavailable.
    High revenue + high market news  → linkedin
    High war news                    → call
    Default                          → email
    """
    revenue  = float(features.get("revenue_score", 0))
    war      = float(features.get("War_News_Impact", 0))
    market   = float(features.get("Market_News_Impact", 0))

    if revenue > 60 and market > 0.5:
        return "linkedin"
    if war > 0.5:
        return "call"
    return "email"


def load_model():
    model_path = os.path.join(os.path.dirname(__file__), "meta_stacking_model.pkl")
    # Also try generic name
    alt_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    for path in (model_path, alt_path):
        if os.path.exists(path):
            with open(path, "rb") as f:
                return pickle.load(f)
    return None


def predict(features: dict) -> str:
    model = load_model()
    if model is None:
        return rule_based_channel(features)

    try:
        row = [[float(features.get(col, 0)) for col in FEATURE_COLUMNS]]
        raw = model.predict(row)[0]
        channel = CHANNEL_MAP.get(raw, str(raw))
        # Ensure it's a valid channel string
        if channel not in ("email", "call", "linkedin"):
            channel = rule_based_channel(features)
        return channel
    except Exception as e:
        # Graceful fallback
        sys.stderr.write(f"[predict.py] model error: {e}\n")
        return rule_based_channel(features)


if __name__ == "__main__":
    try:
        raw_input = sys.stdin.read().strip()
        features = json.loads(raw_input)
        channel = predict(features)
        print(json.dumps({"recommended_channel": channel}))
        sys.stdout.flush()
    except Exception as e:
        sys.stderr.write(f"[predict.py] fatal: {e}\n")
        # Still emit valid JSON so Node can parse it
        print(json.dumps({"recommended_channel": "email"}))
        sys.stdout.flush()
