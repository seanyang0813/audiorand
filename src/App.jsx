import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const recorderControls = useAudioRecorder();
  let [audioBuffer, setAudioBuffer] = useState(null);
  let [randomValues, setRandomValues] = useState([]);
  const index = useRef(-1);
  const addAudioElement = (blob) => {
    blob.arrayBuffer().then((buffer) => {
      const byteArray = new Uint8Array(buffer);
      setAudioBuffer(byteArray);
    });
  };

  let generateRandomValues = () => {
    if (!audioBuffer) return;
    if (index.current == -1) {
      index.current = Math.floor(audioBuffer.length / 2);
    }
    let values = [];
    for (let i = 0; i < 100; i++) {
      console.log(index.current);
      let value = audioBuffer[index.current];
      values.push(value / 255);
      index.current = (index.current + value + i) % audioBuffer.length;
    }
    console.log(values.join(" "));
    setRandomValues(values);
  }

  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-r from-gray-100 to-gray-300 h-screen">
      <div className="flex justify-center items-center">
        <div>
          <div className="flex justify-center items-center p-2">
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              recorderControls={recorderControls}
            />
          </div>
          <p className="font-mono">
            click the mic to record and generate random values from the audio
          </p>
          {audioBuffer && (
            <div>
            <div className="flex justify-center items-center p-2">
              <button
                type="button"
                className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={generateRandomValues}
              >
                Generate 100 random values
              </button>
              
            </div>
            <textarea
                rows={30}
                name="comment"
                id="comment"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-5"
                defaultValue={""}
                value={randomValues.join(" ")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
