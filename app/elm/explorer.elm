module Explorer where

import Array

type ArrangementNode = SectionNode MusicalSection | PartNode Part

type alias Part =
  { id: Int
  , sectionId: Int
  , name: String
  , beats: Int
  , notes: List {}
  , channel: Int
  , output: Int
  }

type alias MusicalSection =
  { id: Int
  , loop: Int
  , name: String
  , parts: List Part
  }

type alias SongState =
  { sections: List MusicalSection
  , arrangement: List Int
  , tempo: Int
  , arrangement: List Int
  }

type alias Model = 
  { cursorPosition : Int, songState: SongState }

flattenArrangementFromModel : Model -> List ArrangementNode
flattenArrangementFromModel arrangement = 
  arrangement.songState.sections
    |> List.map (\musicalSection -> ([SectionNode musicalSection] ++ (flattenParts musicalSection)))
    |> List.concat

flattenArrangement : List MusicalSection -> List ArrangementNode
flattenArrangement sections = 
  sections
    |> List.map (\musicalSection -> ([SectionNode musicalSection] ++ (flattenParts musicalSection)))
    |> List.concat

flattenParts : MusicalSection -> List ArrangementNode
flattenParts section =
  section
    |> .parts
    |> List.map PartNode

indexOfArrangementNode : List ArrangementNode -> ArrangementNode -> Maybe Int
indexOfArrangementNode flattenedArrangement arrangementNode =
  let
    listTupleElement = flattenedArrangement
                        |> List.indexedMap (,)
                        |> List.filter (\node -> (snd node) == arrangementNode) 
                        |> List.head
  in
    case listTupleElement of
      Just value ->
        Just (fst value)
      Nothing ->
        Nothing

toCoordinates : Maybe ArrangementNode -> (Int, Int)
toCoordinates node =
  case node of
    Just (SectionNode a) ->
      (a.id, -1)
    Just (PartNode a) ->
      (a.sectionId, a.id)
    Nothing ->
      (-1, -1)

currentPartCoordinates : Int -> List ArrangementNode -> (Int, Int)
currentPartCoordinates cursorPosition flattenedArrangement =
  flattenedArrangement
    |> Array.fromList
    |> Array.get cursorPosition
    |> toCoordinates

currentCursorPosition : (Int, Int) -> List ArrangementNode -> Int
currentCursorPosition coordinates flattenedArrangement =
  let
    indexedTuple = flattenedArrangement
      |> List.map Just
      |> List.map toCoordinates
      |> List.indexedMap (,)
      |> List.filter (\node -> (snd node) == coordinates)
      |> List.head
  in
    case indexedTuple of
      Just value ->
        (fst value)
      Nothing ->
        0
