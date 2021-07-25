import { useEffect, useRef } from 'react';
import Peer from 'simple-peer';
import wrtc from 'wrtc';
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'


export default function Space() {
  // const peer = useRef();
  const socketRef = useRef(null);
  // const router = useRouter()
  //   // const { id } = router.query;
  //   useEffect(() => {  
  //     const socket = io()
  //     // // get video/voice stream
  //     // navigator.mediaDevices.getUserMedia({
  //     //   video: true,
  //     //   audio: true
  //     // }).then(gotMedia).catch(() => {})
      
  //     // function gotMedia (stream) {
  //     //   var peer1 = new Peer({ initiator: true, wrtc, stream: stream })
  //     //   var peer2 = new Peer({wrtc})

  //     console.log(router.query.id)
      
  //     //   peer1.on('signal', data => {
  //     //     peer2.signal(data)
  //     //   })
      
  //     //   peer2.on('signal', data => {
  //     //     peer1.signal(data)
  //     //   })
      
  //     //   peer2.on('stream', stream => {
  //     //     // got remote video stream, now let's show it in a video tag
  //     //     var video = document.querySelector('video')
      
  //     //     if ('srcObject' in video) {
  //     //       video.srcObject = stream
  //     //     } else {
  //     //       video.src = window.URL.createObjectURL(stream) // for older browsers
  //     //     }
      
  //     //     video.play()
  //     //   })
  //     // }
  //   }, []);

  let peers = {};

  // once page has loads
  useEffect(() => {
    const socket = io();
    const peer = new Peer({ wrtc, initiator: true})
    socket.emit("join-room", "test", peer._id)
    socket.on("user-connected", (userID) => {
      console.log(userID)
    });

    // navigator.mediaDevices.getUserMedia({
    //   video: true,
    //   audio: true
    // }).then(gotMedia).catch(() => {})

    function gotMedia(stream) {
  
    }
  }, []);



  function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }
 
  return (    
      <div className="space">
          <h1>Space</h1>
          <p>
              {/* Sapce id: {id} */}
          </p>
          <div className="video-grid"></div>
      </div>
  );
}