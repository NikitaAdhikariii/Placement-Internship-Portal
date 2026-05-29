import sys
import json

from ai.recommender import recommend_jobs

skills = sys.argv[1]

results = recommend_jobs(skills)

print(json.dumps(results))