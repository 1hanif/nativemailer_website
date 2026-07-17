# NativeMailer website

The product and download site for [NativeMailer](https://github.com/1hanif/nativemailer), a local SMTP catcher for application development.

## Local development

```bash
npm install
npm run dev
```

Run `npm run build` before publishing. Release download URLs and the displayed version live in `src/data.ts` and must match the assets attached to the corresponding GitHub Release.

## Release artifacts

GitHub Releases is the primary distribution channel. Each release referenced by the site should include:

```text
NativeMailer-<version>-arm64.dmg
NativeMailer-<version>-x64.dmg
NativeMailer-<version>-setup.exe
NativeMailer-<version>.AppImage
nativemailer_<version>_amd64.deb
```

Build the macOS application from the NativePHP app repository:

```bash
php artisan native:build mac
```

Before packaging, apply an ad-hoc signature to the generated app bundle so Apple Silicon receives a structurally valid signature:

```bash
codesign --force --deep --sign - /path/to/NativeMailer.app
```

The NativePHP app's signing and notarization credentials should remain unset, and notarization should be disabled, until an Apple Developer account is configured. Keep this check in the app repository's release workflow; that configuration is not part of this website repository.

## Installing on macOS

NativeMailer is currently distributed without Apple notarization. After downloading the DMG and moving the app to `/Applications`, macOS may report that the app is damaged. Remove the download quarantine attribute with:

```bash
xattr -cr /Applications/NativeMailer.app
```

The website displays this recovery command next to the download links. It also links directly to the Intel build for users who do not have Apple Silicon.

## Future Homebrew cask

Once release filenames and update cadence are stable, add a Homebrew cask backed by the GitHub Release assets. Keep the cask version and SHA-256 values aligned with the release before advertising `brew install --cask nativemailer` on the site.
