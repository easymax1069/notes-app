import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Notes} from '/imports/api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import {Session} from 'meteor/session';

const renderNotes=(notes)=> {
  if (notes.length===0) {
    return <NoteListEmptyItem/>;
  }
  else {
    return notes.map((note)=>{
      return <NoteListItem key={note._id} note={note}/>;
    });
  }
};

export const NoteList=(props)=>{
  return (
    <div>
      <NoteListHeader/>
      <p>NoteList {props.notes.length}</p>
      {renderNotes(props.notes)}
    </div>
  );
};
NoteList.propTypes={
  notes: PropTypes.array.isRequired
};

export default createContainer(()=>{
  const selectedNoteId=Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({},{sort:{updatedAt:-1}}).fetch().map((note)=>{
      let selected=false;
      if (note._id===selectedNoteId) {
        selected=true;
      }
      return {
        ...note,
        selected
      };
    })
  };
},NoteList);
