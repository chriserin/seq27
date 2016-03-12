

# About Seq27

Seq27 is a midi sequencer that aims to provide:

  * Quick editing via keystrokes
  * Easy navigation via keystrokes
  * Quick pattern generation
  * Easy Pattern application

Ultimately, Seq27 is a musical composition tool and I hope it allows for the expression of the patterned musical thoughts flowing through the musical minds of all types of composers.  As a programmer, I spend all day everyday typing using the keyboard and the vim text editor and in comparison the world of mouse driven sequencer and daw software has seemed extremely tedious and cumbersome.  I want to compose with the same speed as I program, and with that gain the same fulfillment.

# Concepts

  * __The Cursor__ - is where you would like the next action to take place.  Its very movable.  It can be at middle(5) C with the keystroke `mc` and it can be 32 beats to the right with `32l`.  Movement is based on the cardinal direction keys `hjkl` and a host of more specific movements like `m3a` to move to the A pitch 2 octaves below middle(5) C, `w` to move 4 beats to the right and `n` to move to the next note.

  * __Note Creation__ - Seq27 allows you to create notes either individually or in groups.  A chord is a group. An arpeggio is a group. A scale is a group.  Simple creations can be completed with keystroke sequences like `cn` to a create a note and `ch` to create a major triad chord.  Notes are always created at the same place as the cursor.  Note creation can grow more complex with commands like _:scale minor_ and _:arpeggio udud_ which creates a 4 note whole octave major arpeggio that goes up down up and back down again.
