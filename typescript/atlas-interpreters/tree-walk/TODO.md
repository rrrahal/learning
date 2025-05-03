## Next steps for interpreter -> Must

1. Check All Fix Me
2. Write tests for the interpreter
3. Support grouping
4. Spec the AST to support all math operators, grouping and booleans
5. Add support for booleans

---

### Tech Debt

1. Change position to be a Range (column and line)
2. Check for grammar errors
   a. Things like `// bla` should not be support
   `1 + +`
   ` 2 + 2 +`, etc
