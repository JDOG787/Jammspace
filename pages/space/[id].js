import { useEffect } from 'react';
import Peer from 'simple-peer';
import wrtc from "wrtc";

export default function Space() {
    useEffect(() => {   
    // get video/voice stream
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(gotMedia).catch(() => {})
    
    function gotMedia (stream) {
      var peer1 = new Peer({ initiator: true, wrtc, stream: stream })
      var peer2 = new Peer({wrtc})
    
      peer1.on('signal', data => {
        peer2.signal(data)
      })
    
      peer2.on('signal', data => {
        peer1.signal(data)
      })
    
      peer2.on('stream', stream => {
        // got remote video stream, now let's show it in a video tag
        var video = document.querySelector('video')
    
        if ('srcObject' in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL.createObjectURL(stream) // for older browsers
        }
    
        video.play()
      })
    }
  }, []);

 

    return (    
        <div className="space">
            <h1>Space</h1>
            <p>
                A space is a container for other components.
            </p>
            <video></video>
        </div>
    );
}