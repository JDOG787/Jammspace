import Peer from 'peerjs';

export default function Space() {
    // create a new peer
    const peer = new Peer('peerjs');
    const conn = peer.connect('another-peers-id');

    conn.on('open', () => {
    conn.send('hi!');
    });
    return (    
        <div className="space">
            <h1>Space</h1>
            <p>
                A space is a container for other components.
            </p>
        </div>
    );
}