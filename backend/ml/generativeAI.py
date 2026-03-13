import pandas as pd
import os
import sys
import argparse
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate

# ────────────────────────────────────────────────────────
# Environment & Model
# ────────────────────────────────────────────────────────
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found in .env file")

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",  # ← updated to valid 2026 model
    temperature=0.8,
    google_api_key=GOOGLE_API_KEY
)

# ────────────────────────────────────────────────────────
# Load data
# ────────────────────────────────────────────────────────
CSV_PATH = "final_master.csv"  # adjust path if needed
try:
    df = pd.read_csv(CSV_PATH)
except FileNotFoundError:
    print(f"CSV not found: {CSV_PATH}")
    sys.exit(1)

# ────────────────────────────────────────────────────────
# Signals
# ────────────────────────────────────────────────────────
IMPORTANT_SIGNALS = {
    "LinkedIn_Active": "Buyer is recently active on LinkedIn",
    "Job_Promotion_Flag": "Buyer recently changed role or received a promotion",
    "Hiring_Increase_Flag": "Company is actively expanding its team",
    "Email_Verified": "A verified email contact is available",
    "Clay_Intent_Signal": "Strong buying intent detected",
    "Apollo_Engagement_Score": "High recent engagement level",
    "Cold_Call_Response": "Positive response to past phone outreach",
    "WhatsApp_Verified": "WhatsApp communication is available",
    "Revenue_Growth_Score": "Company is showing strong revenue growth"
}

def extract_strong_signals(row):
    signals = []
    for col, desc in IMPORTANT_SIGNALS.items():
        if col in row and pd.notna(row[col]):
            if isinstance(row[col], (int, float)) and row[col] > 0:
                signals.append(desc)
            elif isinstance(row[col], bool) and row[col]:
                signals.append(desc)
    return signals

# ────────────────────────────────────────────────────────
# Varied-style prompt (no repetition)
# ────────────────────────────────────────────────────────
prompt_template = PromptTemplate(
    input_variables=[
        "company", "industry", "revenue", "headcount",
        "priority_tier", "urgency_level", "channel", "signals"
    ],
    template="""
You are an elite B2B outreach copywriter in 2026.

Write ONE outreach message (email/LinkedIn) that feels completely different from typical templates.

Company: {company}
Industry: {industry}
Revenue: {revenue}
Headcount: {headcount}
Priority: {priority_tier}
Urgency: {urgency_level}
Channel: {channel}

Strong signals:
{signals}

Randomly choose ONE unique style (do NOT mix):
1. Curiosity hook – start with thoughtful observation/question
2. Warm congrats + micro-story bridge
3. Pain-point → elegant solution pivot
4. Peer / mutual connection tone
5. Future-vision / industry trend angle
6. Ultra-direct benefit-first punch

Keep 100–160 words. Modern, confident tone. Soft CTA (10–15 min call or reply).
Use real company name – NO placeholders.

Return ONLY the full message text.
"""
)

def generate_message_for_buyer(buyer_id):
    buyer_row = df[df["Buyer_ID"] == buyer_id]
    if buyer_row.empty:
        return f"No data found for Buyer_ID: {buyer_id}"

    row = buyer_row.iloc[0]

    company = row.get("Company_Name", "the company")  # ← real company name

    strong_signals = extract_strong_signals(row)
    signal_text = "\n- ".join(strong_signals) if strong_signals else "No strong signals."

    prompt = prompt_template.format(
        company=company,
        industry=row.get("Industry", "relevant sector"),
        revenue=row.get("Revenue_Size_USD", "N/A"),
        headcount=row.get("Headcount_Size", "N/A"),
        priority_tier=row.get("priority_tier", "N/A"),
        urgency_level=row.get("urgency_level", "N/A"),
        channel=row.get("recommended_channel", "Email"),
        signals=signal_text
    )

    response = llm.invoke(prompt)
    return response.content.strip()

# ────────────────────────────────────────────────────────
# CLI mode
# ────────────────────────────────────────────────────────
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--buyer_id', type=str, required=True)
    args = parser.parse_args()

    message = generate_message_for_buyer(args.buyer_id)
    print(message)