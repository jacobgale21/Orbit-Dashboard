
import json
from pathlib import Path

class NavigationIndex:

    def __init__(self, filename):
        self.keyword_index = {}

        with open(filename) as f:
            config = json.load(f)

        for intent in config["intents"]:
            for keyword, weight in intent["keywords"].items():
                self.keyword_index[keyword.lower()] = {
                    "intent": intent,
                    "weight": weight
                }

    def search(self, message):
        message = message.lower()
        scores = {}
        intents = {}

        for keyword, data in self.keyword_index.items():
            if keyword in message:
                intent = data["intent"]
                intent_id = intent["id"]

                scores[intent_id] = scores.get(intent_id, 0) + data["weight"]

                # Save the actual intent dictionary
                intents[intent_id] = intent

        if not scores:
            return None

        winner = max(scores, key=scores.get)

        return intents[winner]
