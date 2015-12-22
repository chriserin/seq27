module ExplorerView where

import Graphics.Element exposing (..)
import Keyboard
import Char
import Effects exposing (Never)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Address)
import StartApp
import Explorer
import Task

-- PORTS
port initState : Explorer.SongState
port coordinates : (Int, Int)

port activePart : Signal (Int, Int)
port activePart =
  inbox.signal

port tasks : Signal (Task.Task Never ())
port tasks =
    app.tasks

-- MAILBOX
inbox : Signal.Mailbox (Int, Int)
inbox =
    Signal.mailbox (-1, -1)

init = 
    ({ songState = initState, cursorPosition = (Explorer.currentCursorPosition coordinates (Explorer.flattenArrangement initState.sections))}, Effects.none)

-- UPDATE
type Action =
  CursorUp | CursorDown | SelectPart | NoOp ()

update action model =
  case action of
    NoOp () ->
      (model, Effects.none)

    CursorUp ->
      let
        newCursorPosition = Basics.max 0 (model.cursorPosition - 1)
      in
        ({ model | cursorPosition = newCursorPosition }, Effects.none)

    CursorDown ->
      let
        upperBound = List.length (Explorer.flattenArrangementFromModel model) - 1
        newCursorPosition = Basics.min upperBound (model.cursorPosition + 1)
      in
        ({ model | cursorPosition = newCursorPosition }, Effects.none)

    SelectPart ->
      let
        coordinates = (Explorer.currentPartCoordinates model.cursorPosition (Explorer.flattenArrangementFromModel model))
        sendSignal = Signal.send inbox.address coordinates
      in
        (model, Effects.task (Task.map NoOp sendSignal))

-- VIEW
classForSelectedNode : Explorer.ArrangementNode -> List Explorer.ArrangementNode -> Int -> String
classForSelectedNode node flattenedArrangement cursorPosition = 
  let
    nodeIndex = Explorer.indexOfArrangementNode flattenedArrangement node
  in
    case nodeIndex of
      Just value -> 
        if value == cursorPosition then 
          "selected" 
        else 
          ""

      Nothing -> ""

renderPartList : Explorer.Model -> List Explorer.Part -> Html
renderPartList model parts =
  let 
    renderedParts = List.map (renderPart model) parts
  in
    ul [] renderedParts

renderPart : Explorer.Model -> Explorer.Part -> Html
renderPart model part =
  let
    flattenedArrangement = Explorer.flattenArrangementFromModel model
    partClass = classForSelectedNode (Explorer.PartNode part) flattenedArrangement model.cursorPosition
  in
    li [ class <| partClass ++ " part"] [ text <| part.name ++ " Notes: " ++ (toString <| List.length part.notes)]

renderSection : Explorer.Model -> Explorer.MusicalSection -> Html
renderSection model musicalSection =
  let
    renderedPartList = 
      if List.length musicalSection.parts > 0 then 
        renderPartList model musicalSection.parts 
      else
        text ""
    flattenedArrangement = Explorer.flattenArrangementFromModel model
    sectionClass = classForSelectedNode (Explorer.SectionNode musicalSection) flattenedArrangement model.cursorPosition
  in
    li [ class <| sectionClass ++ " section"] 
      [ text ("MuscialSection [" ++ musicalSection.name ++ "]")
      , renderedPartList
      ]

renderSectionList : Explorer.Model -> Html
renderSectionList model =
  let
    renderedSections = List.map (renderSection model) model.songState.sections
  in
    ul [] renderedSections

view : Signal.Address Action -> Explorer.Model -> Html
view address model =
  div [ class "explorer" ] [ (renderSectionList model) ]

hjklToAction keyCode =
  case (Char.fromCode keyCode) of
    'l' -> SelectPart
    'k' -> CursorUp
    'j' -> CursorDown
    _ -> NoOp ()

app = 
  StartApp.start 
    { init = init
    , inputs = [ Signal.map hjklToAction Keyboard.presses ]
    , update = update
    , view = view
    }

main = 
  app.html
