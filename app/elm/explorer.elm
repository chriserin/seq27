module Explorer where

import Graphics.Element exposing (..)
import Keyboard
import Char
import Effects exposing (Never)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Signal exposing (Address)
import StartApp

-- MODEL
type alias Part = Int

type alias MusicalSection =
  { id: Int
  , name: String
  }


type alias Model =
  { sections: List MusicalSection
  , arrangement: List Int
  , cursorPosition: Int
  }

initialModel : Model
initialModel =
    { sections = [{name = "intro", id = 10}, {name = "middle", id = 100}, {name = "end", id = 1000}]
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
      Debug.log "cursor up"
      ({ model | cursorPosition = model.cursorPosition + 1 }, Effects.none)

    CursorDown ->
      ({ model | cursorPosition = model.cursorPosition - 1 }, Effects.none)

-- VIEW
-- isSectionSelected cursorPosition sections

renderSection : (Int, MusicalSection) -> Html
renderSection (index, musicalSection) =
  li [] [
      text ("MuscialSection [" ++ musicalSection.name ++ "]" ++ index)
    ]

sectionList : List MusicalSection -> Html
sectionList sections =
  let
    renderedSections = List.indexedMap renderSection sections
  in
    ul [] renderedSections


view : Signal.Address Action -> Model -> Html
view address model =
  div [ class "explorer" ] [ (sectionList model.sections) ]
    -- [ text (toString model.cursorPosition) ]

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
