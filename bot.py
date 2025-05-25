import sys
import json

# Read input from Node.js
data = sys.stdin.read()
user_message = json.loads(data)["message"]

# Basic Circle AI responses
if "hello" in user_message.lower():
    reply = "Hi! I'm Circle AI. How can I help you?"
elif "your name" in user_message.lower():
    reply = "I'm Circle AI, your smart assistant."
elif "help" in user_message.lower():
    reply = "Sure! Ask me anything."
else:
    reply = "I'm still learning. Try asking something else!"

# Send response back
print(json.dumps({ "reply": reply }))
