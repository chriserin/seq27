module ExplorerTests where

import ElmTest exposing (..)

import Explorer

arrangement : Explorer.Model
arrangement =
    { sections = [{name = "intro", id = 10, parts = [1,2,3]}
                 , {name = "middle", id = 100, parts = []}
                 ]
    , arrangement = []
    , cursorPosition = 0
    }

flattenedArrangement = Explorer.flattenArrangement arrangement

all : Test
all =
    suite "Explorer Test Suite"
        [
            test "Flattening the arrangement" ((assertEqual 5) <| List.length <| (Explorer.flattenArrangement arrangement)),
            test "Find arrangement in flattened arrangements" ((assertEqual (Just 3)) (Explorer.indexOfArrangementNode flattenedArrangement (Explorer.PartNode 3)))
        ]
