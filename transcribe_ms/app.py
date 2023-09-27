from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe_video():
    try:
        # Get the YouTube video URL from the request
        video_url = request.json.get('video_url')

        # Fetch the video ID from the URL
        video_id = video_url.split('v=')[1]

        # Get the transcript for the video
        transcript = YouTubeTranscriptApi.get_transcript(video_id)

        # Extract the text from the transcript
        text = ' '.join([entry['text'] for entry in transcript])

        return jsonify({'transcript': text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
