import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone'
import clap from '../components/assets/sounds/clap.wav';
import conga from '../components/assets/sounds/conga.wav';
import kick from '../components/assets/sounds/kick.wav';
import tambourine from '../components/assets/sounds/tambourine.wav';


export default function useSounds() {
  const mySampler = useRef(null);

  const [isClapPlayed, isClapPlayedChange] = useState(false);
  const [isCongaPlayed, isCongaPlayedChange] = useState(false);
  const [isKickPlayed, isKickPlayedChange] = useState(false);
  const [isTambourinePlayed, isTambourinePlayedChange] = useState(false);

  useEffect(() => {
    const sampler = new Tone.Sampler({
        "C4": clap,
        "D#4": conga,
        "F#4": kick,
        "A4": tambourine,
    }).toDestination();

    Tone.loaded().then(() => {
      mySampler.current = sampler;
    })

}, []);
  
function handleKeyDown({key}) {  //=> car dans la console on renvoye un objet et a l'interieure chaque lettre appuyer est representer dans cette key
  switch (key) {
    case "q": 
      play("C4");
      isClapPlayedChange(true);
      window.setTimeout(() => isClapPlayedChange(false), 300);
      break;
    case "w": 
      play("D#4");
      isCongaPlayedChange(true);
      window.setTimeout(() => isCongaPlayedChange(false), 300);
      break;
    case "a": 
      play("F#4");
      isKickPlayedChange(true);
      window.setTimeout(() => isKickPlayedChange(false), 300);
      break;
    case "s": 
      play("A4");
      isTambourinePlayedChange(true);
      window.setTimeout(() => isTambourinePlayedChange(false), 300);
      break;
    default:
      break;
  }
}
useEffect(()=> {
  window.addEventListener("keydown", handleKeyDown);

  return ()=>{
  window.removeEventListener("keydown", handleKeyDown);
  }
})


function play(note) {
  mySampler.current.triggerAttackRelease([note], 4)
}

function handleSampleChange(note, file) {
  let fileURL = URL.createObjectURL(file);
  let buffer = new Tone.Buffer(fileURL);
  mySampler.current.add(note, buffer, () => 
    alert("Sample successfully changed"));
}


const buttonList = [
  {soundPlay : () => play("C4"),
   isPlayed: isClapPlayed,
   id: "clap",
   handleSampleChange: (e) => handleSampleChange("C4", e.target.files[0]) 
  }, 
  {soundPlay : () => play("D#4"),
   isPlayed: isCongaPlayed,
   id: "conga",
   handleSampleChange: (e) => handleSampleChange("D#4", e.target.files[0])
  }, 
  {soundPlay : () => play("F#4"), 
  isPlayed: isKickPlayed,
  id: "kick",
  handleSampleChange: (e) => handleSampleChange("F#4", e.target.files[0])
}, 
  {soundPlay : () => play("A4"), 
  isPlayed: isTambourinePlayed,
  id: "tambourine",
  handleSampleChange: (e) => handleSampleChange("A4", e.target.files[0])
},
];


  return {buttonList};
}