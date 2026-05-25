Michael Feathers defines legacy code memorably: code without tests. Not old code, not bad code, not code you did not write. *Code without tests*. By that definition, most of the code in the industry is legacy code, and the question becomes how to change it safely.

The book is a long, patient walkthrough of techniques to get behavior under test in codebases that were never designed for testability. The "seams" concept (places where you can alter behavior without editing the surrounding code) is the central tool, and once you have the vocabulary you start spotting seams everywhere.

If you have ever inherited a codebase, you need this book. Pair with [[refactoring]] for the moves you make once you have the safety net of tests.
