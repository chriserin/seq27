module Main where

import Signal exposing (Signal)

import ElmTest exposing (consoleRunner)
import Console exposing (IO, run)
import Task

import ExplorerTests

console : IO ()
console = consoleRunner ExplorerTests.all

port runner : Signal (Task.Task x ())
port runner = run console
