# LSDog's website （＾∀＾●）ﾉｼ
- trying to create a website
- study
- keeping running for life
- oh its http://LSDog.fun

# For developers ⭐
## Coding
I mainly use vscode to edit this website.

For `gsap`'s auto completion, you can download their zip in github release, then put `types` folder into the workspace, with a `jsconfig.js` (can be blank), you can have the auto completion for `gsap`.

If you want to relocate the types folder, you can add these lines:
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "checkJs": true,
        "typeRoots": [".SOME_FOLDERS_HERE"]
    }
}
```
Paths in the `typeRoots` will be scanned, boom, you can load types in another location.