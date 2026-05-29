from sentence_transformers import SentenceTransformer, util
import json

# Load lightweight BERT model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Load jobs data
with open("ai/jobs.json", "r") as f:
    jobs = json.load(f)

def recommend_jobs(user_skills):
    user_text = " ".join(user_skills)

    job_texts = []
    for job in jobs:
        job_texts.append(job["title"] + " " + " ".join(job["skills"]))

    # Convert text → embeddings (AI brain)
    user_embedding = model.encode(user_text, convert_to_tensor=True)
    job_embeddings = model.encode(job_texts, convert_to_tensor=True)

    # Similarity scoring
    scores = util.cos_sim(user_embedding, job_embeddings)[0]

    # Attach score to jobs
    results = []
    for i, job in enumerate(jobs):
        results.append({
            "job": job,
            "score": float(scores[i])
        })

    # Sort best matches first
    results = sorted(results, key=lambda x: x["score"], reverse=True)

    return results[:5]