module Explorer where

type ArrangementNode = SectionNode MusicalSection | PartNode Part

type alias Part =
  { id: Int
  , name: String
  }

type alias MusicalSection =
  { id: Int
  , name: String
  , parts: List Part
  }

type alias Model =
  { sections: List MusicalSection
  , arrangement: List Int
  , cursorPosition: Int
  }

flattenArrangement : Model -> List ArrangementNode
flattenArrangement arrangement = 
  arrangement.sections
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
