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


initialModel : Explorer.Model
initialModel =
    { sections = [ { name = "intro"
                   , id = 10
                   , parts = [{ id = 1, name = "intro part 1" }, { id = 2, name = "intro part 2" }]
                   }
                 , { name = "middle"
                   , id = 100
                   , parts = []
                   }
                 , { name = "end"
                   , id = 1000
                   , parts = [{ id = 3, name = "end part 1" }, { id = 4, name = "end part 2" }]
                   }
                 ]
    , arrangement = []
    , cursorPosition = 0
    }

init = 
    (initialModel, Effects.none)

-- UPDATE
type Action =
  NoOp | CursorUp | CursorDown

update action model =
  case action of
    NoOp ->
      (model, Effects.none)

    CursorUp ->
      let
        newCursorPosition = Basics.max 0 (model.cursorPosition - 1)
      in
        ({ model | cursorPosition = newCursorPosition }, Effects.none)

    CursorDown ->
      let
        upperBound = List.length (Explorer.flattenArrangement model) - 1
        newCursorPosition = Basics.min upperBound (model.cursorPosition + 1)
      in
        ({ model | cursorPosition = newCursorPosition }, Effects.none)


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
    flattenedArrangement = Explorer.flattenArrangement model
    partClass = classForSelectedNode (Explorer.PartNode part) flattenedArrangement model.cursorPosition
  in
    li [ class partClass ] [ text part.name ]

renderSection : Explorer.Model -> Explorer.MusicalSection -> Html
renderSection model musicalSection =
  let
    renderedPartList = 
      if List.length musicalSection.parts > 0 then 
        renderPartList model musicalSection.parts 
      else
        text ""
    flattenedArrangement = Explorer.flattenArrangement model
    sectionClass = classForSelectedNode (Explorer.SectionNode musicalSection) flattenedArrangement model.cursorPosition
  in
    -- TODO: add class if selected
    li [ class sectionClass ] 
      [ text ("MuscialSection [" ++ musicalSection.name ++ "]")
      , renderedPartList
      ]

renderSectionList : Explorer.Model -> Html
renderSectionList model =
  let
    renderedSections = List.map (renderSection model) model.sections
  in
    ul [] renderedSections


view : Signal.Address Action -> Explorer.Model -> Html
view address model =
  div [ class "explorer" ] [ (renderSectionList model) ]

hjklToAction keyCode =
  case (Char.fromCode keyCode) of
    'k' -> CursorUp
    'j' -> CursorDown
    _ -> NoOp

app = 
  StartApp.start 
    { init = init
    , inputs = [ Signal.map hjklToAction Keyboard.presses ]
    , update = update
    , view = view
    }

main = 
  app.html
