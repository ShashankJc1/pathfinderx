import vertexai
from vertexai.generative_models import GenerativeModel

# Set up your project ID here
PROJECT_ID = "propane-ripsaw-439005-e6"  # Replace with your actual project ID

# Initialize Vertex AI
vertexai.init(project=PROJECT_ID, location="us-central1")

# Load the Gemini model
model = GenerativeModel("gemini-1.5-flash-002")

# Example prompt for a trip recommendation
response = model.generate_content(
    "Generate a 7-day adventure trip for 2 people with a preference for Japan."
)

# Print the response from the model
print(response.text)
