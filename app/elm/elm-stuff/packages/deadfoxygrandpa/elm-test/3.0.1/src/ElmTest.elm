module ElmTest
    ( Test, test, defaultTest, equals, suite
    , Assertion, assert, assertEqual, assertNotEqual, lazyAssert, assertionList
    , elementRunner, consoleRunner, stringRunner
    ) where

{-| A unit testing framework for Elm.

# Tests
@docs Test, test, defaultTest, equals, suite

# Assertions
@docs Assertion, assert, assertEqual, assertNotEqual, lazyAssert, assertionList

# Running Tests
@docs elementRunner, consoleRunner, stringRunner

-}

import Graphics.Element exposing (Element)

import Console exposing (IO)

import ElmTest.Assertion
import ElmTest.Test
import ElmTest.Run
import ElmTest.Runner.String
import ElmTest.Runner.Element
import ElmTest.Runner.Console


{-| The basic unit of testability. -}
type alias Assertion = ElmTest.Assertion.Assertion


{-| The core unit representing a runnable test, or a group of tests called a
suite. -}
type alias Test = ElmTest.Test.Test


{-| A basic function to create a `Test`. Takes a name and an `Assertion`. -}
test : String -> Assertion -> Test
test =
    ElmTest.Test.test


{-| Create a `Test` with a default name automatically chosen based on the inputs.
For example, `defaultTest (assertEqual 5 5)` will be named "5 == 5". -}
defaultTest : Assertion -> Test
defaultTest =
    ElmTest.Test.defaultTest


{-| Create a `Test` which asserts equality between two expressions.
For example, `(7 + 10) `equals` (1 + 16)` will create a `Test` which tests for
equality between the statements `(7 + 10)` and `(1 + 16)`. -}
equals : a -> a -> Test
equals =
    ElmTest.Test.equals


{-| Convert a list of `Test`s to a test suite. Test suites are used to group
tests into logical units, simplifying the management and running of many tests.
Takes a name and a list of `Test`s. Since suites are also of type `Test`, they
can contain other suites, allowing for a more complex tree structure.
-}
suite : String -> List Test -> Test
suite =
    ElmTest.Test.suite


{-| Basic function to assert that some expression is True -}
assert : Bool -> Assertion
assert =
    ElmTest.Assertion.assert


{-| Basic function to assert that two expressions are equal in value. -}
assertEqual : a -> a -> Assertion
assertEqual =
    ElmTest.Assertion.assertEqual


{-| Basic function to assser that two expressions are not equal. -}
assertNotEqual : a -> a -> Assertion
assertNotEqual =
    ElmTest.Assertion.assertNotEqual


{-| A lazy version of `assert`. Delays execution of the expression until tests
are run. -}
lazyAssert : (() -> Bool) -> Assertion
lazyAssert =
    ElmTest.Assertion.assertT


{-| Given a list of values and another list of expected values, generates a
list of assertions that these values are equal. -}
assertionList : List a -> List a -> List Assertion
assertionList =
    ElmTest.Assertion.assertionList


{-| Run a test or a test suite and return an `Element` containing the
formatted test results. -}
elementRunner : Test -> Element
elementRunner =
    ElmTest.Runner.Element.runDisplay


{-| Run a test or a test suite with `laszlopandy/elm-console` and return an
`IO ()` action which outputs the test results to console. -}
consoleRunner : Test -> IO ()
consoleRunner =
    ElmTest.Runner.Console.runDisplay


{-| Run a test or a test suite and return the results as a `String`. Mostly
useful if you want to implement a different type of output for your test
results. If you aren't sure whether or not to use this function, you should
probably use either `elementRunner` or `consoleRunner`. -}
stringRunner : Test -> String
stringRunner =
    ElmTest.Runner.String.runDisplay
