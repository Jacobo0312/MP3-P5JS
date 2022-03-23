import Song from "./Song";

export default class Playlist{

  constructor(name, id){
    this.name = name;
    this.id = id;
    this.songs = [];
  }
  
  constructor(name){
    this.name = name;
    this.songs = [];
  }

  add(song){
    this.songs.push(song);
  }

  play(index){
    if (this.songs[index] != null && this.songs[index] instanceof Song){
      this.songs[index].playMusic();
    }

  }

}