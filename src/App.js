import React from "react";
import './App.css';

class App extends React.Component {
    state = {
        transcript: [],
        confidence: [],
        isRecording: false,
    }

    speechRecognition = () => {
        if (window.hasOwnProperty("webkitSpeechRecognition")) {
            const recognition = new window.webkitSpeechRecognition();
            this.setState({isRecording: true});

            recognition.continuous = true;
            recognition.interimResults = false;

            recognition.lang = "en-US";
            recognition.start();
            
            recognition.onresult = (e) => {
                console.log(e)
                const new_transcript = this.state.transcript;
                new_transcript.push(e.results[0][0].transcript);
                const new_confidence = this.state.confidence;
                new_confidence.push((e.results[0][0].confidence * 100).toFixed(2) + "%");
                this.setState({transcript: new_transcript, confidence: new_confidence});
                recognition.stop();
                this.setState({isRecording: false});
            };

            recognition.onerror = () => {
                recognition.stop();
                this.setState({isRecording: false});
            };
        } else {
            alert("Use most recent version of Chrome.")
            console.log("Use most recent version of Chrome.")
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.transcript.map((word, index) => {
                        return (
                            <React.Fragment key={Math.random() * Date.now()}>
                                <p>{word}, Confidence: {this.state.confidence[index]}</p>
                            </React.Fragment>
                        )
                    })
                }
                <button className="speech-recognition-button" onClick={this.speechRecognition}>Click to Analyse Speech
                </button>
                {this.state.isRecording ? <p>Analyzing Speech...</p> : null }
            </div>
        );
    }
}

export default App;
