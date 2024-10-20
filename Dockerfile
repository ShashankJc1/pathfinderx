# Use official Python image as a base
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask app code
COPY . .

# Set environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=/config/google.json

# Expose the port Flask runs on
EXPOSE 8080

# Run the Flask app using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "generate_trip:app"]
