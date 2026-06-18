const notes = [
"C4","D4","E4","F4","G4",
"A4","B4","C5","D5","E5"
];

let melody = [];
let sequence;

const output =
document.getElementById("output");

document.getElementById("generateBtn")
.addEventListener("click",()=>{

melody=[];

for(let i=0;i<12;i++){

melody.push(
notes[
Math.floor(
Math.random()*notes.length
)
]
);

}

output.textContent =
melody.join(" • ");
});

document.getElementById("playBtn")
.addEventListener("click",async()=>{

if(melody.length===0)return;

await Tone.start();

Tone.Transport.stop();
Tone.Transport.cancel();

const synth =
new Tone.PolySynth().toDestination();

sequence = new Tone.Sequence(
(time,note)=>{
synth.triggerAttackRelease(
note,
"8n",
time
);
},
melody,
"4n"
);

sequence.start(0);

Tone.Transport.start();
});

document.getElementById("stopBtn")
.addEventListener("click",()=>{

Tone.Transport.stop();

if(sequence){
sequence.dispose();
}
});