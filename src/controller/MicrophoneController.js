import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent{

    constructor(){

        super();

        this._mimetype = 'audio/webm';

        this._avaliable = false;

        navigator.mediaDevices.getUserMedia({
           audio: true
        }).then(stream=>{

            this._avaliable = true;

            this._stream = stream;

            this.trigger('ready',this._stream);

        }).catch(err =>{
            console.error(err);
        });
        
    }

    isAvailable(){

        return this._avaliable;

    }

    stop(){

        this._stream.getTracks().forEach(track=>{
            track.stop();
        });
    }

    startRecorder(){

        if (this.isAvailable()) {

           this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType

           });

            this._recordedChunks = [];
            this._mediaRecorder.addEventlistenner('dataavailable', e => {

                if (e.data.size > 0) this._recordedChunks.push(e.data);

            });

            this._mediaRecorder.addEventlistenner('stop',e =>{

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType

                });

                let filename = `rec${Date.now()}.webm`;

                let audioContext = new AudioContext();

                let reader = new FileReader();

                reader.onload = e =>{

                    audioContext.decodeAudioData(reader.result).then(decode=>{

                        let file = new file([blob], filename, {
                            type: this._mimeType,
                            lastModfied: Date.now()
        


                        });

                        this.trigger('recorded', file, decode);
    

                    });

                }   

                reader.readAsArrayBuffer(blob);

        

            });

            this._mediaRecorder.start();
            this.startTimer();

        }

    }

    stopRecorder(){

        if (this.isAvailable()) {

          this._mediaRecorder.stop();
          this.stop();
          this.stopTimer();


        }

    }

    startTimer(){

        let start = Date.now();

        this._recordMicrophoneIterval = setInterval(()=>{

           this.trigger('recordtimer',(Date.now() - start))

        },100);

    }

    stopTimer(){

        clearInterval(this._recordMicrophoneinterval);

    }

}